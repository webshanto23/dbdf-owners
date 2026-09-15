import { buildGmailHref, buildMailtoHref } from "@/lib/emailDraft";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  AlertCircle,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMembershipDraft } from "@/hooks/useMembershipDraft";
import {
  MembershipApplicationValidationErrors,
  generateMembershipApplicationPdf,
  validateMembershipApplication,
  type MembershipApplicationImages,
  type MembershipApplicationValidationError,
} from "@/lib/membershipApplicationPdf";
import { membershipApplicationTextFields, membershipDocumentChecklist } from "@/lib/membershipApplicationFields";
import type { MembershipApplicationConfig, MembershipApplicationFormData } from "@/types";

interface ApplyProps {
  config: MembershipApplicationConfig;
}

type FieldConfig = {
  name: keyof MembershipApplicationFormData;
  label: string;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
};

type FieldGroup = {
  title: string;
  description: string;
  fields: FieldConfig[];
};

const initialFormData: MembershipApplicationFormData = {
  companyName: "",
  businessAddress: "",
  ownerName: "",
  fatherName: "",
  motherName: "",
  dateOfBirth: "",
  nid: "",
  permanentAddress: "",
  presentAddress: "",
  spouseName: "",
  education: "",
  ownerMobile: "",
  nationality: "",
  religion: "",
  tradeLicenseNo: "",
  tradeLicenseDate: "",
  bondLicenseNo: "",
  bondLicenseDate: "",
  licenseType: "",
  officeAddress: "",
  companyEmail: "",
  website: "",
  bankName: "",
  accountNo: "",
  chequeNo: "",
  paymentDate: "",
  paymentAmount: "",
  paymentAmountWords: "",
  applicationDate: "",
  representativeName: "",
  representativeFatherName: "",
  representativeMotherName: "",
  representativePermanentAddress: "",
  representativePresentAddress: "",
  representativeDateOfBirth: "",
  representativeMobile: "",
  representativeSpouseName: "",
  representativeEducation: "",
  representativeNationality: "",
  representativeReligion: "",
  representativeNid: "",
  membershipCategory: "",
  tin: "",
  certificationDate: "",
  documentTradeLicense: "",
  documentBarLicense: "",
  documentNid: "",
  documentPhotographs: "",
  documentTin: "",
};

const fieldGroups: FieldGroup[] = [
  {
    title: "Applicant Company/Shop Information",
    description: "Part 2, items 1–18. Includes the managing director / director / proprietor's personal particulars, as shown in the PDF. Use English/Latin text that fits the printed blanks.",
    fields: membershipApplicationTextFields
      .filter((field) => field.group === "company" || field.group === "owner")
      .map((field) => {
        // Keep the PDF order and wording; these are not a separate owner section.
        const label = field.label.replace(/^Owner's /, "");
        return { name: field.key, label: label.charAt(0).toUpperCase() + label.slice(1), type: field.type };
      }),
  },
  {
    title: "Information of the Authorized Representative of the Owner as a Member of the Association",
    description: "Part 3. Enter the authorized representative's information and the owner's certification date. These are separate from the personal particulars in Part 2.",
    fields: membershipApplicationTextFields.filter((field) => field.group === "representative").map((field) => ({
      name: field.key, label: field.label, type: field.type,
    })),
  },
  {
    title: "Registration Fee Details — Part 2",
    description: "Continuation of Applicant Company/Shop Information: item 19 (cheque / pay order details) and the applicant's signature date at the bottom of page 1.",
    fields: membershipApplicationTextFields.filter((field) => field.group === "payment").map((field) => ({
      name: field.key, label: field.label, type: field.type,
    })),
  },
];

export function Apply({ config }: ApplyProps) {
  const [values, setValues] = useState(initialFormData);
  const [applicantPhoto, setApplicantPhoto] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [representativeSignature, setRepresentativeSignature] = useState<File | null>(null);
  const [ownerSignature, setOwnerSignature] = useState<File | null>(null);
  const [errors, setErrors] = useState<MembershipApplicationValidationError[]>([]);
  const [step, setStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const draft = useMembershipDraft(values, step);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const focusError = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [generationMessage, setGenerationMessage] = useState("");
  const generatedUrlRef = useRef("");
  const formRevision = useRef(0);
  const generationInProgress = useRef(false);
  const mounted = useRef(true);

  const isBusy = isGenerating || isValidating;
  const recipientEmail = config.recipientEmail.trim();
  const pdfReady = generatedUrl.length > 0;
  const filename = useMemo(() => {
    const companyPart = values.companyName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `${companyPart || "dbdf"}-membership-application.pdf`;
  }, [values.companyName]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (generatedUrlRef.current) {
        URL.revokeObjectURL(generatedUrlRef.current);
      }
    };
  }, []);

  const images: MembershipApplicationImages = { applicantPhoto, signature, representativeSignature, ownerSignature };
  const gmailHref = buildGmailHref(recipientEmail, config.emailSubject, config.emailBody);
  const mailtoHref = buildMailtoHref(recipientEmail, config.emailSubject, config.emailBody);

  function revokeGeneratedUrl() {
    if (generatedUrlRef.current) {
      URL.revokeObjectURL(generatedUrlRef.current);
      generatedUrlRef.current = "";
    }
  }

  function clearGeneratedPdf() {
    revokeGeneratedUrl();
    setGeneratedUrl("");
    setGenerationMessage("");
  }

  function handleFieldChange(name: keyof MembershipApplicationFormData, value: string) {
    formRevision.current += 1;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => current.filter((error) => error.field !== name));
    clearGeneratedPdf();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>, field: keyof MembershipApplicationImages) {
    formRevision.current += 1;
    const file = event.target.files?.[0] ?? null;
    if (field === "applicantPhoto") {
      setApplicantPhoto(file);
    } else if (field === "signature") {
      setSignature(file);
    } else if (field === "representativeSignature") {
      setRepresentativeSignature(file);
    } else {
      setOwnerSignature(file);
    }
    setErrors((current) => current.filter((error) => error.field !== field));
    clearGeneratedPdf();
  }

  useEffect(() => {
    stepHeading.current?.focus({ preventScroll: true });
    stepHeading.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [step]);

  useEffect(() => {
    if (!focusError.current) return;
    const first = errors.find((error) => stepForField(error.field) === step);
    if (first) {
      document.getElementById(first.field)?.focus();
      focusError.current = false;
    }
  }, [errors, step]);

  function goToStep(next: number) {
    setStep(next);
    setGenerationMessage("");
  }

  async function continueTo(next: number) {
    if (isBusy) return;
    if (next <= step) {
      goToStep(next);
      return;
    }
    const revision = formRevision.current;
    setIsValidating(true);
    try {
      const allErrors = await validateMembershipApplication(values, images);
      if (!mounted.current || revision !== formRevision.current) return;
      const nextErrors = next === reviewStep ? allErrors : allErrors.filter((error) => stepForField(error.field) === step);
      focusError.current = nextErrors.length > 0;
      setErrors(nextErrors);
      if (nextErrors.length) {
        setStep(stepForField(nextErrors[0].field));
        setGenerationMessage("Please correct the highlighted fields before continuing.");
        return;
      }
      setFurthestStep((current) => Math.max(current, next));
      goToStep(next);
    } catch {
      if (mounted.current) setGenerationMessage("Unable to check your answers. Please try again.");
    } finally {
      if (mounted.current) setIsValidating(false);
    }
  }

  function resumeDraft() {
    const saved = draft.resume();
    if (!saved) return;
    formRevision.current += 1;
    setValues(saved.values);
    // Files are deliberately not stored; revisit Documents before the final review.
    const restoredStep = Math.min(saved.step, documentsStep);
    setStep(restoredStep);
    setFurthestStep(restoredStep);
    setGenerationMessage("Draft restored. Please select your photo and signatures again in Documents, if applicable.");
  }

  async function handleGeneratePdf() {
    if (generationInProgress.current) return;
    generationInProgress.current = true;
    const revision = formRevision.current;
    // Open before the first await so the browser recognizes the user's click.
    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.title = "Generating membership application PDF";
      previewWindow.document.body.textContent = "Generating membership application PDF...";
    }
    setIsGenerating(true);
    clearGeneratedPdf();
    try {
      const pdfBytes = await generateMembershipApplicationPdf({
        templateUrl: config.templateUrl, values, images,
      });
      if (!mounted.current || revision !== formRevision.current) {
        previewWindow?.close();
        return;
      }
      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const nextUrl = URL.createObjectURL(blob);
      generatedUrlRef.current = nextUrl;
      setGeneratedUrl(nextUrl);
      setErrors([]);
      setGenerationMessage(previewWindow && !previewWindow.closed ? "" : "Preview unavailable. Use Download PDF to save the completed application.");
      if (previewWindow && !previewWindow.closed) previewWindow.location.href = nextUrl;
    } catch (error) {
      previewWindow?.close();
      if (!mounted.current || revision !== formRevision.current) return;
      if (error instanceof MembershipApplicationValidationErrors) {
        focusError.current = error.errors.length > 0;
        setErrors(error.errors);
        if (error.errors.length) setStep(stepForField(error.errors[0].field));
      }
      setGenerationMessage(error instanceof Error ? error.message : "Unable to generate the PDF. Please try again.");
    } finally {
      generationInProgress.current = false;
      if (mounted.current) setIsGenerating(false);
    }
  }

  async function handleCopyEmail() {
    if (!recipientEmail) return;
    try {
      await navigator.clipboard.writeText(recipientEmail);
      setGenerationMessage("Authority email address copied.");
    } catch {
      setGenerationMessage(`Copy this address manually: ${recipientEmail}`);
    }
  }

  return (
    <div className="bg-bg-primary text-text-primary pt-20">
      <section className="container-custom pt-12 pb-8">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">Membership Application</h1>
        <p className="text-text-muted">Complete your details, then download and email your application.</p>
      </section>
      <section className="container-custom pb-20">
        {!draft.ready ? (
          <p role="status" className="text-text-muted">Checking for a saved draft…</p>
        ) : draft.pending ? (
          <div className="rounded-3xl border border-accent-gold/20 bg-bg-surface p-6 md:p-8 max-w-2xl">
            <h2 className="font-serif text-2xl font-bold mb-3">Continue your application?</h2>
            <p className="text-text-muted mb-6">A draft is saved on this device until {new Date(draft.pending.expiresAt).toLocaleString()}. Photo and signature files will need to be selected again.</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="gold" onClick={resumeDraft}>Resume draft</Button>
              <Button variant="outline" className={outlineButton} onClick={draft.clear}>Start over</Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-8 items-start">
            <aside className="lg:sticky lg:top-28 rounded-3xl border border-accent-gold/20 bg-bg-surface p-6">
              <h2 className="font-serif text-xl font-bold mb-5">Your application</h2>
              <p className="lg:hidden text-accent-gold text-sm mb-3">Step {step + 1} of {stepLabels.length} · {stepLabels[step]}</p>
              <progress className="lg:hidden w-full h-2 mb-4 accent-accent-gold" aria-label="Application progress" value={step + 1} max={stepLabels.length} />
              <nav aria-label="Application steps" className="hidden lg:block">
                <ol className="space-y-3">
                  {stepLabels.map((label, index) => (
                    <li key={label}>
                      <button type="button" disabled={isBusy || index > furthestStep} aria-current={index === step ? "step" : undefined}
                        onClick={() => void continueTo(index)}
                        className={`w-full flex items-center gap-3 text-left py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-accent-gold disabled:opacity-50 ${index === step ? "text-accent-gold font-medium" : "text-text-muted"}`}>
                        <span className={`h-8 w-8 shrink-0 rounded-full border flex items-center justify-center ${index === step ? "bg-accent-gold border-accent-gold text-bg-primary" : "border-accent-gold/30"}`}>{index + 1}</span>
                        {label}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="lg:mt-6 lg:pt-6 lg:border-t border-accent-gold/15 space-y-3">
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" checked={draft.enabled} disabled={isBusy} onChange={(event) => draft.toggle(event.target.checked)} className="mt-1 accent-accent-gold" />
                  Remember my progress on this device
                </label>
                <p className="text-xs text-text-muted">Includes personal details. Use only on a private device. Drafts expire after 3 days without changes. Photos and signatures are not saved.</p>
                <p role="status" className="text-sm text-text-muted">{draft.message || "Without a saved draft, refreshing or leaving clears your answers."}</p>
                {draft.enabled && <Button type="button" variant="link" className="text-accent-gold px-0" disabled={isBusy} onClick={draft.clear}>Clear saved draft</Button>}
              </div>
            </aside>
            <div className="min-w-0">
              <h2 ref={stepHeading} tabIndex={-1} className="text-accent-gold text-sm font-medium mb-4 scroll-mt-28 outline-none">Step {step + 1} of {stepLabels.length} · {stepLabels[step]}</h2>
              <form noValidate onSubmit={(event) => { event.preventDefault(); if (step < reviewStep) void continueTo(step + 1); }}>
                <fieldset disabled={isBusy} className="min-w-0 space-y-6" aria-busy={isBusy}>
                  {step < documentsStep && <FormGroup group={orderedGroups[step]} values={values} errors={errors} onFieldChange={handleFieldChange} />}
                  {step === documentsStep && <>
                    <DocumentChecklist values={values} onFieldChange={handleFieldChange} />
                    <UploadPanel applicantPhoto={applicantPhoto} signature={signature} representativeSignature={representativeSignature} ownerSignature={ownerSignature} errors={errors} onFileChange={handleFileChange} />
                    <p className="text-sm text-text-muted">Photo and signature files stay in this tab only. After resuming a draft, select them again if applicable. Other signature and seal spaces can be completed after printing.</p>
                  </>}
                  {step === reviewStep && <>
                    <ReviewPanel values={values} applicantPhoto={applicantPhoto} signature={signature} representativeSignature={representativeSignature} ownerSignature={ownerSignature} onEdit={goToStep} />
                    <ActionPanel isGenerating={isGenerating} pdfReady={pdfReady} generatedUrl={generatedUrl} filename={filename}
                      recipientEmail={recipientEmail} gmailHref={gmailHref} mailtoHref={mailtoHref}
                      supportingDocumentsNote={config.supportingDocumentsNote} onGeneratePdf={handleGeneratePdf} onCopyEmail={handleCopyEmail} />
                  </>}
                  {generationMessage && <p role="status" className="text-sm text-text-muted flex gap-2"><AlertCircle className="h-4 w-4 shrink-0 text-accent-gold" />{generationMessage}</p>}
                  {errors.some((error) => stepForField(error.field) === step) && <div role="alert" className="rounded-xl border border-accent-gold/20 p-4">
                    <p className="font-medium mb-2">Please check these answers:</p>
                    <ul className="space-y-2 text-sm text-text-muted">
                      {errors.filter((error) => stepForField(error.field) === step).map((error) => <li key={error.field}><a href={`#${error.field}`} className="underline">{error.message}</a></li>)}
                    </ul>
                  </div>}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-accent-gold/15 pt-6">
                    <div className="flex items-center gap-4">
                      {step > 0 && <Button type="button" variant="outline" className={outlineButton} onClick={() => goToStep(step - 1)}>Back</Button>}
                      <a href={config.templateUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-gold underline">View blank PDF</a>
                    </div>
                    {step < reviewStep && <Button type="submit" variant="gold" size="lg">{isValidating ? "Checking…" : step === documentsStep ? "Review application" : `Continue to ${stepLabels[step + 1]}`}</Button>}
                  </div>
                </fieldset>
              </form>
              <p className="mt-4 text-sm text-text-muted">You can go back to edit your answers before generating the PDF. Generating a PDF does not submit your application.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

const stepLabels = ["Company / Shop", "Representative", "Payment", "Documents", "Review & PDF"];
const orderedGroups = fieldGroups;
const documentsStep = orderedGroups.length;
const reviewStep = stepLabels.length - 1;
const outlineButton = "border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold";

function stepForField(field: MembershipApplicationValidationError["field"]) {
  const index = orderedGroups.findIndex((group) => group.fields.some((item) => item.name === field));
  return index < 0 ? documentsStep : index;
}

function FormGroup({
  group,
  values,
  errors,
  onFieldChange,
}: {
  group: FieldGroup;
  values: MembershipApplicationFormData;
  errors: MembershipApplicationValidationError[];
  onFieldChange: (name: keyof MembershipApplicationFormData, value: string) => void;
}) {
  return (
    <section className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6 md:p-8">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">{group.title}</h2>
        <p className="text-text-muted">{group.description}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {group.fields.map((field) => {
          const error = errors.find((item) => item.field === field.name);
          return (
            <label key={field.name} className={field.multiline || /address|companyName/i.test(field.name) ? "md:col-span-2" : ""}>
              <span className="block text-sm font-medium text-text-primary mb-2">{field.label}</span>
              {field.multiline ? (
                <textarea
                  id={field.name}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  rows={3}
                  value={values[field.name]}
                  onChange={(event) => onFieldChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary placeholder:text-text-muted focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-y"
                  aria-invalid={Boolean(error)}
                />
              ) : (
                <Input
                  id={field.name}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  type={field.type ?? "text"}
                  style={field.type === "date" ? { colorScheme: "dark" } : undefined}
                  value={values[field.name]}
                  onChange={(event) => onFieldChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className="h-11 border-accent-gold/20 bg-bg-primary text-text-primary placeholder:text-text-muted focus:border-accent-gold"
                  aria-invalid={Boolean(error)}
                />
              )}
              {error && <span id={`${field.name}-error`} className="block text-sm text-red-300 mt-2">{error.message}</span>}
            </label>
          );
        })}
      </div>
    </section>
  );
}

function UploadPanel({
  applicantPhoto,
  signature,
  representativeSignature,
  ownerSignature,
  errors,
  onFileChange,
}: {
  applicantPhoto: File | null;
  signature: File | null;
  representativeSignature: File | null;
  ownerSignature: File | null;
  errors: MembershipApplicationValidationError[];
  onFileChange: (event: ChangeEvent<HTMLInputElement>, field: keyof MembershipApplicationImages) => void;
}) {
  return (
    <section className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6 md:p-8">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">Photograph and Signatures</h2>
        <p className="text-text-muted">Optional PNG or JPG files, each 2 MB or smaller. The applicant signature belongs to Part 2. The representative photograph and both page-2 signatures belong to Part 3.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <FileInput
          id="applicantPhoto"
          label="Authorized representative photograph (page 2)"
          file={applicantPhoto}
          error={errors.find((item) => item.field === "applicantPhoto")?.message}
          onChange={(event) => onFileChange(event, "applicantPhoto")}
        />
        <FileInput
          id="signature"
          label="Applicant signature only (page 1)"
          file={signature}
          error={errors.find((item) => item.field === "signature")?.message}
          onChange={(event) => onFileChange(event, "signature")}
        />
        <FileInput
          id="representativeSignature"
          label="Authorized Representative's Signature (page 2)"
          file={representativeSignature}
          error={errors.find((item) => item.field === "representativeSignature")?.message}
          onChange={(event) => onFileChange(event, "representativeSignature")}
        />
        <FileInput
          id="ownerSignature"
          label="Authority / Owner's Signature (page 2)"
          file={ownerSignature}
          error={errors.find((item) => item.field === "ownerSignature")?.message}
          onChange={(event) => onFileChange(event, "ownerSignature")}
        />
      </div>
    </section>
  );
}

function FileInput({
  id,
  label,
  file,
  error,
  onChange,
}: {
  id: string;
  label: string;
  file: File | null;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label htmlFor={id} className="block rounded-2xl border border-dashed border-accent-gold/25 bg-bg-primary p-5 cursor-pointer hover:border-accent-gold/50 transition-colors">
      <span className="flex items-center gap-3 text-text-primary font-medium mb-2">
        <Upload className="h-4 w-4 text-accent-gold" />
        {label}
      </span>
      <span className="block text-sm text-text-muted mb-4">{file ? file.name : "Choose a PNG or JPG file"}</span>
      <input id={id} type="file" accept="image/png,image/jpeg" onChange={onChange} className="block w-full text-sm text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent-gold file:px-3 file:py-2 file:text-bg-primary" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />
      {error && <span id={`${id}-error`} className="block text-sm text-red-300">{error}</span>}
    </label>
  );
}

function ActionPanel({
  isGenerating,
  pdfReady,
  generatedUrl,
  filename,
  recipientEmail,
  gmailHref,
  mailtoHref,
  supportingDocumentsNote,
  onGeneratePdf,
  onCopyEmail,
}: {
  isGenerating: boolean;
  pdfReady: boolean;
  generatedUrl: string;
  filename: string;
  recipientEmail: string;
  gmailHref: string;
  mailtoHref: string;
  supportingDocumentsNote: string;
  onGeneratePdf: () => void;
  onCopyEmail: () => void;
}) {
  return (
    <div className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6">
      <h2 className="font-serif text-2xl font-bold text-text-primary mb-4">Generate And Send</h2>
      <div className="space-y-3">
        <Button type="button" variant="gold" size="lg" className="w-full" onClick={onGeneratePdf} disabled={isGenerating}>
          <FileText className="h-4 w-4" />
          {isGenerating ? "Generating PDF..." : "Generate PDF"}
        </Button>
        {pdfReady && (
          <Button asChild variant="outline" size="lg" className="w-full border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold">
            <a href={generatedUrl} download={filename}>
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        )}
      </div>

      {pdfReady && (
        <div className="mt-6 rounded-2xl border border-accent-gold/15 bg-bg-primary p-4">
          <p className="text-text-primary font-medium mb-2">
            Your PDF is ready. Attach it to your email and send it to complete your application.
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-text-muted text-sm mb-3">
            <li>Download the PDF using the button above.</li>
            <li>Open Gmail or your configured email app.</li>
            <li>Attach the PDF and supporting documents, then click Send in your email app.</li>
          </ol>
          <p className="text-text-muted text-sm">{supportingDocumentsNote}</p>
          <p className="mt-3 text-text-muted text-sm">
            Opening a draft does not send your application. This website cannot confirm delivery.
          </p>
        </div>
      )}

      {pdfReady && recipientEmail && (
        <p className="mt-6 text-sm text-text-muted break-words">
          Send your application to: <span className="text-text-primary">{recipientEmail}</span>
        </p>
      )}

      {pdfReady && <div className="mt-6 space-y-3">
        <Button asChild variant="gold" size="lg" className="w-full aria-disabled:pointer-events-none aria-disabled:opacity-50" aria-disabled={!recipientEmail || !pdfReady}>
          <a href={recipientEmail && pdfReady ? gmailHref : undefined} target="_blank" rel="noopener noreferrer">
            <Mail className="h-4 w-4" />
            Open Gmail to Send
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold aria-disabled:pointer-events-none aria-disabled:opacity-50" aria-disabled={!recipientEmail || !pdfReady}>
          <a href={recipientEmail && pdfReady ? mailtoHref : undefined}>
            <ExternalLink className="h-4 w-4" />
            Use another email app
          </a>
        </Button>
        <Button type="button" variant="outline" size="lg" className="w-full border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold" disabled={!recipientEmail} onClick={onCopyEmail}>
          <Copy className="h-4 w-4" />
          Copy authority email address
        </Button>
      </div>}

      {!recipientEmail && (
        <p className="mt-4 text-sm text-text-muted">
          The authority recipient email is not configured yet. PDF generation and download are available, but email handoff is disabled.
        </p>
      )}
    </div>
  );
}

function ReviewPanel({ values, applicantPhoto, signature, representativeSignature, ownerSignature, onEdit }: {
  values: MembershipApplicationFormData;
  applicantPhoto: File | null;
  signature: File | null;
  representativeSignature: File | null;
  ownerSignature: File | null;
  onEdit: (step: number) => void;
}) {
  return (
    <section className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6 md:p-8">
      <h2 className="font-serif text-2xl font-bold mb-3">Review your application</h2>
      <p className="text-text-muted mb-6">Check your answers before generating the PDF. Office approval sections stay blank.</p>
      {orderedGroups.map((group, index) => (
        <div key={group.title} className="border-t border-accent-gold/15 py-5">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h3 className="font-serif text-lg font-bold">{group.title}</h3>
            <Button type="button" variant="link" className="text-accent-gold" onClick={() => onEdit(index)} aria-label={`Edit ${group.title}`}>Edit</Button>
          </div>
          <dl className="grid md:grid-cols-2 gap-4 text-sm">
            {group.fields.map((field) => <div key={field.name}><dt className="text-text-muted">{field.label}</dt><dd className="break-words">{values[field.name] || "Not provided"}</dd></div>)}
          </dl>
        </div>
      ))}
      <div className="border-t border-accent-gold/15 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg font-bold">Supporting documents (Part 2) and images</h3>
          <Button type="button" variant="link" className="text-accent-gold" onClick={() => onEdit(documentsStep)} aria-label="Edit documents and images">Edit</Button>
        </div>
        <ul className="text-sm text-text-muted space-y-2">
          {membershipDocumentChecklist.map((item) => <li key={item.key}>{item.label}: {values[item.key] === "Yes" ? "Will attach to email" : "Not selected"}</li>)}
          <li>Representative photo: {applicantPhoto?.name ?? "Not selected"}</li>
          <li>Applicant signature: {signature?.name ?? "Not selected"}</li>
          <li>Authorized Representative's Signature: {representativeSignature?.name ?? "Not selected"}</li>
          <li>Authority / Owner's Signature: {ownerSignature?.name ?? "Not selected"}</li>
        </ul>
      </div>
    </section>
  );
}

function DocumentChecklist({ values, onFieldChange }: {
  values: MembershipApplicationFormData;
  onFieldChange: (name: keyof MembershipApplicationFormData, value: string) => void;
}) {
  return (
    <section className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6 md:p-8">
      <h2 className="font-serif text-2xl font-bold text-text-primary mb-3">Supporting Documents — Part 2</h2>
      <p className="text-text-muted mb-6">Continuation of Applicant Company/Shop Information: item 20. Select the documents you will include. Attach them to your email separately; they are not uploaded here.</p>
      <div className="space-y-3">
        {membershipDocumentChecklist.map((item) => (
          <label key={item.key} className="flex items-center gap-3 text-text-primary">
            <input type="checkbox" checked={values[item.key] === "Yes"} onChange={(event) => onFieldChange(item.key, event.target.checked ? "Yes" : "")} className="accent-accent-gold" />
            {item.label}
          </label>
        ))}
      </div>
    </section>
  );
}
