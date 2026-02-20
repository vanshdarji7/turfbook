import { motion } from "framer-motion";
import { MapPin, Star, Phone, Clock, Users } from "lucide-react";

export default function TurfCard({ turf, onBook, index = 0 }) {
  return (
    <motion.div
      data-testid={`turf-card-${turf.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 overflow-hidden hover:-translate-y-1 transition-all duration-300"
      style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-[#00205B]">
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-[#00205B] to-[#001840]"
          style={{ display: "none" }}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2.5 2.5L16 9" />
              </svg>
            </div>
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              {turf.name}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#00205B]/60 to-transparent" />

        {/* City Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="bg-[#00205B] dark:bg-[#60A5FA] text-white dark:text-white text-xs font-bold uppercase tracking-widest px-3 py-1"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {turf.city}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span
            className="bg-white dark:bg-gray-900 text-[#00205B] dark:text-[#60A5FA] text-xs font-bold px-3 py-1"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            ₹{turf.pricePerHour}/hr
          </span>
        </div>

        {/* Available Slots count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
          <span
            className="text-white text-xs font-bold"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {turf.availableSlots.length} slots available
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name + Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-xl font-semibold text-[#0F172A] dark:text-white leading-tight"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {turf.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span
              className="text-sm font-bold text-[#0F172A] dark:text-white"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {turf.rating}
            </span>
            <span className="text-xs text-[#64748B] dark:text-gray-400" style={{ fontFamily: "Manrope, sans-serif" }}>
              ({turf.reviewCount})
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[#64748B] dark:text-gray-400 mb-3">
          <MapPin size={13} />
          <span className="text-sm" style={{ fontFamily: "Manrope, sans-serif" }}>
            {turf.area}, {turf.city}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm text-[#334155] dark:text-gray-400 leading-relaxed mb-4 line-clamp-2"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {turf.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1.5 text-[#64748B] dark:text-gray-400">
            <Users size={13} />
            <span className="text-xs" style={{ fontFamily: "Manrope, sans-serif" }}>{turf.capacity}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#64748B] dark:text-gray-400">
            <Clock size={13} />
            <span className="text-xs" style={{ fontFamily: "Manrope, sans-serif" }}>{turf.pitchType}</span>
          </div>
        </div>

        {/* Available Slots */}
        <div className="mb-4">
          <p
            className="text-xs font-bold uppercase tracking-widest text-[#64748B] mb-2"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Available Slots
          </p>
          <div className="flex flex-wrap gap-1.5">
            {turf.availableSlots.slice(0, 4).map((slot) => (
              <span
                key={slot}
                className="text-xs bg-[#F1F5F9] dark:bg-gray-800 text-[#00205B] dark:text-[#60A5FA] font-medium px-2.5 py-1"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {slot}
              </span>
            ))}
            {turf.availableSlots.length > 4 && (
              <span
                className="text-xs bg-[#F1F5F9] dark:bg-gray-800 text-[#64748B] dark:text-gray-400 px-2.5 py-1"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                +{turf.availableSlots.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* CTA Row */}
        <div className="flex items-center gap-3">
          <button
            data-testid={`book-btn-${turf.id}`}
            onClick={() => onBook(turf)}
            className="flex-1 bg-[#00205B] dark:bg-[#60A5FA] text-white dark:text-white text-sm font-bold uppercase tracking-widest py-3 hover:bg-[#001840] dark:hover:bg-[#3B82F6] transition-colors"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Book Now
          </button>
          <a
            href={`tel:${turf.phone}`}
            data-testid={`call-btn-${turf.id}`}
            className="flex items-center justify-center gap-1.5 border border-[#00205B] dark:border-[#60A5FA] text-[#00205B] dark:text-[#60A5FA] text-sm font-semibold px-4 py-3 hover:bg-[#00205B] dark:hover:bg-[#60A5FA] hover:text-white dark:hover:text-gray-900 transition-all"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <Phone size={14} />
            <span className="hidden sm:inline">Call</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
