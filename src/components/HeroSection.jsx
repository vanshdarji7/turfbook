import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";

// Counter animation hook
function useCountUp(end, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    const endNum = parseInt(end);
    const startTime = Date.now();
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = progress * (2 - progress); // Easing function
      countRef.current = Math.floor(easeOutQuad * endNum);
      setCount(countRef.current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endNum);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, shouldStart]);

  return count;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function HeroSection({ onCityFilter }) {
  const [activeCity, setActiveCity] = useState("All");
  const [statsVisible, setStatsVisible] = useState(false);

  const count1 = useCountUp(6, 1500, statsVisible);
  const count2 = useCountUp(2, 1500, statsVisible);
  const count3 = useCountUp(500, 2000, statsVisible);

  const handleCity = (city) => {
    setActiveCity(city);
    onCityFilter(city);
    setTimeout(() => {
      document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/hero.jpg')`,
        }}
      />
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00205B]/90 via-[#00205B]/70 to-[#00205B]/30" />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-16">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-8 h-px bg-[#00C853]" />
            <span
              className="text-[#00C853] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Ahmedabad & Surat
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-6xl md:text-8xl font-bold tracking-tight uppercase text-white leading-none mb-6"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Book Your
            <br />
            <span className="text-white/90">Cricket</span>
            <br />
            <span
              className="relative inline-block"
              style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)", color: "transparent" }}
            >
              TURF
            </span>
            <span className="text-white"> NOW</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Find the best cricket turfs in your city. Browse available slots, check facilities, and get in touch instantly.
          </motion.p>

          {/* City Filter Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-3 mb-10"
          >
            <p className="w-full text-white/60 text-xs font-bold uppercase tracking-widest mb-1" style={{ fontFamily: "Manrope, sans-serif" }}>
              Select Your City
            </p>
            {["All", "Ahmedabad", "Surat"].map((city) => (
              <button
                key={city}
                data-testid={`city-filter-${city.toLowerCase()}`}
                onClick={() => handleCity(city)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-200 ${
                  activeCity === city
                    ? "bg-white text-[#00205B]"
                    : "bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {city === "All" ? "All Cities" : city}
              </button>
            ))}
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            onViewportEnter={() => setStatsVisible(true)}
            viewport={{ once: true }}
            className="flex flex-wrap gap-8 pt-6 border-t border-white/20 w-fit"
          >
            {[
              { number: "6+", label: "Premium Turfs", count: count1 },
              { number: "2", label: "Cities", count: count2 },
              { number: "500+", label: "Happy Teams", count: count3 },
            ].map((stat, index) => (
              <div key={stat.label}>
                <div
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                >
                  {index === 0 ? `${stat.count}+` : index === 2 ? `${stat.count}+` : stat.count}
                </div>
                <div className="text-white/60 text-xs uppercase tracking-widest" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => document.getElementById("search")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-white/50 text-xs uppercase tracking-widest" style={{ fontFamily: "Manrope, sans-serif" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-white/50" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
