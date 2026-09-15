import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ApprenticeApplication, 
  ApprenticeRecord, 
  ApprenticeshipAgreement, 
  PaymentRecord, 
  AttendanceRecord, 
  ServiceOrder, 
  CertificateRecord, 
  Course, 
  ServiceItem, 
  ImpactStat, 
  TestimonialItem, 
  BlogPost, 
  EventItem, 
  ProjectItem,
  AuditLogEntry
} from '../types';
import { 
  COURSES_DATA, 
  SERVICES_DATA, 
  INITIAL_IMPACT_STATS, 
  TESTIMONIALS_DATA, 
  PROJECTS_DATA, 
  BLOG_DATA, 
  EVENTS_DATA, 
  INITIAL_CERTIFICATES 
} from '../data/mockData';
import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  serverTimestamp,
  auth,
  onAuthStateChanged,
  handleFirestoreError,
  OperationType 
} from '../firebase';
import confetti from 'canvas-confetti';

interface DataContextType {
  courses: Course[];
  services: ServiceItem[];
  impactStats: ImpactStat[];
  testimonials: TestimonialItem[];
  projects: ProjectItem[];
  blogPosts: BlogPost[];
  events: EventItem[];
  certificates: CertificateRecord[];
  applications: ApprenticeApplication[];
  activeApprentices: ApprenticeRecord[];
  payments: PaymentRecord[];
  attendanceRecords: AttendanceRecord[];
  serviceOrders: ServiceOrder[];
  agreements: ApprenticeshipAgreement[];
  auditLogs: AuditLogEntry[];
  
  // Application Actions
  submitApplication: (appData: Omit<ApprenticeApplication, 'id' | 'status' | 'submittedAt'>) => Promise<string>;
  updateApplicationStatus: (appId: string, status: ApprenticeApplication['status'], notes?: string, assignedInstructor?: string) => Promise<void>;
  
  // Agreement Actions
  signAgreement: (applicationId: string, signatureText: string) => Promise<void>;
  
  // Payment Actions
  submitManualPayment: (payment: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'status' | 'paymentDate'>) => Promise<string>;
  verifyPayment: (paymentId: string, verifiedBy: string) => Promise<void>;
  processOnlinePayment: (payment: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'status' | 'paymentDate'>) => Promise<string>;
  
  // Attendance Actions
  markAttendance: (record: Omit<AttendanceRecord, 'id'>) => Promise<void>;
  
  // Service Orders Actions
  submitServiceOrder: (order: Omit<ServiceOrder, 'id' | 'orderNumber' | 'status' | 'paymentStatus' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: ServiceOrder['status']) => Promise<void>;
  
  // Certificate Actions
  verifyCertificate: (certId: string) => CertificateRecord | undefined;
  issueCertificate: (cert: Omit<CertificateRecord, 'id' | 'verificationUrl'>) => Promise<string>;
  
  // CMS Actions
  updateCourseFee: (courseId: string, fee: number) => void;
  updateServicePrice: (serviceId: string, priceLabel: string, startingPrice?: number) => void;
  updateImpactStat: (statId: string, value: number) => void;
  addAuditLog: (action: string, affectedRecord: string, details: string, userEmail: string) => void;
}

const INITIAL_APPLICATIONS: ApprenticeApplication[] = [
  {
    id: 'APP-2026-001',
    userId: 'demo-apprentice-01',
    fullName: 'Samuel Adebayo',
    email: 'samuel.adebayo@gmail.com',
    phone: '08134567890',
    whatsapp: '08134567890',
    dob: '2004-05-14',
    gender: 'Male',
    address: 'Isale-Oyo Road, Ilora, Oyo State',
    state: 'Oyo State',
    emergencyContact: {
      name: 'Chief Michael Adebayo',
      phone: '08033344455',
      relationship: 'Father'
    },
    parentGuardian: {
      name: 'Chief Michael Adebayo',
      phone: '08033344455',
      email: 'adebayo.senior@gmail.com'
    },
    education: 'Secondary School (SSCE Passed with 6 Credits)',
    previousIctExperience: 'Basic typing and smartphone usage',
    programme: 'Modern Web Development (HTML, CSS, JavaScript, React)',
    preferredStartDate: '2026-04-01',
    statementOfPurpose: 'I want to acquire real software development skills to build websites for local businesses and prepare for an international engineering career.',
    status: 'Active',
    submittedAt: '2026-02-10',
    assignedInstructor: 'Engr. Damilola Alabi',
    agreementSigned: true
  },
  {
    id: 'APP-2026-002',
    userId: 'user-app-002',
    fullName: 'Grace Oluwaseun Titilayo',
    email: 'grace.titilayo@gmail.com',
    phone: '09022334455',
    whatsapp: '09022334455',
    dob: '2005-09-22',
    gender: 'Female',
    address: 'Near Town Hall, Fiditi, Oyo State',
    state: 'Oyo State',
    emergencyContact: {
      name: 'Pastor E. Titilayo',
      phone: '08022233344',
      relationship: 'Guardian'
    },
    education: 'OND Computer Science in view',
    previousIctExperience: 'Completed basic graphic design in secondary school',
    programme: 'Graphic Design & Visual Brand Communication',
    preferredStartDate: '2026-04-15',
    statementOfPurpose: 'To become a certified brand designer handling commercial packaging and printing for organizations across Nigeria.',
    status: 'Under Review',
    submittedAt: '2026-03-08'
  },
  {
    id: 'APP-2026-003',
    userId: 'user-app-003',
    fullName: 'Ibrahim Farouk Danladi',
    email: 'farouk.danladi@yahoo.com',
    phone: '08167890123',
    whatsapp: '08167890123',
    dob: '2003-11-04',
    gender: 'Male',
    address: 'Okediji Area, Ilora',
    state: 'Oyo State',
    emergencyContact: {
      name: 'Hajiya Danladi',
      phone: '08099887766',
      relationship: 'Mother'
    },
    education: 'NCE Technical Education',
    previousIctExperience: 'Familiar with Microsoft Office Suite',
    programme: 'Python Programming & Automation',
    preferredStartDate: '2026-04-01',
    status: 'Interview',
    submittedAt: '2026-03-01'
  }
];

const INITIAL_APPRENTICES: ApprenticeRecord[] = [
  {
    id: 'demo-apprentice-01',
    userId: 'demo-apprentice-01',
    fullName: 'Samuel Adebayo',
    email: 'samuel.adebayo@gmail.com',
    phone: '08134567890',
    admissionNumber: 'TB/APP/2026/042',
    programme: 'Modern Web Development (HTML, CSS, JavaScript, React)',
    status: 'Active',
    enrolledDate: '2026-02-15',
    profileCompletion: 95,
    overallProgress: 68,
    currentModule: 'React Component Architecture & Hooks',
    completedModules: ['Semantic HTML5 & Accessibility', 'Modern CSS & Tailwind UI', 'JavaScript ES6+ & DOM'],
    attendanceRate: 94,
    totalFee: 65000,
    amountPaid: 45000,
    outstandingBalance: 20000,
    instructorName: 'Engr. Damilola Alabi',
    instructorFeedback: 'Samuel demonstrates exceptional diligence, grasps complex JavaScript concepts quickly, and actively assists peers in Lab practicals.'
  }
];

const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-2026-001',
    receiptNumber: 'TB-REC-2026-0041',
    userId: 'demo-apprentice-01',
    payerName: 'Chief Michael Adebayo',
    payerEmail: 'adebayo.senior@gmail.com',
    serviceOrProgramme: 'Modern Web Development Apprenticeship (Tuition Deposit)',
    amount: 20000,
    paymentType: 'manual',
    paymentMethod: 'Bank Transfer',
    transactionReference: 'TRF/Opay/98471829371',
    status: 'Successful',
    paymentDate: '2026-02-12',
    verifiedAt: '2026-02-12',
    verifiedBy: 'Bolanle Ojo (Finance)',
    outstandingBalance: 45000
  },
  {
    id: 'PAY-2026-002',
    receiptNumber: 'TB-REC-2026-0042',
    userId: 'demo-apprentice-01',
    payerName: 'Samuel Adebayo',
    payerEmail: 'samuel.adebayo@gmail.com',
    serviceOrProgramme: 'Modern Web Development Apprenticeship (2nd Instalment)',
    amount: 25000,
    paymentType: 'online',
    paymentMethod: 'Moniepoint',
    transactionReference: 'MP-20260301-98762',
    status: 'Successful',
    paymentDate: '2026-03-01',
    verifiedAt: '2026-03-01',
    verifiedBy: 'System (Moniepoint Instant)',
    outstandingBalance: 20000
  },
  {
    id: 'PAY-2026-003',
    receiptNumber: 'TB-REC-2026-0043',
    userId: 'demo-business-01',
    payerName: 'Alhaji Rasheed Okediji',
    payerEmail: 'info@okedijifarms.ng',
    serviceOrProgramme: 'Corporate Banner Printing & Flex Billboards',
    amount: 36000,
    paymentType: 'manual',
    paymentMethod: 'Bank Transfer',
    transactionReference: 'GTB-TRF-091823746',
    status: 'Awaiting Verification',
    paymentDate: '2026-03-14',
    outstandingBalance: 0
  }
];

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att-1', date: '2026-03-13', apprenticeId: 'demo-apprentice-01', apprenticeName: 'Samuel Adebayo', programme: 'Modern Web Development', classTitle: 'React Hooks & State Lifecycles', instructorName: 'Engr. Damilola Alabi', status: 'Present' },
  { id: 'att-2', date: '2026-03-11', apprenticeId: 'demo-apprentice-01', apprenticeName: 'Samuel Adebayo', programme: 'Modern Web Development', classTitle: 'Component Props & Tailwind Integration', instructorName: 'Engr. Damilola Alabi', status: 'Present' },
  { id: 'att-3', date: '2026-03-09', apprenticeId: 'demo-apprentice-01', apprenticeName: 'Samuel Adebayo', programme: 'Modern Web Development', classTitle: 'Asynchronous JavaScript & Fetch API', instructorName: 'Engr. Damilola Alabi', status: 'Late', notes: 'Arrived 15 mins late due to road maintenance; caught up rapidly.' },
  { id: 'att-4', date: '2026-03-06', apprenticeId: 'demo-apprentice-01', apprenticeName: 'Samuel Adebayo', programme: 'Modern Web Development', classTitle: 'DOM Events & Form Validation', instructorName: 'Engr. Damilola Alabi', status: 'Present' },
  { id: 'att-5', date: '2026-03-04', apprenticeId: 'demo-apprentice-01', apprenticeName: 'Samuel Adebayo', programme: 'Modern Web Development', classTitle: 'JavaScript ES6 Array Methods (Map, Filter)', instructorName: 'Engr. Damilola Alabi', status: 'Present' }
];

const INITIAL_SERVICE_ORDERS: ServiceOrder[] = [
  {
    id: 'ORD-2026-101',
    orderNumber: 'TB-ORD-2026-101',
    customerId: 'demo-business-01',
    customerName: 'Alhaji Rasheed Okediji',
    customerPhone: '08055566677',
    customerEmail: 'info@okedijifarms.ng',
    serviceId: 'banner-printing',
    serviceName: 'Large Format Flex & Banner Printing',
    category: 'Printing & Branding',
    quantity: 3,
    instructions: '10ft x 4ft flex banner for our upcoming Agro-Summit in Oyo with brass eyelets on all corners.',
    deliveryOption: 'Pickup at Ilora Hub',
    deadline: '2026-03-20',
    estimatedAmount: 36000,
    status: 'In Progress',
    paymentStatus: 'Awaiting Verification',
    createdAt: '2026-03-14',
    updatedAt: '2026-03-14'
  },
  {
    id: 'ORD-2026-102',
    orderNumber: 'TB-ORD-2026-102',
    customerId: 'cust-102',
    customerName: 'Grace Crest Academy (Proprietress)',
    customerPhone: '08023412345',
    customerEmail: 'gracecrest@school.ng',
    serviceId: 'plastic-id-cards',
    serviceName: 'Plastic PVC ID Card Printing',
    category: 'Printing & Branding',
    quantity: 120,
    instructions: '120 Student ID cards with custom branded red lanyards and safety clips.',
    deliveryOption: 'Delivery within Oyo/Oyo State',
    deadline: '2026-03-25',
    estimatedAmount: 180000,
    status: 'Approved',
    paymentStatus: 'Successful',
    createdAt: '2026-03-10',
    updatedAt: '2026-03-12'
  }
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'log-1', userEmail: 'thinkbrightinfotech@gmail.com', action: 'System Initialization', timestamp: '2026-03-15 08:00', affectedRecord: 'System Settings', details: 'Initialized ThinkBright ecosystem with verified course registry and role permissions.' },
  { id: 'log-2', userEmail: 'admin@thinkbrightinfotech.com', action: 'Application Approved', timestamp: '2026-03-14 11:30', affectedRecord: 'APP-2026-001', details: 'Approved Samuel Adebayo for Web Development Apprenticeship.' },
  { id: 'log-3', userEmail: 'finance@thinkbrightinfotech.com', action: 'Payment Verification', timestamp: '2026-03-01 16:20', affectedRecord: 'PAY-2026-002', details: 'Moniepoint transaction reference MP-20260301-98762 verified and official receipt generated.' }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [impactStats, setImpactStats] = useState<ImpactStat[]>(INITIAL_IMPACT_STATS);
  const [testimonials] = useState<TestimonialItem[]>(TESTIMONIALS_DATA);
  const [projects] = useState<ProjectItem[]>(PROJECTS_DATA);
  const [blogPosts] = useState<BlogPost[]>(BLOG_DATA);
  const [events] = useState<EventItem[]>(EVENTS_DATA);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(INITIAL_CERTIFICATES);
  const [applications, setApplications] = useState<ApprenticeApplication[]>(INITIAL_APPLICATIONS);
  const [activeApprentices, setActiveApprentices] = useState<ApprenticeRecord[]>(INITIAL_APPRENTICES);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(INITIAL_SERVICE_ORDERS);
  const [agreements, setAgreements] = useState<ApprenticeshipAgreement[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Firestore sync for applications (only attach listener when user is authenticated as per Firebase guidelines)
  useEffect(() => {
    let unsubSnapshot: (() => void) | null = null;
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (unsubSnapshot) {
        unsubSnapshot();
        unsubSnapshot = null;
      }
      if (user) {
        try {
          const q = collection(db, 'applications');
          unsubSnapshot = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
              const loaded: ApprenticeApplication[] = [];
              snapshot.forEach((docSnap) => {
                loaded.push({ id: docSnap.id, ...docSnap.data() } as ApprenticeApplication);
              });
              setApplications(loaded);
            }
          }, (err) => {
            handleFirestoreError(err, OperationType.LIST, 'applications');
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.LIST, 'applications');
        }
      }
    });

    return () => {
      if (unsubSnapshot) unsubSnapshot();
      unsubAuth();
    };
  }, []);

  const addAuditLog = (action: string, affectedRecord: string, details: string, userEmail: string) => {
    const entry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      action,
      affectedRecord,
      details,
      userEmail,
      timestamp: new Date().toLocaleString('en-GB')
    };
    setAuditLogs(prev => [entry, ...prev]);
  };

  const submitApplication = async (appData: Omit<ApprenticeApplication, 'id' | 'status' | 'submittedAt'>): Promise<string> => {
    const newId = `APP-2026-${String(applications.length + 1).padStart(3, '0')}`;
    const newApp: ApprenticeApplication = {
      ...appData,
      id: newId,
      status: 'Submitted',
      submittedAt: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...prev]);

    try {
      await setDoc(doc(db, 'applications', newId), {
        ...newApp,
        serverCreatedAt: serverTimestamp()
      });
    } catch {
      // Local state is already updated
    }

    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    addAuditLog('New Application Submitted', newId, `Application submitted for ${newApp.fullName} (${newApp.programme})`, newApp.email);
    return newId;
  };

  const updateApplicationStatus = async (
    appId: string, 
    status: ApprenticeApplication['status'], 
    notes?: string, 
    assignedInstructor?: string
  ) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          reviewNotes: notes || app.reviewNotes,
          assignedInstructor: assignedInstructor || app.assignedInstructor
        };
      }
      return app;
    }));

    // If status became 'Active' or 'Approved', create apprentice record if not existing
    if (status === 'Approved') {
      const app = applications.find(a => a.id === appId);
      if (app && !activeApprentices.some(a => a.userId === app.userId)) {
        const admissionNum = `TB/APP/2026/${String(activeApprentices.length + 43).padStart(3, '0')}`;
        const newApprentice: ApprenticeRecord = {
          id: app.userId,
          userId: app.userId,
          fullName: app.fullName,
          email: app.email,
          phone: app.phone,
          admissionNumber: admissionNum,
          programme: app.programme,
          status: 'Active',
          enrolledDate: new Date().toISOString().split('T')[0],
          profileCompletion: 80,
          overallProgress: 10,
          currentModule: 'Orientation & Development Environment Setup',
          completedModules: [],
          attendanceRate: 100,
          totalFee: 65000,
          amountPaid: 0,
          outstandingBalance: 65000,
          instructorName: assignedInstructor || 'Engr. Damilola Alabi'
        };
        setActiveApprentices(prev => [newApprentice, ...prev]);
      }
    }

    addAuditLog('Application Status Updated', appId, `Status changed to ${status}. Notes: ${notes || 'N/A'}`, 'admin@thinkbrightinfotech.com');
  };

  const signAgreement = async (applicationId: string, signatureText: string) => {
    const app = applications.find(a => a.id === applicationId);
    const newAgreement: ApprenticeshipAgreement = {
      id: `AGR-2026-${Date.now()}`,
      applicationId,
      apprenticeId: app?.userId || 'apprentice',
      apprenticeName: app?.fullName || signatureText,
      version: 'v1.2-2026-Nigeria',
      termsAccepted: true,
      signatureText,
      signedAt: new Date().toLocaleString('en-GB'),
      ipAddress: 'Oyo State Network (Verified Client Node)'
    };

    setAgreements(prev => [newAgreement, ...prev]);
    
    // Update application to agreementSigned
    setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, agreementSigned: true, status: 'Active' } : a));

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    addAuditLog('Apprenticeship Agreement Signed', applicationId, `Agreement v1.2 signed electronically by ${signatureText}`, app?.email || 'apprentice');
  };

  const submitManualPayment = async (payment: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'status' | 'paymentDate'>): Promise<string> => {
    const newId = `PAY-2026-${String(payments.length + 1).padStart(3, '0')}`;
    const receiptNum = `TB-REC-2026-${String(payments.length + 45).padStart(4, '0')}`;
    const newPayment: PaymentRecord = {
      ...payment,
      id: newId,
      receiptNumber: receiptNum,
      status: 'Awaiting Verification',
      paymentDate: new Date().toISOString().split('T')[0]
    };

    setPayments(prev => [newPayment, ...prev]);

    try {
      await setDoc(doc(db, 'payments', newId), {
        ...newPayment,
        serverCreatedAt: serverTimestamp()
      });
    } catch {
      // Memory state
    }

    addAuditLog('Manual Payment Submitted', newId, `Submitted ₦${payment.amount.toLocaleString()} via ${payment.paymentMethod} (Ref: ${payment.transactionReference})`, payment.payerEmail);
    return receiptNum;
  };

  const verifyPayment = async (paymentId: string, verifiedBy: string) => {
    setPayments(prev => prev.map(p => {
      if (p.id === paymentId) {
        return {
          ...p,
          status: 'Successful',
          verifiedAt: new Date().toISOString().split('T')[0],
          verifiedBy
        };
      }
      return p;
    }));

    // Update apprentice balance if matching
    const payment = payments.find(p => p.id === paymentId);
    if (payment) {
      setActiveApprentices(prev => prev.map(a => {
        if (a.userId === payment.userId || a.fullName.toLowerCase() === payment.payerName.toLowerCase()) {
          const newPaid = a.amountPaid + payment.amount;
          return {
            ...a,
            amountPaid: newPaid,
            outstandingBalance: Math.max(0, a.totalFee - newPaid)
          };
        }
        return a;
      }));
    }

    addAuditLog('Payment Verified', paymentId, `Payment verified by ${verifiedBy}. Official receipt confirmed.`, verifiedBy);
  };

  const processOnlinePayment = async (payment: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'status' | 'paymentDate'>): Promise<string> => {
    const newId = `PAY-2026-${String(payments.length + 1).padStart(3, '0')}`;
    const receiptNum = `TB-REC-2026-${String(payments.length + 45).padStart(4, '0')}`;
    const newPayment: PaymentRecord = {
      ...payment,
      id: newId,
      receiptNumber: receiptNum,
      status: 'Successful',
      paymentDate: new Date().toISOString().split('T')[0],
      verifiedAt: new Date().toISOString().split('T')[0],
      verifiedBy: 'Moniepoint Direct Gateway'
    };

    setPayments(prev => [newPayment, ...prev]);

    // Update apprentice balance
    setActiveApprentices(prev => prev.map(a => {
      if (a.userId === payment.userId || a.fullName.toLowerCase() === payment.payerName.toLowerCase()) {
        const newPaid = a.amountPaid + payment.amount;
        return {
          ...a,
          amountPaid: newPaid,
          outstandingBalance: Math.max(0, a.totalFee - newPaid)
        };
      }
      return a;
    }));

    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    addAuditLog('Online Payment Processed', newId, `Moniepoint processed ₦${payment.amount.toLocaleString()} (Receipt: ${receiptNum})`, payment.payerEmail);
    return receiptNum;
  };

  const markAttendance = async (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: `att-${Date.now()}`
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
    addAuditLog('Attendance Marked', record.apprenticeId, `${record.status} recorded for ${record.apprenticeName} in ${record.classTitle}`, record.instructorName);
  };

  const submitServiceOrder = async (order: Omit<ServiceOrder, 'id' | 'orderNumber' | 'status' | 'paymentStatus' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const newId = `ORD-2026-${String(serviceOrders.length + 103).padStart(3, '0')}`;
    const orderNum = `TB-ORD-2026-${String(serviceOrders.length + 103).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const newOrder: ServiceOrder = {
      ...order,
      id: newId,
      orderNumber: orderNum,
      status: 'Submitted',
      paymentStatus: 'Pending',
      createdAt: today,
      updatedAt: today
    };

    setServiceOrders(prev => [newOrder, ...prev]);
    addAuditLog('Service Order Created', orderNum, `Order for ${order.serviceName} (${order.quantity} units) by ${order.customerName}`, order.customerEmail);
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    return orderNum;
  };

  const updateOrderStatus = async (orderId: string, status: ServiceOrder['status']) => {
    setServiceOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString().split('T')[0] } : o));
    addAuditLog('Service Order Status Changed', orderId, `Status updated to ${status}`, 'admin@thinkbrightinfotech.com');
  };

  const verifyCertificate = (certId: string): CertificateRecord | undefined => {
    const trimmed = certId.trim().toUpperCase();
    return certificates.find(c => c.id.toUpperCase() === trimmed);
  };

  const issueCertificate = async (cert: Omit<CertificateRecord, 'id' | 'verificationUrl'>): Promise<string> => {
    const count = certificates.length + 1;
    const certId = `TB-2026-CERT-${String(count).padStart(4, '0')}`;
    const newCert: CertificateRecord = {
      ...cert,
      id: certId,
      verificationUrl: `https://thinkbrightinfotech.com/verify/${certId}`
    };
    setCertificates(prev => [newCert, ...prev]);
    addAuditLog('Certificate Issued', certId, `Certificate issued to ${cert.learnerName} for ${cert.programme}`, 'Opeyemi Israel Okunade');
    return certId;
  };

  const updateCourseFee = (courseId: string, fee: number) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, fee } : c));
    addAuditLog('Course Fee Updated', courseId, `Fee set to ₦${fee.toLocaleString()}`, 'super_admin');
  };

  const updateServicePrice = (serviceId: string, priceLabel: string, startingPrice?: number) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, priceLabel, startingPrice: startingPrice ?? s.startingPrice } : s));
    addAuditLog('Service Price Updated', serviceId, `Price updated to ${priceLabel}`, 'super_admin');
  };

  const updateImpactStat = (statId: string, value: number) => {
    setImpactStats(prev => prev.map(s => s.id === statId ? { ...s, value } : s));
    addAuditLog('Impact Metric Updated', statId, `Value updated to ${value}`, 'super_admin');
  };

  return (
    <DataContext.Provider value={{
      courses,
      services,
      impactStats,
      testimonials,
      projects,
      blogPosts,
      events,
      certificates,
      applications,
      activeApprentices,
      payments,
      attendanceRecords,
      serviceOrders,
      agreements,
      auditLogs,
      submitApplication,
      updateApplicationStatus,
      signAgreement,
      submitManualPayment,
      verifyPayment,
      processOnlinePayment,
      markAttendance,
      submitServiceOrder,
      updateOrderStatus,
      verifyCertificate,
      issueCertificate,
      updateCourseFee,
      updateServicePrice,
      updateImpactStat,
      addAuditLog
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
