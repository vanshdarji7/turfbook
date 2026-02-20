import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, Calendar } from "lucide-react";

const timeSlots = [
  "Any Time", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM",
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
  "08:00 PM", "09:00 PM", "10:00 PM"
];

export default function SearchSection({ onSearch, currentCity }) {
  const [city, setCity] = useState(currentCity || "All");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Any Time");

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = () => {
    onSearch({ city, date, time });
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="search"
      data-testid="search-section"
      className="bg-[#00205B] dark:bg-gray-950 py-16 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span
            className="text-[#00C853] text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Find Available Slots
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold text-white mt-2"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Search Turfs in Your City
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-2 flex flex-col md:flex-row gap-2 overflow-hidden"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}
        >
          {/* City Selector */}
          <div className="flex-1 flex items-center gap-3 bg-gray-50 dark:bg-gray-700 px-4 h-14">
            <MapPin size={18} className="text-[#00205B] dark:text-[#60A5FA] shrink-0" />
            <select
              data-testid="city-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-transparent text-[#0F172A] dark:text-white text-base font-medium outline-none cursor-pointer"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <option value="All">All Cities</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex-1 flex items-center gap-3 bg-gray-50 dark:bg-gray-700 px-4 h-14">
            <Calendar size={18} className="text-[#00205B] dark:text-[#60A5FA] shrink-0" />
            <input
              data-testid="date-input"
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent text-[#0F172A] dark:text-white text-base font-medium outline-none cursor-pointer border-none [color-scheme:light] dark:[color-scheme:dark]"
              style={{ fontFamily: "Manrope, sans-serif" }}
              placeholder="Select Date"
            />
          </div>

          {/* Time Slot */}
          <div className="flex-1 flex items-center gap-3 bg-gray-50 dark:bg-gray-700 px-4 h-14">
            <Clock size={18} className="text-[#00205B] dark:text-[#60A5FA] shrink-0" />
            <select
              data-testid="time-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-transparent text-[#0F172A] dark:text-white text-base font-medium outline-none cursor-pointer"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            data-testid="search-button"
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-[#00205B] dark:bg-[#60A5FA] text-white dark:text-white font-bold uppercase tracking-widest text-sm px-8 h-14 hover:bg-[#001840] dark:hover:bg-[#3B82F6] transition-colors"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <Search size={18} />
            <span>Search</span>
          </button>
        </motion.div>

        {/* Quick City Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mt-5 justify-center"
        >
          <span className="text-white/50 text-xs uppercase tracking-widest self-center" style={{ fontFamily: "Manrope, sans-serif" }}>
            Quick Filter:
          </span>
          {["Satellite, Ahmedabad", "Prahlad Nagar, Ahmedabad", "Vesu, Surat", "Adajan, Surat"].map((area) => (
            <button
              key={area}
              onClick={() => {
                const c = area.includes("Ahmedabad") ? "Ahmedabad" : "Surat";
                setCity(c);
                onSearch({ city: c, date, time });
                document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-white/60 hover:text-white text-xs border border-white/20 hover:border-white/50 px-3 py-1.5 transition-all"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {area}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
