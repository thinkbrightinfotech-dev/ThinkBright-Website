export type UserRole = 
  | 'super_admin' 
  | 'admin' 
  | 'instructor' 
  | 'apprentice' 
  | 'parent' 
  | 'business_customer' 
  | 'finance';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  createdAt?: string;
  wardId?: string; // For parents: ID of linked apprentice
  companyName?: string; // For business customers
}

export type ApplicationStatus = 
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Interview'
  | 'Approved'
  | 'Rejected'
  | 'Accepted'
  | 'Active'
  | 'Completed'
  | 'Suspended'
  | 'Withdrawn';

export interface ApprenticeApplication {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  state: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  parentGuardian?: {
    name: string;
    phone: string;
    email?: string;
  };
  education: string;
  previousIctExperience: string;
  programme: string;
  preferredStartDate: string;
  statementOfPurpose?: string;
  passportPhotoUrl?: string;
  status: ApplicationStatus;
  submittedAt: string;
  reviewedBy?: string;
  reviewNotes?: string;
  assignedInstructor?: string;
  assignedStartDate?: string;
  agreementSigned?: boolean;
}

export interface ApprenticeshipAgreement {
  id: string;
  applicationId: string;
  apprenticeId: string;
  apprenticeName: string;
  version: string;
  termsAccepted: boolean;
  signatureText: string;
  signedAt: string;
  ipAddress?: string;
}

export interface ApprenticeRecord {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  admissionNumber: string;
  programme: string;
  status: 'Active' | 'Completed' | 'Suspended' | 'Withdrawn';
  enrolledDate: string;
  profileCompletion: number;
  overallProgress: number; // percentage
  currentModule: string;
  completedModules: string[];
  attendanceRate: number; // percentage
  totalFee: number;
  amountPaid: number;
  outstandingBalance: number;
  instructorName: string;
  instructorFeedback?: string;
  certificateId?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  apprenticeId: string;
  apprenticeName: string;
  programme: string;
  classTitle: string;
  instructorName: string;
  status: 'Present' | 'Late' | 'Absent' | 'Excused';
  notes?: string;
}

export type PaymentStatus = 
  | 'Pending'
  | 'Successful'
  | 'Failed'
  | 'Refunded'
  | 'Awaiting Verification';

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  userId: string;
  payerName: string;
  payerEmail: string;
  payerPhone?: string;
  serviceOrProgramme: string;
  amount: number;
  paymentType: 'manual' | 'online';
  paymentMethod: 'Moniepoint' | 'Bank Transfer' | 'POS' | 'Cash';
  transactionReference: string;
  proofUrl?: string;
  status: PaymentStatus;
  paymentDate: string;
  verifiedAt?: string;
  verifiedBy?: string;
  outstandingBalance?: number;
}

export interface CertificateRecord {
  id: string; // Unique Certificate ID, e.g. TB-2026-ICT-0891
  learnerName: string;
  programme: string;
  completionDate: string;
  issueDate: string;
  grade?: string;
  skillsAcquired: string[];
  directorSignature: string;
  verificationUrl: string;
  status: 'Valid' | 'Revoked' | 'Pending';
}

export interface Course {
  id: string;
  title: string;
  category: string;
  tagline: string;
  overview: string;
  modules: { title: string; topics: string[] }[];
  projects: string[];
  targetAudience: string[];
  requirements: string[];
  duration: string;
  trainingFormat: string; // 'Physical Hands-on (Ilora Campus)'
  certification: string;
  fee: number; // in NGN
  featured?: boolean;
  faqs: { q: string; a: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Printing & Branding' | 'Cyber & Online Services' | 'Documentation & Registration' | 'Sales & Tech Support';
  description: string;
  startingPrice?: number;
  priceType: 'fixed' | 'quote' | 'per_unit';
  priceLabel: string;
  turnaroundTime: string;
  requirements: string[];
  onlineRequestAvailable: boolean;
}

export type ServiceOrderStatus = 
  | 'Submitted'
  | 'Reviewing'
  | 'Approved'
  | 'In Progress'
  | 'Ready'
  | 'Completed'
  | 'Cancelled';

export interface ServiceOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  serviceName: string;
  category: string;
  quantity: number;
  instructions: string;
  fileAttachmentName?: string;
  deliveryOption: 'Pickup at Ilora Hub' | 'Delivery within Oyo/Oyo State';
  deadline: string;
  estimatedAmount: number;
  status: ServiceOrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Digital Skills' | 'AI' | 'Business' | 'Education' | 'Technology' | 'Entrepreneurship' | 'Community Development' | 'ThinkBright News';
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  type: 'Training' | 'Workshop' | 'Computer Literacy Day' | 'School Outreach' | 'Community Programme' | 'Webinar';
  date: string;
  time: string;
  location: string;
  description: string;
  seatsTotal: number;
  seatsRegistered: number;
  status: 'Upcoming' | 'Completed';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Education' | 'Web Development' | 'App Development' | 'Graphic Design' | 'AI' | 'Data' | 'Community Development' | 'Business Solutions';
  problem: string;
  solution: string;
  technology: string[];
  client: string;
  results: string;
  date: string;
  imageUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  programmeOrService: string;
  category?: 'student' | 'partner';
  impactHighlight?: string;
  metric?: string;
  badge?: string;
  avatarUrl?: string;
  organizationOrSchool?: string;
  verified?: boolean;
}

export interface ImpactStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'payment';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface AuditLogEntry {
  id: string;
  userEmail: string;
  action: string;
  timestamp: string;
  affectedRecord: string;
  details: string;
}
