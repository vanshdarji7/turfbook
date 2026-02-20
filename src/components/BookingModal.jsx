import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, MapPin, Clock, Phone } from "lucide-react";

const timeSlots = [
  "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM",
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
  "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
];

export default function BookingModal({ turf, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", slot: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^\+?[\d\s-]{10,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
    if (!form.date) e.date = "Please select a date";
    if (!form.slot) e.slot = "Please select a time slot";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  if (!turf) return null;

  return (
    <AnimatePresence>
      <motion.div
        data-testid="booking-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          data-testid="booking-modal"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white w-full max-w-lg overflow-hidden"
        >
          {!submitted ? (
            <>
              {/* Modal Header */}
              <div className="bg-[#00205B] px-6 py-5 flex items-start justify-between">
                <div>
                  <p
                    className="text-[#00C853] text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Book Your Slot
                  </p>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                  >
                    {turf.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={12} className="text-white/60" />
                    <span className="text-white/60 text-xs" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {turf.area}, {turf.city}
                    </span>
                  </div>
                </div>
                <button
                  data-testid="close-modal-btn"
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors mt-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Turf Info Strip */}
              <div className="bg-[#F1F5F9] px-6 py-3 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#00205B]" />
                  <span className="text-xs font-medium text-[#334155]" style={{ fontFamily: "Manrope, sans-serif" }}>
                    ₹{turf.pricePerHour}/hr
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#00205B]" />
                  <span className="text-xs font-medium text-[#334155]" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {turf.phone}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
                {/* Name */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest text-[#64748B] mb-1.5"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Your Name
                  </label>
                  <input
                    data-testid="booking-name-input"
                    type="text"
                    placeholder="e.g. Rahul Patel"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    className={`w-full h-12 border-2 px-4 text-[#0F172A] text-base outline-none transition-colors ${
                      errors.name ? "border-red-400" : "border-[#E2E8F0] focus:border-[#00205B]"
                    }`}
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-widest text-[#64748B] mb-1.5"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Phone Number
                  </label>
                  <input
                    data-testid="booking-phone-input"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      setErrors({ ...errors, phone: "" });
                    }}
                    className={`w-full h-12 border-2 px-4 text-[#0F172A] text-base outline-none transition-colors ${
                      errors.phone ? "border-red-400" : "border-[#E2E8F0] focus:border-[#00205B]"
                    }`}
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Date & Time Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className="block text-xs font-bold uppercase tracking-widest text-[#64748B] mb-1.5"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Date
                    </label>
                    <input
                      data-testid="booking-date-input"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => {
                        setForm({ ...form, date: e.target.value });
                        setErrors({ ...errors, date: "" });
                      }}
                      className={`w-full h-12 border-2 px-3 text-[#0F172A] text-sm outline-none transition-colors ${
                        errors.date ? "border-red-400" : "border-[#E2E8F0] focus:border-[#00205B]"
                      }`}
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-xs font-bold uppercase tracking-widest text-[#64748B] mb-1.5"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      Time Slot
                    </label>
                    <select
                      data-testid="booking-slot-select"
                      value={form.slot}
                      onChange={(e) => {
                        setForm({ ...form, slot: e.target.value });
                        setErrors({ ...errors, slot: "" });
                      }}
                      className={`w-full h-12 border-2 px-3 text-[#0F172A] text-sm outline-none transition-colors bg-white ${
                        errors.slot ? "border-red-400" : "border-[#E2E8F0] focus:border-[#00205B]"
                      }`}
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      <option value="">Select slot</option>
                      {turf.availableSlots.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.slot && (
                      <p className="text-red-500 text-xs mt-1">{errors.slot}</p>
                    )}
                  </div>
                </div>

                {/* Note */}
                <p
                  className="text-xs text-[#64748B] bg-[#F8FAFC] p-3 border-l-2 border-[#00205B]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  After submitting, the turf team will contact you at your provided number to confirm the booking.
                </p>

                {/* Submit */}
                <button
                  data-testid="confirm-booking-btn"
                  type="submit"
                  className="w-full bg-[#00205B] text-white font-bold uppercase tracking-widest text-sm h-13 py-4 hover:bg-[#001840] transition-colors"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Confirm Booking Request
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <motion.div
              data-testid="booking-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-8 py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-16 h-16 bg-[#00C853]/10 flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle size={32} className="text-[#00C853]" />
              </motion.div>
              <h3
                className="text-2xl font-bold text-[#0F172A] mb-2"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                Booking Request Sent!
              </h3>
              <p
                className="text-[#64748B] text-base mb-1"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                The team at <strong className="text-[#00205B]">{turf.name}</strong> will call you shortly.
              </p>
              <p
                className="text-[#64748B] text-sm mb-8"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Slot: <span className="font-semibold text-[#0F172A]">{form.slot}</span> on{" "}
                <span className="font-semibold text-[#0F172A]">{form.date}</span>
              </p>
              <button
                data-testid="close-success-btn"
                onClick={onClose}
                className="bg-[#00205B] text-white font-bold uppercase tracking-widest text-sm px-8 py-3 hover:bg-[#001840] transition-colors"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Done
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
