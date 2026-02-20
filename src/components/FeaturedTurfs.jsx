import { motion } from "framer-motion";
import TurfCard from "./TurfCard";

export default function FeaturedTurfs({ turfs, onBook, searchFilters }) {
  const filtered = turfs.filter((t) => {
    if (searchFilters?.city && searchFilters.city !== "All") {
      return t.city === searchFilters.city;
    }
    return true;
  });

  const cityFilter = searchFilters?.city || "All";

  return (
    <section
      id="featured"
      data-testid="featured-turfs-section"
      className="py-20 bg-[#F8FAFC] dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            {cityFilter === "All" ? "All Cities" : cityFilter}
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="text-3xl md:text-4xl font-semibold text-[#0F172A] dark:text-white"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              {cityFilter === "All"
                ? "Featured Cricket Turfs"
                : `Best Turfs in ${cityFilter}`}
            </h2>
            <p
              className="text-[#64748B] dark:text-gray-400 text-sm md:text-base max-w-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {filtered.length} turf{filtered.length !== 1 ? "s" : ""} found
              {cityFilter !== "All" ? ` in ${cityFilter}` : " across both cities"}
            </p>
          </div>
          <div className="mt-4 w-16 h-1 bg-[#00205B]" />
        </motion.div>

        {/* Turfs Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((turf, index) => (
              <TurfCard
                key={turf.id}
                turf={turf}
                onBook={onBook}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🏏</div>
            <h3
              className="text-xl font-semibold text-[#334155] mb-2"
              style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
              No turfs found
            </h3>
            <p
              className="text-[#64748B]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Try changing your search filters.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
