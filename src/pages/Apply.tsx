import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    title: "Company Details",
    description: "Complete the information applicable to you. Use English/Latin text that fits the original printed blanks.",
    fields: membershipApplicationTextFields.filter((field) => field.group === "company").map((field) => ({
      name: field.key, label: field.label, type: field.type,
    })),
  },
  {
    title: "Owner Details",
    description: "Complete the information applicable to you. Use English/Latin text that fits the original printed blanks.",
    fields: membershipApplicationTextFields.filter((field) => field.group === "owner").map((field) => ({
      name: field.key, label: field.label, type: field.type,
    })),
  },
  {
    title: "Payment And Application Date",
    description: "Complete the information applicable to you. Use English/Latin text that fits the original printed blanks.",
    fields: membershipApplicationTextFields.filter((field) => field.group === "payment").map((field) => ({
      name: field.key, label: field.label, type: field.type,
    })),
  },
  {
    title: "Authorized Representative",
    description: "Complete the information applicable to you. Use English/Latin text that fits the original printed blanks.",
    fields: membershipApplicationTextFields.filter((field) => field.group === "representative").map((field) => ({
      name: field.key, label: field.label, type: field.type,
    })),
  },
];

export function Apply({ config }: ApplyProps) {
  const [values, setValues] = useState(initialFormData);
  const [applicantPhoto, setApplicantPhoto] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [errors, setErrors] = useState<MembershipApplicationValidationError[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [generationMessage, setGenerationMessage] = useState("");
  const generatedUrlRef = useRef("");
  const formRevision = useRef(0);
  const generationInProgress = useRef(false);
  const mounted = useRef(true);

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

  const images: MembershipApplicationImages = { applicantPhoto, signature };
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
    setIsReviewing(false);
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => current.filter((error) => error.field !== name));
    clearGeneratedPdf();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>, field: "applicantPhoto" | "signature") {
    formRevision.current += 1;
    setIsReviewing(false);
    const file = event.target.files?.[0] ?? null;
    if (field === "applicantPhoto") {
      setApplicantPhoto(file);
    } else {
      setSignature(file);
    }
    setErrors((current) => current.filter((error) => error.field !== field));
    clearGeneratedPdf();
  }

  async function handleReview() {
    const revision = formRevision.current;
    try {
      const nextErrors = await validateMembershipApplication(values, images);
      if (!mounted.current || revision !== formRevision.current) return;
      setErrors(nextErrors);
      setIsReviewing(nextErrors.length === 0);
      setGenerationMessage(nextErrors.length ? "Please correct the highlighted fields." : "");
    } catch {
      if (mounted.current) setGenerationMessage("Unable to validate the application. Please try again.");
    }
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
      setIsReviewing(true);
      setGenerationMessage(previewWindow && !previewWindow.closed ? "" : "Preview unavailable. Use Download PDF to save the completed application.");
      if (previewWindow && !previewWindow.closed) previewWindow.location.href = nextUrl;
    } catch (error) {
      previewWindow?.close();
      if (!mounted.current || revision !== formRevision.current) return;
      if (error instanceof MembershipApplicationValidationErrors) setErrors(error.errors);
      setIsReviewing(false);
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
    <main>
      <PageBanner />
      <section className="py-24 bg-bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
            <fieldset disabled={isGenerating} className="min-w-0 space-y-8">
              <IntroPanel templateUrl={config.templateUrl} />
              {fieldGroups.map((group) => (
                <FormGroup
                  key={group.title}
                  group={group}
                  values={values}
                  errors={errors}
                  onFieldChange={handleFieldChange}
                />
              ))}
              <DocumentChecklist values={values} onFieldChange={handleFieldChange} />
              <UploadPanel
                applicantPhoto={applicantPhoto}
                signature={signature}
                errors={errors}
                onFileChange={handleFileChange}
              />
            </fieldset>

            <aside className="lg:sticky lg:top-28 space-y-6">
              <ActionPanel
                isReviewing={isReviewing}
                isGenerating={isGenerating}
                pdfReady={pdfReady}
                generatedUrl={generatedUrl}
                filename={filename}
                generationMessage={generationMessage}
                recipientEmail={recipientEmail}
                gmailHref={gmailHref}
                mailtoHref={mailtoHref}
                supportingDocumentsNote={config.supportingDocumentsNote}
                onReview={handleReview}
                onGeneratePdf={handleGeneratePdf}
                onCopyEmail={handleCopyEmail}
              />
              {isReviewing && <ReviewPanel values={values} applicantPhoto={applicantPhoto} signature={signature} />}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function PageBanner() {
  return (
    <section className="relative py-20 md:py-28 bg-bg-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-surface to-bg-primary" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/10 via-transparent to-transparent" />
      <div className="relative z-10 container-custom text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
        >
          Membership Application
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto"
        >
          Fill the application details, generate the completed application PDF locally, then attach it to your email manually.
        </motion.p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}

function IntroPanel({ templateUrl }: { templateUrl: string }) {
  return (
    <div className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-bg-primary border border-accent-gold/10 flex items-center justify-center shrink-0">
          <FileText className="h-6 w-6 text-accent-gold" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-text-primary mb-3">Browser-only PDF completion</h2>
          <p className="text-text-muted leading-relaxed">
            Your information stays in this browser tab. Refreshing or leaving loses unfinished input. Fill applicable fields using English/Latin characters. Office approval sections remain blank; complete the other signature and seal spaces after printing.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-5 border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold"
          >
            <a href={templateUrl} target="_blank" rel="noopener noreferrer">
              View blank template
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
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
            <label key={field.name} className={field.multiline ? "md:col-span-2" : ""}>
              <span className="block text-sm font-medium text-text-primary mb-2">{field.label}</span>
              {field.multiline ? (
                <textarea
                  rows={3}
                  value={values[field.name]}
                  onChange={(event) => onFieldChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg border border-accent-gold/20 bg-bg-primary text-text-primary placeholder:text-text-muted focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 outline-none transition-all resize-y"
                  aria-invalid={Boolean(error)}
                />
              ) : (
                <Input
                  type={field.type ?? "text"}
                  value={values[field.name]}
                  onChange={(event) => onFieldChange(field.name, event.target.value)}
                  placeholder={field.placeholder}
                  className="h-11 border-accent-gold/20 bg-bg-primary text-text-primary placeholder:text-text-muted focus:border-accent-gold"
                  aria-invalid={Boolean(error)}
                />
              )}
              {error && <span className="block text-sm text-red-300 mt-2">{error.message}</span>}
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
  errors,
  onFileChange,
}: {
  applicantPhoto: File | null;
  signature: File | null;
  errors: MembershipApplicationValidationError[];
  onFileChange: (event: ChangeEvent<HTMLInputElement>, field: "applicantPhoto" | "signature") => void;
}) {
  return (
    <section className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6 md:p-8">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-text-primary mb-2">Images</h2>
        <p className="text-text-muted">Optional PNG or JPG files, each smaller than 2 MB.</p>
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
      <input id={id} type="file" accept="image/png,image/jpeg" onChange={onChange} className="sr-only" />
      {error && <span className="block text-sm text-red-300">{error}</span>}
    </label>
  );
}

function ActionPanel({
  isReviewing,
  isGenerating,
  pdfReady,
  generatedUrl,
  filename,
  generationMessage,
  recipientEmail,
  gmailHref,
  mailtoHref,
  supportingDocumentsNote,
  onReview,
  onGeneratePdf,
  onCopyEmail,
}: {
  isReviewing: boolean;
  isGenerating: boolean;
  pdfReady: boolean;
  generatedUrl: string;
  filename: string;
  generationMessage: string;
  recipientEmail: string;
  gmailHref: string;
  mailtoHref: string;
  supportingDocumentsNote: string;
  onReview: () => void;
  onGeneratePdf: () => void;
  onCopyEmail: () => void;
}) {
  return (
    <div className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6">
      <h2 className="font-serif text-2xl font-bold text-text-primary mb-4">Generate And Send</h2>
      <div className="space-y-3">
        <Button type="button" variant="outline" size="lg" className="w-full border-accent-gold/30 text-accent-gold hover:bg-accent-gold/10 hover:border-accent-gold" onClick={onReview} disabled={isGenerating}>
          <CheckCircle2 className="h-4 w-4" />
          Review Information
        </Button>
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

      {isReviewing && !pdfReady && (
        <p className="mt-4 text-sm text-text-muted">Review is ready. Generate the PDF when the information looks correct.</p>
      )}

      {generationMessage && (
        <p className="mt-4 text-sm text-text-muted flex gap-2">
          <AlertCircle className="h-4 w-4 text-accent-gold shrink-0 mt-0.5" />
          {generationMessage}
        </p>
      )}

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

      {recipientEmail && (
        <p className="mt-6 text-sm text-text-muted break-words">
          Send your application to: <span className="text-text-primary">{recipientEmail}</span>
        </p>
      )}

      <div className="mt-6 space-y-3">
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
      </div>

      {!recipientEmail && (
        <p className="mt-4 text-sm text-text-muted">
          The authority recipient email is not configured yet. PDF generation and download are available, but email handoff is disabled.
        </p>
      )}
    </div>
  );
}

function ReviewPanel({
  values,
  applicantPhoto,
  signature,
}: {
  values: MembershipApplicationFormData;
  applicantPhoto: File | null;
  signature: File | null;
}) {
  return (
    <div className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6">
      <h2 className="font-serif text-xl font-bold text-text-primary mb-3">Review Your Answers</h2>
      <dl className="space-y-3 text-sm">
        {[...membershipApplicationTextFields, ...membershipDocumentChecklist].map((field) => (
          <div key={field.key}>
            <dt className="text-text-muted">{field.label}</dt>
            <dd className="text-text-primary break-words">{values[field.key] || "Not provided"}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-text-muted">Representative photo: {applicantPhoto ? applicantPhoto.name : "Not uploaded"}</p>
      <p className="mt-2 text-sm text-text-muted">Applicant signature: {signature ? signature.name : "Not uploaded"}</p>
    </div>
  );
}

function DocumentChecklist({ values, onFieldChange }: {
  values: MembershipApplicationFormData;
  onFieldChange: (name: keyof MembershipApplicationFormData, value: string) => void;
}) {
  return (
    <section className="rounded-3xl border border-accent-gold/10 bg-bg-surface p-6 md:p-8">
      <h2 className="font-serif text-2xl font-bold text-text-primary mb-3">Supporting Documents</h2>
      <p className="text-text-muted mb-6">Select the documents you will include. Attach them to your email separately; they are not uploaded here.</p>
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

function buildGmailHref(recipient: string, subject: string, body: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: recipient,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

function buildMailtoHref(recipient: string, subject: string, body: string) {
  const normalizedBody = body.replace(/\r?\n/g, "\r\n");
  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(normalizedBody)}`;
}
