import React from 'react';
import { PaymentRecord } from '../types';
import { THINKBRIGHT_INFO } from '../data/mockData';
import { Printer, Download, CheckCircle, X, ShieldCheck } from 'lucide-react';

interface ReceiptModalProps {
  payment: PaymentRecord | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ payment, onClose }) => {
  if (!payment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-sm tracking-wide">ThinkBright Official Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="print-receipt-btn"
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              id="close-receipt-btn"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-8 space-y-6" id="printable-receipt">
          {/* Top Brand Header */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                alt="ThinkBright Infotech" 
                className="w-14 h-14 object-contain rounded-xl bg-slate-950 p-1 border border-cyan-500/30"
              />
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 font-display">
                  {THINKBRIGHT_INFO.name}
                </h2>
                <p className="text-xs text-cyan-700 font-medium">{THINKBRIGHT_INFO.tagline}</p>
                <p className="text-[11px] text-slate-500 max-w-xs mt-0.5">{THINKBRIGHT_INFO.location}</p>
                <p className="text-[11px] text-slate-500">Tel: {THINKBRIGHT_INFO.phones.join(' / ')}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                Official Receipt
              </span>
              <p className="text-xs font-mono font-bold text-slate-900 mt-2">{payment.receiptNumber}</p>
              <p className="text-[11px] text-slate-500">Date: {payment.paymentDate}</p>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <p className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Received From</p>
              <p className="text-slate-900 font-bold text-sm mt-0.5">{payment.payerName}</p>
              <p className="text-slate-600 mt-0.5">{payment.payerEmail}</p>
              {payment.payerPhone && <p className="text-slate-600">{payment.payerPhone}</p>}
            </div>
            <div>
              <p className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Payment Information</p>
              <p className="text-slate-900 font-semibold mt-0.5">Method: {payment.paymentMethod} ({payment.paymentType})</p>
              <p className="text-slate-600 font-mono text-[11px] mt-0.5 truncate">Ref: {payment.transactionReference}</p>
              <div className="flex items-center gap-1 text-emerald-600 font-semibold mt-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Status: {payment.status}</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Description / Purpose</th>
                  <th className="py-3 px-4 text-right">Amount (NGN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-4 font-medium text-slate-800">
                    {payment.serviceOrProgramme}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-semibold text-slate-900">
                    ₦{payment.amount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200 font-semibold text-slate-800">
                <tr>
                  <td className="py-3 px-4 text-right text-xs">Total Paid:</td>
                  <td className="py-3 px-4 text-right font-mono text-base font-bold text-slate-950">
                    ₦{payment.amount.toLocaleString()}
                  </td>
                </tr>
                {payment.outstandingBalance !== undefined && payment.outstandingBalance > 0 && (
                  <tr className="text-amber-700 bg-amber-50/50">
                    <td className="py-2.5 px-4 text-right text-xs">Outstanding Balance:</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold">
                      ₦{payment.outstandingBalance.toLocaleString()}
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>

          {/* Stamp & Authorization */}
          <div className="flex items-end justify-between pt-4 border-t border-slate-200 text-xs">
            <div className="text-[11px] text-slate-500 max-w-[260px]">
              <p>Certified genuine electronic receipt issued by ThinkBright Infotech, Ilora, Oyo State, Nigeria.</p>
              <p className="mt-1 text-slate-400">Official inquiries: {THINKBRIGHT_INFO.email}</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-12 border-b-2 border-slate-400 mx-auto flex items-center justify-center">
                <span className="font-serif italic text-sm text-slate-700 font-bold">O. I. Okunade</span>
              </div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mt-1">Authorized Signature</p>
              <p className="text-[10px] text-slate-400">{payment.verifiedBy || 'Operations Desk'}</p>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            id="modal-close-action"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Close Receipt
          </button>
        </div>

      </div>
    </div>
  );
};
