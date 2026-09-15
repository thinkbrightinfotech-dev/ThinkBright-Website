import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { UserRole, ApprenticeApplication, PaymentRecord } from '../types';
import { ReceiptModal } from '../components/ReceiptModal';
import { 
  Shield, 
  Users, 
  GraduationCap, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  DollarSign, 
  Search, 
  Edit3, 
  Printer, 
  TrendingUp, 
  AlertCircle, 
  Layers, 
  Calendar, 
  UserCheck, 
  Award,
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

interface PortalViewProps {
  onOpenPaymentModal: (serviceOrProgramme: string, amount: number) => void;
  setActiveTab: (tab: string) => void;
}

export const PortalView: React.FC<PortalViewProps> = ({ onOpenPaymentModal, setActiveTab }) => {
  const { currentUser, switchRole, addNotification } = useAuth();
  const { 
    applications, 
    updateApplicationStatus, 
    activeApprentices, 
    payments, 
    verifyPayment, 
    attendanceRecords, 
    markAttendance,
    serviceOrders,
    updateOrderStatus,
    signAgreement,
    courses,
    updateCourseFee,
    auditLogs
  } = useData();

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  // Instructor attendance form state
  const [attStudentId, setAttStudentId] = useState(activeApprentices[0]?.id || 'demo-apprentice-01');
  const [attDate, setAttDate] = useState(new Date().toISOString().split('T')[0]);
  const [attClassTitle, setAttClassTitle] = useState('React State Lifecycles & Async Operations');
  const [attStatus, setAttStatus] = useState<'Present' | 'Late' | 'Absent' | 'Excused'>('Present');
  const [attNotes, setAttNotes] = useState('');

  // Agreement electronic sign state
  const [agreementSignText, setAgreementSignText] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);

  // CMS edit fee state
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [newFeeValue, setNewFeeValue] = useState<number>(0);

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'super_admin', label: 'Super Admin', desc: 'Founder executive controls, CMS & finances' },
    { role: 'admin', label: 'Operations Admin', desc: 'Admissions & orders review' },
    { role: 'instructor', label: 'Lead Instructor', desc: 'Attendance & grades' },
    { role: 'apprentice', label: 'Active Apprentice', desc: 'Learning journey & receipts' },
    { role: 'parent', label: 'Parent / Guardian', desc: 'Ward progress & fee ledger' },
    { role: 'business_customer', label: 'Business Client', desc: 'Printing orders & invoices' },
    { role: 'finance', label: 'Finance Officer', desc: 'Manual transfer audits' },
  ];

  const currentRole = currentUser?.role || 'super_admin';

  // Metrics calculations
  const totalRevenue = payments
    .filter(p => p.status === 'Successful')
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'Awaiting Verification');
  const pendingApps = applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review');

  const handleMarkAttendanceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const student = activeApprentices.find(a => a.id === attStudentId);
    if (!student) return;

    await markAttendance({
      date: attDate,
      apprenticeId: student.id,
      apprenticeName: student.fullName,
      programme: student.programme,
      classTitle: attClassTitle,
      instructorName: currentUser?.displayName || 'Lead Instructor',
      status: attStatus,
      notes: attNotes
    });

    addNotification('Attendance Marked', `Recorded ${attStatus} for ${student.fullName}`, 'info');
    setAttNotes('');
  };

  const handleSignAgreementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementChecked || !agreementSignText.trim()) return;

    const myApp = applications.find(a => a.userId === currentUser?.uid) || applications[0];
    if (myApp) {
      await signAgreement(myApp.id, agreementSignText);
      addNotification('Agreement Signed', 'Apprenticeship contract successfully e-signed and activated.', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Role Switching Control Bar */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">ThinkBright Ecosystem Command Center</span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Interactive Role Perspectives</span>
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Active view: <strong className="text-white uppercase font-mono">{currentRole.replace('_', ' ')}</strong> ({currentUser?.displayName})
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {roles.map(r => (
            <button
              key={r.role}
              onClick={() => switchRole(r.role)}
              className={`p-2.5 rounded-2xl text-left transition-all border ${
                currentRole === r.role
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-850 hover:text-white'
              }`}
            >
              <p className="text-xs truncate">{r.label}</p>
              <p className="text-[9px] opacity-75 font-normal truncate mt-0.5">{r.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1 & 2: SUPER ADMIN & OPERATIONS ADMIN */}
      {(currentRole === 'super_admin' || currentRole === 'admin') && (
        <div className="space-y-10">
          
          {/* Executive Metrics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Verified Revenue</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-1">
                ₦{totalRevenue.toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">From courses, tuition & services</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Apprentices</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 mt-1">
                {activeApprentices.length}
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">In commercial lab rotations</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Applications Pending</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-1">
                {pendingApps.length}
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">Awaiting admissions review</span>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Manual Payments</span>
              <p className="text-2xl sm:text-3xl font-black font-mono text-blue-400 mt-1">
                {pendingPayments.length}
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">Bank transfers to verify</span>
            </div>
          </div>

          {/* Section: Apprenticeship Admissions Review Queue */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Apprenticeship Admissions Queue</h3>
                <p className="text-xs text-slate-400 mt-0.5">Review candidate dossiers, schedule interviews, and assign lead instructors</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {applications.length} Candidates Logged
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">App ID</th>
                    <th className="py-3 px-3">Candidate Name</th>
                    <th className="py-3 px-3">Track / Programme</th>
                    <th className="py-3 px-3">Submitted</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {applications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-850/60 transition-colors">
                      <td className="py-3.5 px-3 font-mono text-cyan-400 font-semibold">{app.id}</td>
                      <td className="py-3.5 px-3">
                        <p className="font-bold text-white">{app.fullName}</p>
                        <p className="text-[11px] text-slate-400">{app.phone} • {app.address}</p>
                      </td>
                      <td className="py-3.5 px-3 text-slate-300 max-w-xs">{app.programme}</td>
                      <td className="py-3.5 px-3 text-slate-400">{app.submittedAt}</td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          app.status === 'Active' || app.status === 'Approved'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : app.status === 'Interview'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {app.status !== 'Approved' && app.status !== 'Active' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Approved', 'Approved after admissions review', 'Engr. Damilola Alabi')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold"
                            >
                              Approve
                            </button>
                          )}
                          {app.status === 'Submitted' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Interview', 'Invited to physical hub interview')}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-semibold"
                            >
                              Interview
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: CMS Course Fees Manager */}
          {currentRole === 'super_admin' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Course Fee & Pricing Manager</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Edit live course tuition fees across the application</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.slice(0, 6).map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white truncate max-w-[180px]">{c.title}</p>
                      <p className="text-[11px] text-cyan-400 font-mono font-bold mt-0.5">₦{c.fee.toLocaleString()}</p>
                    </div>
                    {editingCourseId === c.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={newFeeValue}
                          onChange={(e) => setNewFeeValue(Number(e.target.value))}
                          className="w-20 px-2 py-1 bg-slate-900 border border-cyan-500 rounded text-white text-xs font-mono"
                        />
                        <button
                          onClick={() => {
                            updateCourseFee(c.id, newFeeValue);
                            setEditingCourseId(null);
                          }}
                          className="px-2 py-1 bg-cyan-600 text-white rounded text-xs font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingCourseId(c.id);
                          setNewFeeValue(c.fee);
                        }}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Fee</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Audit Logs */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white font-display">System Action & Audit Logs</h3>
            <div className="space-y-2 max-h-52 overflow-y-auto text-xs">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-cyan-300">{log.action}</span>
                    <span className="text-slate-400 ml-2">• {log.details}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono shrink-0 ml-4">
                    {log.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* VIEW 3: INSTRUCTOR VIEW */}
      {currentRole === 'instructor' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Mark Attendance Form */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Mark Practical Class Attendance</h3>
                <p className="text-xs text-slate-400 mt-0.5">Log daily attendance into apprentice permanent record</p>
              </div>

              <form onSubmit={handleMarkAttendanceSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Select Apprentice *</label>
                  <select
                    value={attStudentId}
                    onChange={(e) => setAttStudentId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  >
                    {activeApprentices.map(a => (
                      <option key={a.id} value={a.id}>{a.fullName} ({a.admissionNumber})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Session Date *</label>
                    <input
                      type="date"
                      required
                      value={attDate}
                      onChange={(e) => setAttDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Status *</label>
                    <select
                      value={attStatus}
                      onChange={(e) => setAttStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Present">Present</option>
                      <option value="Late">Late</option>
                      <option value="Absent">Absent</option>
                      <option value="Excused">Excused</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Practical Topic / Lab Session *</label>
                  <input
                    type="text"
                    required
                    value={attClassTitle}
                    onChange={(e) => setAttClassTitle(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Instructor Observations / Notes</label>
                  <textarea
                    rows={2}
                    value={attNotes}
                    onChange={(e) => setAttNotes(e.target.value)}
                    placeholder="e.g. Completed all hands-on exercises with distinction..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Submit Verified Attendance</span>
                </button>
              </form>
            </div>

            {/* Attendance History */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Recent Attendance Register Logs</h3>
                <p className="text-xs text-slate-400 mt-0.5">Real-time attendance timeline</p>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto text-xs">
                {attendanceRecords.map(rec => (
                  <div key={rec.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{rec.apprenticeName}</p>
                      <p className="text-slate-400 text-[11px]">{rec.classTitle}</p>
                      {rec.notes && <p className="text-amber-300/80 text-[10px] mt-0.5 italic">{rec.notes}</p>}
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rec.status === 'Present' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        rec.status === 'Late' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {rec.status}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">{rec.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 4: APPRENTICE VIEW */}
      {currentRole === 'apprentice' && (
        <div className="space-y-10">
          
          {/* Apprentice Profile Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase tracking-wide">
                  Enrolled Apprentice Dossier
                </span>
                <h2 className="text-2xl font-black text-white font-display mt-2">
                  {activeApprentices[0]?.fullName || 'Samuel Adebayo'}
                </h2>
                <p className="text-xs text-cyan-300 font-mono mt-0.5">
                  Admission No: {activeApprentices[0]?.admissionNumber || 'TB/APP/2026/042'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenPaymentModal('Tuition Instalment', activeApprentices[0]?.outstandingBalance || 20000)}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-600/30"
                >
                  Pay Outstanding Fees
                </button>
              </div>
            </div>

            {/* Progress & Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Curriculum Progress</span>
                <p className="text-xl font-bold font-mono text-cyan-400 mt-1">
                  {activeApprentices[0]?.overallProgress || 68}%
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Verified Attendance</span>
                <p className="text-xl font-bold font-mono text-emerald-400 mt-1">
                  {activeApprentices[0]?.attendanceRate || 94}%
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Total Fee Paid</span>
                <p className="text-xl font-bold font-mono text-white mt-1">
                  ₦{(activeApprentices[0]?.amountPaid || 45000).toLocaleString()}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Outstanding Balance</span>
                <p className="text-xl font-bold font-mono text-amber-400 mt-1">
                  ₦{(activeApprentices[0]?.outstandingBalance || 20000).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Electronic Agreement Section */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-cyan-400" />
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Apprenticeship Learning Agreement</h3>
                  <p className="text-xs text-slate-400">Formal legal contract v1.2 for training & commercial rotation</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Electronically Signed & Active</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              Contract signed by <strong>Samuel Adebayo</strong>. Governed by ThinkBright Infotech code of conduct, minimum 85% attendance clause, non-disclosure of external client assets, and digital certification upon final project exhibition.
            </p>
          </div>

          {/* Payment Receipts & Invoices Table */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">Official Financial Receipts</h3>
              <span className="text-xs text-slate-400">Click any row to print official stamped receipt</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Receipt No</th>
                    <th className="py-3 px-3">Service / Purpose</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Method</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payments.filter(p => p.userId === 'demo-apprentice-01' || p.payerName.includes('Adebayo')).map(pay => (
                    <tr key={pay.id} className="hover:bg-slate-850/60 transition-colors">
                      <td className="py-3.5 px-3 font-mono text-cyan-400 font-bold">{pay.receiptNumber}</td>
                      <td className="py-3.5 px-3 font-medium text-white">{pay.serviceOrProgramme}</td>
                      <td className="py-3.5 px-3 font-mono font-bold text-slate-200">₦{pay.amount.toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-slate-400">{pay.paymentMethod}</td>
                      <td className="py-3.5 px-3 text-slate-400">{pay.paymentDate}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedReceipt(pay)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 inline-flex transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>View Official Receipt</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* VIEW 5: PARENT / GUARDIAN VIEW */}
      {currentRole === 'parent' && (
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Guardian Ward Oversight</span>
                <h2 className="text-2xl font-black text-white font-display mt-1">
                  Samuel Adebayo (Ward)
                </h2>
                <p className="text-xs text-slate-400">Modern Web Development Apprenticeship • Enrolled Feb 2026</p>
              </div>
              <button
                onClick={() => onOpenPaymentModal('Samuel Adebayo - Tuition Clearance', 20000)}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
              >
                Pay Outstanding Ward Balance (₦20,000)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Attendance Score</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">94%</span>
                <p className="text-[11px] text-slate-400 mt-1">Excellent consistency. Minimum threshold is 85%.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Fee Payment Clearance</span>
                <span className="text-2xl font-bold font-mono text-white">₦45,000 / ₦65,000</span>
                <p className="text-[11px] text-amber-400 mt-1">₦20,000 remaining balance.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Lead Instructor Remark</span>
                <p className="text-xs text-slate-200 mt-1 italic">
                  "Samuel demonstrates exceptional diligence and teamwork in Lab practicals."
                </p>
                <span className="text-[10px] text-cyan-400 block mt-1">— Engr. Damilola Alabi</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: BUSINESS CUSTOMER VIEW */}
      {currentRole === 'business_customer' && (
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Enterprise Client Portal</span>
                <h2 className="text-2xl font-black text-white font-display mt-1">
                  Okediji Agro-Processing Ltd
                </h2>
                <p className="text-xs text-slate-400">Corporate Printing, Branding & Documentation Account</p>
              </div>
              <button
                onClick={() => setActiveTab('services')}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Place New Service Order</span>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Active Service Orders</h3>
              <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                {serviceOrders.map(order => (
                  <div key={order.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-400">{order.orderNumber}</span>
                        <span className="font-bold text-white text-sm">{order.serviceName}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">Quantity: {order.quantity} • Delivery: {order.deliveryOption}</p>
                      <p className="text-slate-500 text-[11px]">Instructions: {order.instructions}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {order.status}
                      </span>
                      <p className="font-mono font-bold text-white mt-1">₦{order.estimatedAmount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: FINANCE OFFICER VIEW */}
      {currentRole === 'finance' && (
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Financial Audit & Verification Desk</span>
              <h2 className="text-2xl font-black text-white font-display mt-1">
                Bank Transfer Verifications
              </h2>
              <p className="text-xs text-slate-400">Review manual bank transfer sessions and issue verified official receipts</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Receipt / Ref</th>
                    <th className="py-3 px-3">Payer Name</th>
                    <th className="py-3 px-3">Service / Purpose</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Method & Session Ref</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payments.map(pay => (
                    <tr key={pay.id} className="hover:bg-slate-850/60 transition-colors">
                      <td className="py-3 px-3 font-mono text-cyan-400">{pay.receiptNumber}</td>
                      <td className="py-3 px-3 font-bold text-white">{pay.payerName}</td>
                      <td className="py-3 px-3 text-slate-300">{pay.serviceOrProgramme}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-200">₦{pay.amount.toLocaleString()}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{pay.transactionReference}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          pay.status === 'Successful'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {pay.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {pay.status === 'Awaiting Verification' ? (
                          <button
                            onClick={() => verifyPayment(pay.id, currentUser?.displayName || 'Bolanle Ojo (Finance)')}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                          >
                            Verify & Issue Receipt
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedReceipt(pay)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs"
                          >
                            View Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Official Receipt Modal */}
      <ReceiptModal 
        payment={selectedReceipt} 
        onClose={() => setSelectedReceipt(null)} 
      />

    </div>
  );
};
