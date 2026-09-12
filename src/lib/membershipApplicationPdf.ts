import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import {
  applicantPhotoPlacement,
  applicantSignaturePlacement,
  membershipApplicationTextFields,
  membershipDocumentChecklist,
  type MembershipApplicationTextField,
} from "@/lib/membershipApplicationFields";
import type { MembershipApplicationFormData } from "@/types";

export type MembershipApplicationImages = {
  applicantPhoto?: File | null;
  signature?: File | null;
};
export type MembershipApplicationValidationError = {
  field: keyof MembershipApplicationFormData | "applicantPhoto" | "signature";
  message: string;
};
export class MembershipApplicationValidationErrors extends Error {
  readonly errors: MembershipApplicationValidationError[];
  constructor(errors: MembershipApplicationValidationError[]) {
    super("Please correct the highlighted fields before generating the PDF.");
    this.errors = errors;
    this.name = "MembershipApplicationValidationErrors";
  }
}
const maxImageBytes = 2 * 1024 * 1024;
const textColor = rgb(0.05, 0.05, 0.05);
const textSize = 9;
const minimumTextSize = 8;
const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

function printableValue(field: MembershipApplicationTextField, value: string) {
  const text = normalize(value);
  if (field.type === "date" && /^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const [year, month, day] = text.split("-");
    return `${day}/${month}/${year}`;
  }
  return text;
}

function fittingSize(field: MembershipApplicationTextField, value: string, font: PDFFont) {
  const width = font.widthOfTextAtSize(value, textSize);
  const size = width > field.width ? textSize * field.width / width : textSize;
  if (size < minimumTextSize) {
    throw new Error(`${field.label} is too long for its printed blank. Please shorten it; no text will be cut off.`);
  }
  return size;
}

export async function validateMembershipApplication(
  values: MembershipApplicationFormData,
  images: MembershipApplicationImages
) {
  const errors: MembershipApplicationValidationError[] = [];
  const metricsPdf = await PDFDocument.create();
  const font = await metricsPdf.embedFont(StandardFonts.Helvetica);
  for (const field of membershipApplicationTextFields) {
    const raw = normalize(values[field.key]);
    if (!raw) continue;
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
      errors.push({ field: field.key, message: "Enter a valid email address." });
      continue;
    }
    if (field.type === "date") {
      const date = new Date(raw);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(raw) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== raw) {
        errors.push({ field: field.key, message: "Enter a valid date." });
        continue;
      }
    }
    const value = printableValue(field, raw);
    try {
      font.encodeText(value);
    } catch {
      errors.push({ field: field.key, message: `${field.label}: use English/Latin characters for this English PDF template.` });
      continue;
    }
    try {
      fittingSize(field, value, font);
    } catch (error) {
      errors.push({ field: field.key, message: (error as Error).message });
    }
  }
  for (const [field, file] of [["applicantPhoto", images.applicantPhoto], ["signature", images.signature]] as const) {
    if (!file) continue;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      errors.push({ field, message: "Choose a PNG or JPG image." });
    } else if (file.size > maxImageBytes) {
      errors.push({ field, message: "The image must be 2 MB or smaller." });
    }
  }
  return errors;
}

export async function generateMembershipApplicationPdf({
  templateUrl, values, images,
}: {
  templateUrl: string;
  values: MembershipApplicationFormData;
  images: MembershipApplicationImages;
}) {
  const errors = await validateMembershipApplication(values, images);
  if (errors.length) throw new MembershipApplicationValidationErrors(errors);
  const response = await fetch(templateUrl);
  if (!response.ok) throw new Error("Unable to load the membership application PDF template.");
  const pdf = await PDFDocument.load(await response.arrayBuffer());
  const pages = pdf.getPages();
  if (pages.length !== 3 || pages.some((page) => {
    const { width, height } = page.getSize();
    return Math.abs(width - 595.44) > 0.1 || Math.abs(height - 841.68) > 0.1;
  })) throw new Error("The PDF template has changed. Its field mapping must be reviewed.");

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  for (const field of membershipApplicationTextFields) {
    const value = printableValue(field, values[field.key]);
    if (!value) continue;
    pages[field.pageIndex].drawText(value, {
      x: field.x, y: field.y, size: fittingSize(field, value, font), font, color: textColor,
    });
  }
  // Mark only selected documents beside the existing printed labels.
  for (const item of membershipDocumentChecklist) {
    if (values[item.key] !== "Yes") continue;
    pages[0].drawLine({ start: { x: item.x, y: item.y + 2 }, end: { x: item.x + 2, y: item.y }, thickness: 1, color: textColor });
    pages[0].drawLine({ start: { x: item.x + 2, y: item.y }, end: { x: item.x + 7, y: item.y + 6 }, thickness: 1, color: textColor });
  }
  if (images.applicantPhoto) await drawImageFile(pdf, pages[1], images.applicantPhoto, applicantPhotoPlacement, true);
  if (images.signature) await drawImageFile(pdf, pages[0], images.signature, applicantSignaturePlacement);
  return pdf.save();
}

async function drawImageFile(
  pdf: PDFDocument, page: PDFPage, file: File,
  placement: { x: number; y: number; width: number; height: number },
  coverPlaceholder = false
) {
  const bytes = await file.arrayBuffer();
  let image;
  try {
    image = file.type === "image/png" ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
  } catch {
    throw new Error("An uploaded image could not be read. Please choose a valid PNG or JPG file.");
  }
  const scale = Math.min(placement.width / image.width, placement.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  if (coverPlaceholder) page.drawRectangle({ ...placement, color: rgb(1, 1, 1) });
  page.drawImage(image, {
    x: placement.x + (placement.width - width) / 2,
    y: placement.y + (placement.height - height) / 2,
    width, height,
  });
}
