import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ServiceItem } from '../types';
import { 
  Printer, 
  Globe, 
  ShieldCheck, 
  Laptop, 
  CheckCircle, 
  ShoppingBag, 
  ArrowRight, 
  Plus, 
  Clock, 
  FileText,
  Truck,
  Sparkles
} from 'lucide-react';

interface ServicesViewProps {
  onOpenPaymentModal: (serviceTitle: string, amount: number) => void;
  setActiveTab: (tab: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenPaymentModal, setActiveTab }) => {
  const { services, submitServiceOrder } = useData();
  const { currentUser, addNotification } = useAuth();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Order modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState(currentUser?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'Pickup at Ilora Hub' | 'Delivery within Oyo/Oyo State' | 'Nationwide Courier / Waybill'>('Pickup at Ilora Hub');
  const [deadline, setDeadline] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<string | null>(null);

  const categories = [
    'All',
    'Printing & Branding',
    'Cyber & Online Services',
    'Documentation & Legal',
    'Sales & Technical Support'
  ];

  const filteredServices = services.filter(s => activeCategory === 'All' || s.category === activeCategory);

  const handleOpenOrder = (service: ServiceItem) => {
    setSelectedService(service);
    setIsOrderModalOpen(true);
    setOrderConfirmation(null);
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setIsSubmittingOrder(true);

    try {
      const estimatedTotal = (selectedService.startingPrice || 1000) * quantity;

      const orderNum = await submitServiceOrder({
        customerId: currentUser?.uid || `guest-cust-${Date.now()}`,
        customerName,
        customerPhone,
        customerEmail,
        serviceId: selectedService.id,
        serviceName: selectedService.title,
        category: selectedService.category,
        quantity,
        instructions,
        deliveryOption,
        deadline,
        estimatedAmount: estimatedTotal
      });

      setOrderConfirmation(orderNum);
      addNotification('Service Order Received', `Order ${orderNum} for ${selectedService.title} has been logged. Our operations desk will confirm execution details.`, 'info');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Printer className="w-3.5 h-3.5 text-cyan-400" />
          Commercial & Enterprise Solutions
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
          High-Grade Digital Services <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            For Individuals, Schools & Businesses
          </span>
        </h1>
        <p className="text-sm text-slate-300">
          Operated directly from our commercial floor in Ilora, Oyo State. Fast turnaround, exceptional finishing, and transparent pricing.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div 
            key={service.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                  {service.category}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {service.priceLabel}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Service Highlights:</p>
                <ul className="space-y-1 text-xs text-slate-300">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px]">
                      <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
              <button
                id={`request-service-${service.id}`}
                onClick={() => handleOpenOrder(service)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/25 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Request Service / Instant Quote</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate & School Contract Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white font-display">Special Institutional & School Packages</h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            We manage bulk student ID cards, examination booklets, customized envelopes, graduation brochures, and computer lab maintenance for schools and corporate entities across Oyo State at negotiated bulk rates.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('contact')}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-cyan-500/30 shrink-0 transition-colors"
        >
          Contact Institutional Desk
        </button>
      </div>

      {/* Service Order Dialog Modal */}
      {isOrderModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{selectedService.category}</span>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">{selectedService.title}</h3>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>

            {orderConfirmation ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Order Registered!</h4>
                <p className="text-xs text-slate-300">
                  Your order reference number is:
                </p>
                <div className="p-3 bg-slate-950 rounded-xl font-mono text-cyan-400 font-bold text-base border border-slate-800">
                  {orderConfirmation}
                </div>
                <p className="text-[11px] text-slate-400">
                  Our operations team has received your order specs. You can track this in your Portal.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsOrderModalOpen(false);
                      onOpenPaymentModal(`Payment for ${selectedService.title} (${orderConfirmation})`, (selectedService.startingPrice || 1000) * quantity);
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                  >
                    Proceed to Make Deposit / Pay
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Alhaji Rasheed Okediji"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="08055566677"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="info@okedijifarms.ng"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Quantity / Copies *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Required Deadline</label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Pickup or Delivery Method *</label>
                  <select
                    value={deliveryOption}
                    onChange={(e) => setDeliveryOption(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Pickup at Ilora Hub">Pickup at Ilora Hub (Behind Musalat Filling Station)</option>
                    <option value="Delivery within Oyo/Oyo State">Delivery within Oyo / Oyo State</option>
                    <option value="Nationwide Courier / Waybill">Nationwide Courier / Waybill</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Specifications & Instructions *</label>
                  <textarea
                    required
                    rows={3}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Provide measurements, text details, preferred colors, paper grammage, or link to files..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                {/* Estimate Box */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Estimated Total:</span>
                  <span className="text-base font-mono font-bold text-cyan-400">
                    ₦{((selectedService.startingPrice || 1000) * quantity).toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  id="confirm-service-order-btn"
                  disabled={isSubmittingOrder}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmittingOrder ? 'Submitting Order...' : 'Submit Service Order'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
