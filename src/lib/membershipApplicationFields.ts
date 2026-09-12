import type { MembershipApplicationFormData } from "@/types";

export type MembershipApplicationTextField = {
  key: keyof MembershipApplicationFormData;
  label: string;
  pageIndex: 0 | 1;
  x: number;
  y: number;
  width: number;
  group: "company" | "owner" | "payment" | "representative";
  type?: "date" | "email" | "tel";
};

// PDF points measured from the original template, with bottom-left origin.
// Baselines sit just above the printed blanks; page 3 is authority-only.
export const membershipApplicationTextFields: MembershipApplicationTextField[] = [
  { key: "companyName", label: "Company name", pageIndex: 0, x: 219, y: 588, width: 331, group: "company" },
  { key: "businessAddress", label: "Company/shop address", pageIndex: 0, x: 210, y: 567.5, width: 338, group: "company" },
  { key: "ownerName", label: "Managing director / director / proprietor", pageIndex: 0, x: 300, y: 547, width: 252, group: "owner" },
  { key: "fatherName", label: "Owner's father's name", pageIndex: 0, x: 132, y: 526.5, width: 173, group: "owner" },
  { key: "motherName", label: "Owner's mother's name", pageIndex: 0, x: 405, y: 526.5, width: 148, group: "owner" },
  { key: "dateOfBirth", label: "Owner's date of birth", pageIndex: 0, x: 122, y: 506, width: 184, group: "owner", type: "date" },
  { key: "nid", label: "Owner's NID number", pageIndex: 0, x: 372, y: 506, width: 178, group: "owner" },
  { key: "permanentAddress", label: "Owner's permanent address", pageIndex: 0, x: 158, y: 485.5, width: 392, group: "owner" },
  { key: "presentAddress", label: "Owner's present address", pageIndex: 0, x: 142, y: 465, width: 410, group: "owner" },
  { key: "spouseName", label: "Owner's spouse's name", pageIndex: 0, x: 144, y: 444.5, width: 404, group: "owner" },
  { key: "education", label: "Owner's educational qualification", pageIndex: 0, x: 188, y: 424, width: 141, group: "owner" },
  { key: "ownerMobile", label: "Owner's mobile number", pageIndex: 0, x: 396, y: 424, width: 154, group: "owner", type: "tel" },
  { key: "nationality", label: "Owner's nationality", pageIndex: 0, x: 118, y: 403.5, width: 178, group: "owner" },
  { key: "religion", label: "Owner's religion", pageIndex: 0, x: 369, y: 403.5, width: 178, group: "owner" },
  { key: "tradeLicenseNo", label: "Trade license number", pageIndex: 0, x: 157, y: 383, width: 141, group: "company" },
  { key: "tradeLicenseDate", label: "Trade license date", pageIndex: 0, x: 336, y: 383, width: 215, group: "company", type: "date" },
  { key: "bondLicenseNo", label: "Customs diplomatic bond / duty free license number", pageIndex: 0, x: 309, y: 362.5, width: 117, group: "company" },
  { key: "bondLicenseDate", label: "Customs license date", pageIndex: 0, x: 463, y: 362.5, width: 87, group: "company", type: "date" },
  { key: "licenseType", label: "Type of license (Diplomatic Bond / Duty Free Shop / Other)", pageIndex: 0, x: 347, y: 342, width: 203, group: "company" },
  { key: "officeAddress", label: "Registered office address", pageIndex: 0, x: 195, y: 321, width: 356, group: "company" },
  { key: "companyEmail", label: "Company email address", pageIndex: 0, x: 222, y: 300.5, width: 184, group: "company", type: "email" },
  { key: "website", label: "Company website", pageIndex: 0, x: 457, y: 300.5, width: 93, group: "company" },
  { key: "bankName", label: "Bank name", pageIndex: 0, x: 110, y: 201, width: 184, group: "payment" },
  { key: "accountNo", label: "Account number", pageIndex: 0, x: 368, y: 201, width: 185, group: "payment" },
  { key: "chequeNo", label: "Cheque / pay order number", pageIndex: 0, x: 143, y: 182.5, width: 154, group: "payment" },
  { key: "paymentDate", label: "Cheque / pay order date", pageIndex: 0, x: 335, y: 182.5, width: 215, group: "payment", type: "date" },
  { key: "paymentAmount", label: "Amount (Tk.)", pageIndex: 0, x: 141, y: 164, width: 111, group: "payment" },
  { key: "paymentAmountWords", label: "Amount in words", pageIndex: 0, x: 310, y: 164, width: 240, group: "payment" },
  { key: "applicationDate", label: "Applicant's signature date", pageIndex: 0, x: 72, y: 61, width: 117, group: "payment", type: "date" },
  { key: "representativeName", label: "Representative's name", pageIndex: 1, x: 198, y: 666, width: 355, group: "representative" },
  { key: "representativeFatherName", label: "Representative's father's name", pageIndex: 1, x: 133, y: 643, width: 165, group: "representative" },
  { key: "representativeMotherName", label: "Representative's mother's name", pageIndex: 1, x: 387, y: 643, width: 166, group: "representative" },
  { key: "representativePermanentAddress", label: "Representative's permanent address", pageIndex: 1, x: 158, y: 620, width: 392, group: "representative" },
  { key: "representativePresentAddress", label: "Representative's present / residential address", pageIndex: 1, x: 206, y: 597, width: 343, group: "representative" },
  { key: "representativeDateOfBirth", label: "Representative's date of birth", pageIndex: 1, x: 122, y: 574, width: 172, group: "representative", type: "date" },
  { key: "representativeMobile", label: "Representative's mobile number", pageIndex: 1, x: 361, y: 574, width: 191, group: "representative", type: "tel" },
  { key: "representativeSpouseName", label: "Representative's spouse's name", pageIndex: 1, x: 138, y: 551, width: 411, group: "representative" },
  { key: "representativeEducation", label: "Representative's educational qualification", pageIndex: 1, x: 182, y: 528, width: 368, group: "representative" },
  { key: "representativeNationality", label: "Representative's nationality", pageIndex: 1, x: 112, y: 505, width: 185, group: "representative" },
  { key: "representativeReligion", label: "Representative's religion", pageIndex: 1, x: 363, y: 505, width: 184, group: "representative" },
  { key: "representativeNid", label: "Representative's NID number", pageIndex: 1, x: 222, y: 482, width: 331, group: "representative" },
  { key: "membershipCategory", label: "Category of applied membership", pageIndex: 1, x: 246, y: 459, width: 306, group: "representative" },
  { key: "tin", label: "Representative's TIN certificate number", pageIndex: 1, x: 155, y: 436, width: 398, group: "representative" },
  { key: "certificationDate", label: "Owner's certification date", pageIndex: 1, x: 72, y: 107, width: 117, group: "representative", type: "date" },
];

export const membershipDocumentChecklist: {
  key: keyof MembershipApplicationFormData;
  label: string;
  x: number;
  y: number;
}[] = [
  { key: "documentTradeLicense", label: "Trade license copy", x: 46, y: 128 },
  { key: "documentBarLicense", label: "Bar license copy", x: 178, y: 128 },
  { key: "documentNid", label: "NID copy", x: 285, y: 128 },
  { key: "documentPhotographs", label: "3 copies of photograph", x: 46, y: 112 },
  { key: "documentTin", label: "TIN copy and certificate", x: 177, y: 112 },
];

// Representative photograph is on page 2. Inset from its printed border.
export const applicantPhotoPlacement = { pageIndex: 1, x: 472, y: 726, width: 86, height: 94 };
// This upload is ONLY the applicant signature on page 1. Other signatures stay blank.
export const applicantSignaturePlacement = { pageIndex: 0, x: 423, y: 80, width: 130, height: 27 };

