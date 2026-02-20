import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer data-testid="footer" className="bg-[#020617] dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a 
              href="/"
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity w-fit"
            >
              <div className="w-9 h-9 rounded-sm overflow-hidden flex-shrink-0">
                <img src="/favicon.svg" alt="TurfBook" className="w-full h-full" />
              </div>
              <span
                className="font-bold text-lg tracking-tight"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                TURFBOOK
              </span>
            </a>
            <p
              className="text-white/50 dark:text-gray-400 text-sm leading-relaxed mb-5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Gujarat's premium cricket turf booking platform. Find and book the best turfs in Ahmedabad and Surat.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 border border-white/10 dark:border-gray-700 flex items-center justify-center hover:border-white/40 dark:hover:border-[#60A5FA] hover:bg-white/5 dark:hover:bg-gray-800 transition-all cursor-pointer"
                >
                  <Icon size={15} className="text-white/60 dark:text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-white/40 dark:text-gray-500 mb-5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Cities
            </h4>
            <ul className="space-y-3">
              {[
                { city: "Ahmedabad", areas: ["Satellite", "Prahlad Nagar", "Navrangpura"] },
                { city: "Surat", areas: ["Vesu", "Adajan", "Katargam"] },
              ].map(({ city, areas }) => (
                <li key={city}>
                  <p
                    className="text-sm font-semibold text-white/80 dark:text-gray-300 mb-1"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {city}
                  </p>
                  <p
                    className="text-xs text-white/40 dark:text-gray-500"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {areas.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-white/40 dark:text-gray-500 mb-5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Search Turfs", id: "search" },
                { label: "Featured Turfs", id: "featured" },
                { label: "How It Works", id: "how-it-works" },
                { label: "Testimonials", id: "testimonials" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-white/50 dark:text-gray-400 hover:text-white dark:hover:text-[#60A5FA] transition-colors"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-white/40 dark:text-gray-500 mb-5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#00C853] dark:text-[#60A5FA] mt-0.5 shrink-0" />
                <span className="text-sm text-white/50 dark:text-gray-400" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Ahmedabad & Surat, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#00C853] dark:text-[#60A5FA] shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-white/50 dark:text-gray-400 hover:text-white dark:hover:text-[#60A5FA] transition-colors"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#00C853] dark:text-[#60A5FA] shrink-0" />
                <a
                  href="mailto:hello@turfbook.in"
                  className="text-sm text-white/50 dark:text-gray-400 hover:text-white dark:hover:text-[#60A5FA] transition-colors"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  hello@turfbook.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 dark:border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-white/30 dark:text-gray-500"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            © {new Date().getFullYear()}{" "}
            <a 
              href="/"
              className="hover:text-white/60 transition-colors duration-300"
            >
              TurfBook
            </a>
            . All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <button
                key={item}
                className="text-xs text-white/30 dark:text-gray-500 hover:text-white/60 dark:hover:text-[#60A5FA] transition-colors"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
