import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  db,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from '../firebase';
import { UserProfile, UserRole, NotificationItem } from '../types';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInDemoUser: (role: UserRole) => void;
  signOut: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
}

const DEFAULT_DEMO_USERS: Record<UserRole, UserProfile> = {
  super_admin: {
    uid: 'demo-superadmin-01',
    email: 'thinkbrightinfotech@gmail.com',
    displayName: 'Opeyemi Israel Okunade',
    role: 'super_admin',
    phone: '09034836379'
  },
  admin: {
    uid: 'demo-admin-01',
    email: 'admin@thinkbrightinfotech.com',
    displayName: 'Adebisi Taiwo (Operations Admin)',
    role: 'admin',
    phone: '09015306791'
  },
  instructor: {
    uid: 'demo-instructor-01',
    email: 'instructor@thinkbrightinfotech.com',
    displayName: 'Engr. Damilola Alabi',
    role: 'instructor',
    phone: '08023456789'
  },
  apprentice: {
    uid: 'demo-apprentice-01',
    email: 'samuel.adebayo@gmail.com',
    displayName: 'Samuel Adebayo',
    role: 'apprentice',
    phone: '08134567890'
  },
  parent: {
    uid: 'demo-parent-01',
    email: 'adebayo.senior@gmail.com',
    displayName: 'Chief Michael Adebayo',
    role: 'parent',
    phone: '08033344455',
    wardId: 'demo-apprentice-01'
  },
  business_customer: {
    uid: 'demo-business-01',
    email: 'info@okedijifarms.ng',
    displayName: 'Alhaji Rasheed Okediji',
    role: 'business_customer',
    companyName: 'Okediji Agro-Processing Ltd',
    phone: '08055566677'
  },
  finance: {
    uid: 'demo-finance-01',
    email: 'finance@thinkbrightinfotech.com',
    displayName: 'Bolanle Ojo (Finance Officer)',
    role: 'finance',
    phone: '09015306791'
  }
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    userId: 'demo-apprentice-01',
    title: 'Training Schedule Update',
    message: 'React Component Architecture session starts at 10:00 AM on Thursday in Lab 1.',
    type: 'info',
    read: false,
    createdAt: 'Today, 8:30 AM'
  },
  {
    id: 'n2',
    userId: 'demo-apprentice-01',
    title: 'Manual Payment Verified',
    message: 'Your tuition instalment payment of ₦25,000 has been verified. Official Receipt #TB-REC-2026-0042 is available.',
    type: 'payment',
    read: false,
    createdAt: 'Yesterday, 4:15 PM'
  },
  {
    id: 'n3',
    userId: 'demo-apprentice-01',
    title: 'New Assignment Uploaded',
    message: 'Engr. Damilola posted Assignment #3: Build a Flexbox Pricing Matrix.',
    type: 'warning',
    read: true,
    createdAt: '3 days ago'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    // Check saved session in localStorage first
    const savedRole = localStorage.getItem('thinkbright_user_role') as UserRole | null;
    const savedUserJson = localStorage.getItem('thinkbright_user_profile');
    
    if (savedUserJson) {
      try {
        setCurrentUser(JSON.parse(savedUserJson));
        setLoading(false);
      } catch {
        // Continue
      }
    } else if (savedRole && DEFAULT_DEMO_USERS[savedRole]) {
      setCurrentUser(DEFAULT_DEMO_USERS[savedRole]);
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);
          
          let role: UserRole = 'apprentice';
          if (firebaseUser.email === 'thinkbrightinfotech@gmail.com') {
            role = 'super_admin';
          }

          if (docSnap.exists()) {
            const data = docSnap.data();
            const profile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || data.displayName || 'ThinkBright Learner',
              role: data.role || role,
              phone: data.phone || '',
              avatarUrl: firebaseUser.photoURL || data.avatarUrl || ''
            };
            setCurrentUser(profile);
            localStorage.setItem('thinkbright_user_profile', JSON.stringify(profile));
          } else {
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'ThinkBright Learner',
              role: role,
              phone: '',
              avatarUrl: firebaseUser.photoURL || '',
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, {
              ...newProfile,
              serverCreatedAt: serverTimestamp()
            });
            setCurrentUser(newProfile);
            localStorage.setItem('thinkbright_user_profile', JSON.stringify(newProfile));
          }
        } catch {
          // Fallback if firestore rules or offline
          const fallbackProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'ThinkBright Member',
            role: firebaseUser.email === 'thinkbrightinfotech@gmail.com' ? 'super_admin' : 'apprentice',
            avatarUrl: firebaseUser.photoURL || ''
          };
          setCurrentUser(fallbackProfile);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.warn('Popup sign in blocked or error:', err?.message);
      // Fallback to demo admin so user isn't stuck in restrictive iframe environments
      signInDemoUser('super_admin');
    } finally {
      setLoading(false);
    }
  };

  const signInDemoUser = (role: UserRole) => {
    const user = DEFAULT_DEMO_USERS[role];
    setCurrentUser(user);
    localStorage.setItem('thinkbright_user_role', role);
    localStorage.setItem('thinkbright_user_profile', JSON.stringify(user));
  };

  const switchRole = (role: UserRole) => {
    const targetUser = DEFAULT_DEMO_USERS[role];
    const updated: UserProfile = {
      ...(currentUser || targetUser),
      ...targetUser,
      role
    };
    setCurrentUser(updated);
    localStorage.setItem('thinkbright_user_role', role);
    localStorage.setItem('thinkbright_user_profile', JSON.stringify(updated));
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch {
      // ignore
    }
    setCurrentUser(null);
    localStorage.removeItem('thinkbright_user_role');
    localStorage.removeItem('thinkbright_user_profile');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      userId: currentUser?.uid || 'guest',
      title,
      message,
      type,
      read: false,
      createdAt: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      signInWithGoogle,
      signInDemoUser,
      signOut,
      switchRole,
      notifications,
      unreadNotificationCount,
      markNotificationAsRead,
      addNotification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
