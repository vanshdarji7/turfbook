import { motion } from "framer-motion";
import { Search, CalendarCheck, Phone } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Your City",
    description:
      "Enter your city — Ahmedabad or Surat — and browse all available cricket turfs in your area. Filter by date and preferred time slot.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Pick a Slot",
    description:
      "Browse available time slots for your chosen turf. Check facilities, pitch type, and pricing to find the perfect match for your game.",
  },
  {
    number: "03",
    icon: Phone,
    title: "Contact & Confirm",
    description:
      "Click 'Book Now' to fill in your details or call the turf directly. Our simple booking process confirms your slot instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span
            className="text-[#00C853] text-xs font-bold tracking-widest uppercase block mb-3"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Simple Process
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#0F172A] dark:text-white"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            How It Works
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#00205B] dark:bg-[#60A5FA] mx-auto" />
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* Connector line (desktop only) - centered through icons */}
          <div className="hidden md:block absolute top-[72px] left-[17%] right-[17%] h-px bg-[#E2E8F0] dark:bg-gray-700 z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-start md:items-center text-center px-4 md:px-8 py-8"
              >
                {/* Number + Icon Circle */}
                <div className="flex items-center gap-4 md:flex-col md:gap-3 mb-6 md:mb-4">
                  <div className="w-20 h-20 bg-[#00205B] dark:bg-[#60A5FA] flex items-center justify-center shrink-0">
                    <Icon size={28} className="text-white dark:text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Step Number */}
                <span
                  className="text-xs font-bold tracking-widest text-[#64748B] uppercase mb-2 md:text-center text-left"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Step {step.number}
                </span>

                {/* Title */}
                <h3
                  className="text-xl md:text-2xl font-medium text-[#0F172A] dark:text-white mb-3 text-left md:text-center"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-[#64748B] dark:text-gray-400 text-base leading-relaxed text-left md:text-center"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-[#00205B] dark:bg-[#60A5FA] p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3
              className="text-2xl md:text-3xl font-bold text-white dark:text-white"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              Ready to Play?
            </h3>
            <p
              className="text-white/70 dark:text-gray-800 text-base"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Find your nearest turf in Ahmedabad or Surat right now.
            </p>
          </div>
          <button
            onClick={() => document.getElementById("search")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="find-turf-cta"
            className="bg-white dark:bg-gray-900 text-[#00205B] dark:text-[#60A5FA] font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Find a Turf Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
