import React from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Map, 
  Calendar, 
  Users, 
  MessageSquare,
  Check,
  XCircle,
  Trash2
} from 'lucide-react';

interface BookingDetailModalProps {
  booking: any;
  onClose: () => void;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BookingDetailModal({ booking, onClose, onAccept, onReject, onDelete }: BookingDetailModalProps) {
  if (!booking) return null;

  const isPending = booking.status === 'pending';

  // Match the status colors from the dashboard
  const statusConfig: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
    pending: { label: 'Pending Review', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    confirmed: { label: 'Confirmed', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    cancelled: { label: 'Cancelled', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  };

  const current = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending;

  // Handle both new data format and old data format
  const name = booking.clientName || booking.customerName || 'Unknown Client';
  const email = booking.email || booking.customerEmail || 'No email provided';
  const packageTitle = booking.packageName || booking.tourTitle || 'Custom Tour';
  const travelDate = booking.date || booking.targetDate || 'Not specified';
  const notes = booking.message || booking.notes || '';
  const dateSubmitted = booking.createdAt?.seconds ? new Date(booking.createdAt.seconds * 1000).toLocaleString() : 'Unknown';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${current.bg} ${current.text} ${current.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-2 ${current.dot}`} />
              {current.label}
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-4 leading-tight">{packageTitle}</h2>
            <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Requested for: {travelDate}
            </p>
          </div>
<button
            onClick={onClose}
            aria-label="Close booking details"
            className="p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-emerald-600 transition-colors border border-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Client Info Section */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Client Details</h3>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><User className="w-4 h-4" /></div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Mail className="w-4 h-4" /></div>
                <div>
                  <p className="text-sm font-medium text-slate-600 break-all">{email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Phone className="w-4 h-4" /></div>
                <div>
                  <p className="text-sm font-medium text-slate-600">{booking.phone || 'No phone provided'}</p>
                </div>
              </div>

              {booking.country && (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Globe className="w-4 h-4" /></div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">{booking.country}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Travel Info Section */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Trip Specifications</h3>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Map className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Selected Package</p>
                  <p className="text-sm font-bold text-slate-900">{packageTitle}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Users className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Group Size</p>
                  <p className="text-sm font-bold text-slate-900">{booking.travelers || '2 Travelers'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Calendar className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Submitted On</p>
                  <p className="text-sm font-bold text-slate-900">{dateSubmitted}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {notes && (
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Message / Requests</h3>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <p className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                  {notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          
          <button
            onClick={() => {
              onDelete(booking.id);
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors font-bold text-sm flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>

          <div className="flex items-center gap-3">
            {isPending && (
              <>
                <button
                  onClick={() => {
                    onReject(booking.id);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors font-bold text-sm flex items-center gap-2 shadow-sm"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
                <button
                  onClick={() => {
                    onAccept(booking.id);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors font-bold text-sm flex items-center gap-2 shadow-md shadow-emerald-200"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  Confirm Booking
                </button>
              </>
            )}
            {booking.status === 'confirmed' && (
              <span className="text-sm text-emerald-600 font-bold px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100">Booking Confirmed</span>
            )}
            {booking.status === 'cancelled' && (
              <span className="text-sm text-red-600 font-bold px-4 py-2 bg-red-50 rounded-xl border border-red-100">Booking Cancelled</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

