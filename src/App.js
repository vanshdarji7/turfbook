import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SearchSection from "./components/SearchSection";
import FeaturedTurfs from "./components/FeaturedTurfs";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import { turfs } from "./data/mockData";

const LandingPage = () => {
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [searchFilters, setSearchFilters] = useState({ city: "All", date: "", time: "Any Time" });

  const handleCityFilter = (city) => {
    setSearchFilters((prev) => ({ ...prev, city }));
  };

  const handleSearch = ({ city, date, time }) => {
    setSearchFilters({ city, date, time });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <HeroSection onCityFilter={handleCityFilter} />
      <SearchSection onSearch={handleSearch} currentCity={searchFilters.city} />
      <FeaturedTurfs
        turfs={turfs}
        onBook={setSelectedTurf}
        searchFilters={searchFilters}
      />
      <HowItWorks />
      <Testimonials />
      <Footer />
      {selectedTurf && (
        <BookingModal turf={selectedTurf} onClose={() => setSelectedTurf(null)} />
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
