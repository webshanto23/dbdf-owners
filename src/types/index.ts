export interface SiteData {
  association: AssociationInfo;
  navigation: NavigationItem[];
  home: HomePage;
  about: AboutPage;
  committee: CommitteePage;
  members: MembersPage;
  activities: ActivitiesPage;
  gallery: GalleryPage;
  documents: DocumentsPage;
  membershipApplication: MembershipApplicationConfig;
  contact: ContactPage;
  footer: FooterData;
  social: SocialLinks;
}

export interface AssociationInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  established: string;
  registrationNumber: string;
  logo: string;
  favicon: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface HomePage {
  hero: HeroSection;
  welcomeMessage: WelcomeMessage;
  aboutPreview: AboutPreview;
  objectives: Objective[];
  statistics: Statistic[];
  executiveCommitteePreview: CommitteePreview;
  activitiesPreview: ActivitiesPreview;
  galleryPreview: GalleryPreview;
  cta: CTASection;
  contactPreview: ContactPreview;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface WelcomeMessage {
  title: string;
  content: string;
  authorName: string;
  authorPosition: string;
  authorImage: string;
}

export interface AboutPreview {
  title: string;
  content: string;
  image: string;
  linkText: string;
  linkHref: string;
}

export interface Objective {
  title: string;
  description: string;
  icon: string;
}

export interface Statistic {
  label: string;
  value: string;
  icon: string;
}

export interface CommitteePreview {
  title: string;
  viewAllLink: string;
  members: CommitteeMember[];
}

export interface ActivitiesPreview {
  title: string;
  viewAllLink: string;
  activities: Activity[];
}

export interface GalleryPreview {
  title: string;
  viewAllLink: string;
  images: GalleryImage[];
}

export interface CTASection {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface ContactPreview {
  title: string;
  address: string;
  phone: string;
  email: string;
  mapEmbed: string;
}

export interface AboutPage {
  history: HistorySection;
  mission: MissionSection;
  vision: VisionSection;
  objectives: Objective[];
  coreValues: CoreValue[];
}

export interface HistorySection {
  title: string;
  content: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface MissionSection {
  title: string;
  content: string;
}

export interface VisionSection {
  title: string;
  content: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface CommitteePage {
  title: string;
  subtitle: string;
  members: CommitteeMember[];
}

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  company: string;
  photo: string;
  biography: string;
  email?: string;
  phone?: string;
  order: number;
}

export interface MembersPage {
  title: string;
  subtitle: string;
  members: MemberCompany[];
}

export interface MemberCompany {
  id: string;
  name: string;
  logo: string;
  representative: string;
  address: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  order: number;
}

export interface ActivitiesPage {
  title: string;
  subtitle: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  images: string[];
  category: string;
  featured: boolean;
}

export interface GalleryPage {
  title: string;
  subtitle: string;
  categories: string[];
  images: GalleryImage[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  width: number;
  height: number;
}

export interface DocumentsPage {
  title: string;
  subtitle: string;
  documents: Document[];
}

export interface Document {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'xls' | 'image';
  fileSize: string;
  category: string;
  icon: string;
}

export interface MembershipApplicationConfig {
  templateUrl: string;
  recipientEmail: string;
  emailSubject: string;
  emailBody: string;
  supportingDocumentsNote: string;
}

export interface MembershipApplicationFormData {
  companyName: string;
  businessAddress: string;
  ownerName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  nid: string;
  permanentAddress: string;
  presentAddress: string;
  spouseName: string;
  education: string;
  ownerMobile: string;
  nationality: string;
  religion: string;
  tradeLicenseNo: string;
  tradeLicenseDate: string;
  bondLicenseNo: string;
  bondLicenseDate: string;
  licenseType: string;
  officeAddress: string;
  companyEmail: string;
  website: string;
  bankName: string;
  accountNo: string;
  chequeNo: string;
  paymentDate: string;
  paymentAmount: string;
  paymentAmountWords: string;
  applicationDate: string;
  representativeName: string;
  representativeFatherName: string;
  representativeMotherName: string;
  representativePermanentAddress: string;
  representativePresentAddress: string;
  representativeDateOfBirth: string;
  representativeMobile: string;
  representativeSpouseName: string;
  representativeEducation: string;
  representativeNationality: string;
  representativeReligion: string;
  representativeNid: string;
  membershipCategory: string;
  tin: string;
  certificationDate: string;
  documentTradeLicense: string;
  documentBarLicense: string;
  documentNid: string;
  documentPhotographs: string;
  documentTin: string;
}

export interface ContactPage {
  title: string;
  subtitle: string;
  office: OfficeInfo;
  mapEmbed: string;
  social: SocialLinks;
}

export interface OfficeInfo {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  officeHours: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
}

export interface FooterData {
  description: string;
  links: {
    title: string;
    items: FooterLink[];
  }[];
  copyright: string;
}

export interface FooterLink {
  label: string;
  href: string;
}
