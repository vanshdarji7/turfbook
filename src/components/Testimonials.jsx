import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/mockData";

// Counter animation hook
function useCountUp(end, duration = 2000, shouldStart = false, isDecimal = false) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

    const endNum = isDecimal ? parseFloat(end) : parseInt(end);
    const startTime = Date.now();
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = progress * (2 - progress);
      countRef.current = easeOutQuad * endNum;
      setCount(isDecimal ? countRef.current.toFixed(1) : Math.floor(countRef.current));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(isDecimal ? endNum.toFixed(1) : endNum);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, shouldStart, isDecimal]);

  return count;
}

export default function Testimonials() {
  const [statsVisible, setStatsVisible] = useState(false);

  const count1 = useCountUp(500, 2000, statsVisible);
  const count2 = useCountUp(4.8, 2000, statsVisible, true);
  const count3 = useCountUp(6, 1500, statsVisible);
  const count4 = useCountUp(2, 1500, statsVisible);
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="py-20 bg-[#F8FAFC] dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span
            className="text-[#00C853] text-xs font-bold tracking-widest uppercase block mb-3"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            What Players Say
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#0F172A] dark:text-white"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Trusted by Teams Across Gujarat
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#00205B] dark:bg-[#60A5FA]" />
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              data-testid={`testimonial-${t.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 border border-gray-100 dark:border-gray-700 hover:border-[#00205B]/20 dark:hover:border-[#60A5FA]/20 transition-colors"
              style={{ boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04)" }}
            >
              {/* Quote Icon */}
              <Quote size={24} className="text-[#00205B]/20 dark:text-[#60A5FA]/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p
                className="text-[#334155] dark:text-gray-400 text-base leading-relaxed mb-6"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                "{t.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="w-10 h-10 bg-[#00205B] dark:bg-[#60A5FA] flex items-center justify-center shrink-0">
                  <span
                    className="text-white dark:text-white text-sm font-bold"
                    style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                  >
                    {t.avatar}
                  </span>
                </div>
                <div>
                  <p
                    className="text-sm font-bold text-[#0F172A] dark:text-white"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs text-[#64748B] dark:text-gray-400"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {t.city} &bull; {t.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setStatsVisible(true)}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-700"
        >
          {[
            { value: "500+", label: "Teams Booked", count: count1, suffix: "+" },
            { value: "4.8", label: "Average Rating", count: count2, suffix: "" },
            { value: "6", label: "Premium Turfs", count: count3, suffix: "" },
            { value: "2", label: "Cities Covered", count: count4, suffix: "" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-900 py-8 px-6 text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-[#00205B] dark:text-[#60A5FA] mb-1"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                {stat.count}{stat.suffix}
              </div>
              <div
                className="text-xs text-[#64748B] dark:text-gray-400 uppercase tracking-widest font-medium"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
