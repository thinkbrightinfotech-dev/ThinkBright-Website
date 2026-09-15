import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { PaymentRecord } from '../types';
import { THINKBRIGHT_INFO } from '../data/mockData';
import { CreditCard, Landmark, CheckCircle, UploadCloud, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceOrProgramme?: string;
  defaultAmount?: number;
  onPaymentSuccess?: (receiptNum: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  defaultServiceOrProgramme = 'Apprenticeship Programme Fee',
  defaultAmount = 25000,
  onPaymentSuccess
}) => {
  const { processOnlinePayment, submitManualPayment } = useData();
  const { currentUser, addNotification } = useAuth();

  const [tab, setTab] = useState<'online' | 'manual'>('online');
  const [payerName, setPayerName] = useState(currentUser?.displayName || '');
  const [payerEmail, setPayerEmail] = useState(currentUser?.email || '');
  const [payerPhone, setPayerPhone] = useState(currentUser?.phone || '');
  const [amount, setAmount] = useState(defaultAmount);
  const [serviceOrProgramme, setServiceOrProgramme] = useState(defaultServiceOrProgramme);
  const [transactionRef, setTransactionRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOnlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate Moniepoint processing delay
      await new Promise(r => setTimeout(r, 1200));

      const receipt = await processOnlinePayment({
        userId: currentUser?.uid || 'guest-payer',
        payerName: payerName || 'Valued Learner',
        payerEmail: payerEmail || THINKBRIGHT_INFO.email,
        payerPhone,
        serviceOrProgramme,
        amount: Number(amount),
        paymentType: 'online',
        paymentMethod: 'Moniepoint',
        transactionReference: `MP-${Date.now().toString().slice(-6)}`
      });

      setSuccessReceipt(receipt);
      addNotification('Payment Successful', `Online payment of ₦${Number(amount).toLocaleString()} for ${serviceOrProgramme} was processed successfully. Receipt: ${receipt}`, 'payment');
      if (onPaymentSuccess) onPaymentSuccess(receipt);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionRef.trim()) return;

    setIsProcessing(true);
    try {
      await new Promise(r => setTimeout(r, 600));

      const receipt = await submitManualPayment({
        userId: currentUser?.uid || 'guest-payer',
        payerName: payerName || 'Valued Learner',
        payerEmail: payerEmail || THINKBRIGHT_INFO.email,
        payerPhone,
        serviceOrProgramme,
        amount: Number(amount),
        paymentType: 'manual',
        paymentMethod: 'Bank Transfer',
        transactionReference: transactionRef
      });

      setSuccessReceipt(receipt);
      addNotification('Manual Payment Submitted', `Evidence for ₦${Number(amount).toLocaleString()} submitted. Our finance desk will verify and update your balance.`, 'info');
      if (onPaymentSuccess) onPaymentSuccess(receipt);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white tracking-wide">ThinkBright Payment Gateway</h3>
          </div>
          <button 
            id="close-payment-dialog"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successReceipt ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Payment Recorded</h4>
            <p className="text-sm text-slate-300">
              Your official ThinkBright receipt has been generated with Reference:
            </p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-cyan-400 font-bold text-base">
              {successReceipt}
            </div>
            <p className="text-xs text-slate-400">
              {tab === 'online' 
                ? 'Payment confirmed via Moniepoint. Official receipt email dispatched to ' + (payerEmail || THINKBRIGHT_INFO.email)
                : 'Your manual transfer receipt is awaiting administrator verification. The official balance will reflect as soon as verified.'}
            </p>
            <button
              id="payment-success-close-btn"
              onClick={onClose}
              className="mt-4 w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Done & View Records
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                id="tab-moniepoint"
                onClick={() => setTab('online')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  tab === 'online' 
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Moniepoint Online</span>
              </button>
              <button
                type="button"
                id="tab-manual"
                onClick={() => setTab('manual')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  tab === 'manual' 
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>Bank Transfer (Manual)</span>
              </button>
            </div>

            {tab === 'online' ? (
              <form onSubmit={handleOnlineSubmit} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-200 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p>
                    Secured by Moniepoint. Instant automated verification and official PDF receipt generation for tuition, courses, and digital services.
                  </p>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Purpose / Service</label>
                  <input
                    type="text"
                    required
                    value={serviceOrProgramme}
                    onChange={(e) => setServiceOrProgramme(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Payer Full Name</label>
                    <input
                      type="text"
                      required
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      placeholder="e.g. Samuel Adebayo"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Amount (NGN)</label>
                    <input
                      type="number"
                      required
                      min={500}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="09034836379"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit-online-pay"
                  disabled={isProcessing}
                  className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/30 disabled:opacity-50"
                >
                  {isProcessing ? 'Connecting Moniepoint...' : `Pay ₦${Number(amount).toLocaleString()} via Moniepoint`}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-4 text-xs">
                {/* Official Bank Account Information */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1.5">
                  <p className="font-bold text-white flex items-center gap-1.5 text-xs">
                    <Landmark className="w-3.5 h-3.5 text-cyan-400" />
                    ThinkBright Official Account Details:
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Bank Name</span>
                      <span className="font-semibold text-slate-200">Moniepoint Microfinance Bank</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Account Number</span>
                      <span className="font-mono font-bold text-cyan-400 text-sm">8239014529</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500 block">Account Name</span>
                      <span className="font-semibold text-slate-200">THINKBRIGHT INFOTECH ENTERPRISES</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Payer Full Name</label>
                    <input
                      type="text"
                      required
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Amount Paid (NGN)</label>
                    <input
                      type="number"
                      required
                      min={500}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    Bank Transfer Reference / Session ID <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. TRF/Opay/839201948 or Bank Session ID"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Found on your bank debit alert or transfer receipt slip.</p>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Purpose of Payment</label>
                  <input
                    type="text"
                    required
                    value={serviceOrProgramme}
                    onChange={(e) => setServiceOrProgramme(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="p-3 border border-dashed border-slate-700 rounded-xl text-center">
                  <UploadCloud className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-[11px] text-slate-400 block">Attach / Upload Transfer Screenshot (Optional)</span>
                  <span className="text-[10px] text-slate-500">File verified securely by admin desk</span>
                </div>

                <button
                  type="submit"
                  id="submit-manual-pay"
                  disabled={isProcessing}
                  className="w-full mt-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all border border-cyan-500/30 disabled:opacity-50"
                >
                  {isProcessing ? 'Submitting Transfer Evidence...' : 'Submit Payment for Verification'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
