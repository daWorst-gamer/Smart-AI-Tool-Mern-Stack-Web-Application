import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SearchView from '../../components/ui/SearchView';
import Button from '../../components/ui/Button';
import ChipView from '../../components/ui/ChipView';
import {FaArrowUp} from "react-icons/fa"
import axios from 'axios'; // add axios
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AIToolsDirectory = () => {
  
const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [formErrors, setFormErrors] = useState({});
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
// Add state to track View More toggles
const [showAllCategories, setShowAllCategories] = useState(false);
const [showAllProfessions, setShowAllProfessions] = useState(false);

const [visibleCount, setVisibleCount] = useState(9);
const [selectedPricing, setSelectedPricing] = useState("");
const [featured, setFeatured] = useState(false);

const [searchQuery, setSearchQuery] = useState("");
useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    fetchSearchResults();
  }, 300); // 300ms delay

  return () => clearTimeout(delayDebounceFn); // cleanup
}, [searchQuery]);


// Replace handleFilterClick with:
const handleFilterClick = async (onlyFeatured = false) => {
  setSelectedPricing(""); // reset other pricing filters if needed
  setLoading(true);
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tools/filter`, {
      categories: selectedCategories,
      professions: selectedProfession,
      featured: onlyFeatured ? true : undefined, // only send featured flag when needed
    });
    setAiTools(res.data);
  } catch (err) {
    console.error("Error fetching tools:", err);
    setAiTools([]);
  } finally {
    setLoading(false);
  }
};


// On page load, fetch all tools
useEffect(() => {
  handleFilterClick(false); // fetch all tools initially
}, []);




const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const validateForm = () => {
  const errors = {};
  if (!formData.name.trim()) errors.name = "Full Name is required";
  if (!formData.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
  if (!formData.message.trim()) errors.message = "Message is required";
  return errors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = validateForm();
  if (Object.keys(errors).length === 0) {
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 3000);
  } else {
    setFormErrors(errors);
  }
};
    const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
   const [selectedRatings, setSelectedRatings] = useState([]);

   useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/0cod26pfb62euct6ob89ysu1c5j2u5jf.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up on unmount
    };
  }, []);

  const toggleRating = (rating) => {
    if (selectedRatings.includes(rating)) {
      // remove rating if already selected
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      // add rating
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const ratings = [
    { value: 5, label: "5 Stars" },
    { value: 4, label: "4+ Stars" },
    { value: 3, label: "3+ Stars" },
    { value: 2, label: "2+ Stars" },
    { value: 1, label: "1+ Stars" },
  ];

 const [selectedCategories, setSelectedCategories] = useState([]); // <-- empty to show all
 const [selectedProfession, setSelectedProfession] = useState([]); // <-- empty to show all

  const [menuOpen, setMenuOpen] = useState(false);
  const [freeMode, setFreeMode] = useState(false); // <-- toggle state
   const [activeFilter, setActiveFilter] = useState("Default");
  const [open, setOpen] = useState(false);
const [originalTools, setOriginalTools] = useState([]); // <-- keep original order
const filters = ["Default","Highest Rated", "A to Z", "Newest", "Free Tools"];

const [categoryChips, setCategoryChips] = useState([]);
const [professionChips, setProfessionChips] = useState([]);

useEffect(() => {
  const fetchFilters = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/filters`);
      setCategoryChips(res.data.categories.map((c, i) => ({ id: i, label: c })));
      setProfessionChips(res.data.professions.map((p, i) => ({ id: i, label: p })));
    } catch (err) {
      console.error("Error fetching filters:", err);
    }
  };
  fetchFilters();
}, []);

  // AI Tools data
const [aiTools, setAiTools] = useState([]);

// useEffect(() => {
//   const fetchTools = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tools/filter`, {
//         categories: selectedCategories,
//         professions: selectedProfession,
//         pricing: selectedPricing, // Featured, Free, or Paid
//       });
//       setAiTools(res.data);
//     } catch (err) {
//       console.error("Error fetching AI Tools:", err);
//       setAiTools([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchTools();
// }, [selectedCategories, selectedProfession, selectedPricing]);


// When fetching tools, store original as well
useEffect(() => {
  const fetchFilteredTools = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tools/filter`, {
        categories: selectedCategories,
        professions: selectedProfession,
        pricing: selectedPricing,
      });

      let tools = res.data.map(tool => ({
        ...tool,
        rating: parseFloat((Math.random() * (4.9 - 4.2) + 4.2).toFixed(1)),
      }));

      if (selectedRatings.length > 0) {
        tools = tools.filter(tool =>
          selectedRatings.some(rating => tool.rating >= rating)
        );
      }

      setAiTools(tools);
      setOriginalTools(tools);
    } catch (err) {
      console.error("Error fetching tools by rating:", err);
      setAiTools([]);
      setOriginalTools([]);
    } finally {
      setLoading(false);
    }
  };

  fetchFilteredTools();
}, [selectedCategories, selectedProfession, selectedPricing, selectedRatings]);

// Modify handleSortChange
const handleSortChange = (filter) => {
  setActiveFilter(filter);
  setOpen(false);

  let sortedTools = [...aiTools];

  switch (filter) {
    case "A to Z":
      sortedTools.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Newest":
      sortedTools.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "Free Tools":
      sortedTools = sortedTools.filter(tool =>
        tool.pricing?.toLowerCase().includes("free")
      );
      break;
    case "Default":
      sortedTools = [...originalTools]; // <-- restore original order
      break;
    case "Highest Rated":
    default:
      sortedTools.sort((a, b) => b.rating - a.rating);
  }

  setAiTools(sortedTools);
};




const handleCategoryChipClick = async (chipId, chipData, newSelected) => {
  setSelectedCategories(newSelected);
  setLoading(true);
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tools/filter`, {
      categories: newSelected,
      professions: selectedProfession
    });
    setAiTools(res.data);
  } catch (err) {
    console.error("Error fetching filtered tools:", err);
    setAiTools([]);
  } finally {
    setLoading(false);
  }
};

const handleProfessionChipClick = async (chipId, chipData, newSelected) => {
  setSelectedProfession(newSelected);
  setLoading(true);
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/tools/filter`, {
      categories: selectedCategories,
      professions: newSelected
    });
    setAiTools(res.data);
  } catch (err) {
    console.error("Error fetching filtered tools:", err);
    setAiTools([]);
  } finally {
    setLoading(false);
  }
};


const fetchSearchResults = async () => {
  if (!searchQuery) {
    // Reset to filtered tools if search is empty
    handleFilterClick(); // or fetch all
    return;
  }
  setLoading(true);
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/tools/search?q=${encodeURIComponent(searchQuery)}`
    );
    setAiTools(res.data);
  } catch (err) {
    console.error("Search error:", err);
    setAiTools([]);
  } finally {
    setLoading(false);
  }
};



const ChipView = ({ chips, selectedChips, onChipClick, multiSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => {
        const isSelected = selectedChips.includes(chip.label);
        return (
          <button
            key={chip.id}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              isSelected
                ? "bg-[#A8FBFF] text-black border-black"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => {
              let newSelected;
              if (multiSelect) {
                if (isSelected) newSelected = selectedChips.filter(c => c !== chip.label);
                else newSelected = [...selectedChips, chip.label];
              } else {
                newSelected = [chip.label];
              }
              onChipClick(chip.id, chip, newSelected);
            }}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
};


  return (
    <>
      <Helmet>
        <title>Select AI Tools</title>
        <meta name="description" content="Find the perfect AI tool for any job. Browse 3000+ curated AI-powered tools with advanced search, filtering by category, profession, and ratings. Compare features and pricing." />
        <meta property="og:title" content="AI Tools Directory - Discover 3000+ AI-Powered Tools | Select AI Tool" />
        <meta property="og:description" content="Find the perfect AI tool for any job. Browse 3000+ curated AI-powered tools with advanced search, filtering by category, profession, and ratings. Compare features and pricing." />
      </Helmet>
      <main className="min-h-screen bg-bg-accent-blueLight">
        {/* Header Section */}
   <header
      className="w-full bg-bg-primary-light pt-16 pb-16"
      style={{ backgroundColor: "#3375F5", padding: "40px", borderRadius: "12px" }}
    >
      <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          {/* Left side - Free mode toggle */}
          <div className="flex items-center gap-2">
            <img src="/images/img_arrow_right.svg" alt="" className="w-2 h-3.5" />
            <span className="text-2xl font-medium text-white font-['Public_Sans']">
              Free mode
            </span>
           <div
  onClick={() => {
    setFreeMode(!freeMode);
    setSelectedPricing(!freeMode ? "free" : ""); // set "Free" when toggled on, reset when off
  }}
  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
    freeMode ? "bg-green-500" : "bg-gray-300"
  }`}
>
  <div
    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
      freeMode ? "translate-x-6" : "translate-x-0.5"
    }`}
  ></div>
</div>

          </div>

          {/* Center - Navigation Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-13">
              <div className="flex space-x-8">

              
<Link to="/">
  <button className="text-2xl font-bold text-white font-['Lexend_Mega'] capitalize">
    AI Tools
  </button>
  </Link>
                
<Link to="/ebook">
  <button className="text-2xl font-bold text-white font-['Lexend_Mega'] capitalize">
    Ebooks
  </button>
  </Link>
</div>

            </div>
<Link to="/">
  <img src="/images/img_group_4.svg" alt="Logo" className="w-[54px] h-[54px]" />
</Link>            <div className="flex items-center gap-12">
              
                            
<Link to="/terms">
              <button className="text-2xl font-bold text-white font-['Lexend_Mega'] capitalize">
                Terms
              </button>
              </Link>

                            
<Link to="/policy">
              <button className="text-2xl font-bold text-white font-['Lexend_Mega'] capitalize">
                Privacy Policy
              </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-3 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Right side - Email Us button */}
          <Button
            text="Email Us"
            text_font_size="22"
            text_font_family="Public Sans"
            text_font_weight="500"
            text_line_height="26px"
            text_text_align="center"
            text_color="#000000"
            fill_background_color="#ffff2a"
            border_border="2px solid #000000"
            border_border_radius="12px"
            effect_box_shadow="2px 4px 1px #000000"
            padding="6px 24px"
            layout_width="auto"
            position="relative"
            layout_gap="8px"
            margin="0"
            variant="primary"
            size="medium"
             onClick={() => setModalOpen(true)}
            className="hidden lg:block"
            
          />
        </nav>

        {/* Email Modal */}
{modalOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backdropFilter: "blur(5px)", // glassmorphism
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      animation: "fadeInOverlay 0.5s ease",
    }}
    onClick={() => setModalOpen(false)}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        padding: "2.5rem 2rem",
        borderRadius: "20px",
        width: "90%",
        maxWidth: "520px",
        position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        animation: "modalBounce 0.6s ease",
        transformOrigin: "top center",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2 style={{
        marginBottom: "2rem",
        fontSize: "2rem",
        textAlign: "center",
        fontWeight: "900",
        color: "#4f46e5",
        letterSpacing: "0.5px"
      }}>
        Contact Us
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
    {/* Floating Input Fields with Placeholder */}
{["name","email","message"].map((field, i) => (
  <div key={i} style={{ position: "relative", marginBottom: "1rem" }}>
    {field !== "message" ? (
      <input
        type={field === "email" ? "email" : "text"}
        name={field}
        value={formData[field]}
        onChange={handleInputChange}
        required
        placeholder={field === "name" ? "Full Name" : "Email Address"}
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "12px",
          border: "2px solid #ccc",
          fontSize: "1rem",
          outline: "none",
          transition: "all 0.3s ease",
        }}
      />
    ) : (
      <textarea
        name={field}
        value={formData[field]}
        onChange={handleInputChange}
        required
        placeholder="Your Message"
        rows={5}
        style={{
          width: "100%",
          padding: "1rem",
          borderRadius: "12px",
          border: "2px solid #ccc",
          fontSize: "1rem",
          outline: "none",
          transition: "all 0.3s ease",
        }}
      />
    )}
    {formErrors[field] && (
      <span style={{ color: "red", fontSize: "0.9rem" }}>{formErrors[field]}</span>
    )}
  </div>
))}

{/* Internal CSS for Focus Animation */}
<style>
  {`
    input:focus, textarea:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 8px rgba(79,70,229,0.4);
    }

    input::placeholder, textarea::placeholder {
      color: #999;
      opacity: 1;
      transition: all 0.3s ease;
    }

    input:focus::placeholder, textarea:focus::placeholder {
      color: transparent;
    }
  `}
</style>


        <button
          type="submit"
          style={{
            padding: "1rem",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #4f46e5, #9333ea)",
            color: "#fff",
            fontWeight: "700",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 20px rgba(79,70,229,0.4)",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Send Message
        </button>

        {success && <span style={{ color: "green", textAlign: "center", fontWeight: "600" }}>Message sent successfully!</span>}
      </form>

      {/* Large animated Close Icon */}
      <span
        onClick={() => setModalOpen(false)}
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "1rem",
          cursor: "pointer",
          fontWeight: "900",
          fontSize: "2.5rem",
          color: "#4f46e5",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.2)";
          e.target.style.color = "#1e3a8a";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.color = "#4f46e5";
        }}
      >
        ×
      </span>
    </div>
  </div>
)}

{/* Internal CSS Animations */}
<style>
  {`
    @keyframes fadeInOverlay {
      from {opacity: 0;}
      to {opacity: 1;}
    }

    @keyframes modalBounce {
      0% {transform: translateY(-60px) scale(0.9); opacity: 0;}
      60% {transform: translateY(10px) scale(1.05); opacity: 1;}
      80% {transform: translateY(-5px) scale(0.98);}
      100% {transform: translateY(0) scale(1);}
    }

    input:focus, textarea:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 8px rgba(79,70,229,0.4);
    }

    @media (max-width: 500px) {
      div[style*="maxWidth: 520px"] {
        padding: 1.8rem 1.5rem;
      }
    }
  `}
</style>

        {/* Mobile Navigation Menu */}
        <div className={`${menuOpen ? "block" : "hidden"} lg:hidden bg-bg-primary-light p-4 rounded-lg mb-8`}>
          <div className="flex flex-col gap-4">
            <Link to="/">
            <button className="text-xl font-bold text-white font-['Lexend_Mega'] capitalize text-left">
              AI Tools
            </button>
            </Link>
            
            <Link to="/ebook">
            <button className="text-xl font-bold text-white font-['Lexend_Mega'] capitalize text-left">
              Ebooks
            </button>
            </Link>

            <Link to="/terms">
            <button className="text-xl font-bold text-white font-['Lexend_Mega'] capitalize text-left">
              Terms
            </button>
            </Link>

            <Link to="/policy">
            <button className="text-xl font-bold text-white font-['Lexend_Mega'] capitalize text-left">
              Privacy Policy
            </button>
            </Link>
            <Button
              text="Email Us"
              text_font_size="18"
              text_color="#000000"
              fill_background_color="#ffff2a"
              border_border="2px solid #000000"
              border_border_radius="12px"
              padding="6px 24px"
              layout_width="100%"
              position="relative"
              layout_gap="8px"
              margin="0"
              variant="primary"
              size="medium"
               onClick={() => setModalOpen(true)}
              className="w-full"
            />
          </div>
        </div>

        {/* Hero Content */}
<div className="text-center mb-20 sticky top-0 z-40 px-4 py-4 sm:py-6">
  <h1 className="text-[20px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-extrabold text-white font-['Lexend_Mega'] leading-tight mb-3 sm:mb-7">
    A Curated List For The Best AI Tools
  </h1>
  <div className="max-w-4xl mx-auto">
    <p className="text-base sm:text-lg md:text-xl text-white font-['Public_Sans'] leading-relaxed">
      <span className="font-normal">
        Find the right AI tool for any job fast. Select AI Tool lets you search, filter, and compare{" "}
      </span>
      <span className="font-bold">3000+ AI-powered tools</span>
      <br />
      <span className="font-normal">
        built to help professionals, creators, and businesses do more in less time.
      </span>
    </p>
  </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative -mb-5">
        <div className="max-w-4xl mx-auto px-4">
          <SearchView
  placeholder="Search 30000+ AI Tools..."
  text_font_size="20"
  text_color="#333333b2"
  fill_background_color="#ffffff"
  border_border="3px solid #000000"
  border_border_radius="40px"
  effect_box_shadow="4px 5px 1px #000000"
  padding="22px 92px 22px 92px"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

        </div>
      </div>
    </header>

{/* Filter Buttons */}
<section className="py-10">
  <div className="max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
      <Button
        text="Featured Tools"
        text_font_size="20"
        text_color="#000000"
        fill_background_color="#ffff7f"
        border_border="2px solid #000000"
        border_border_radius="4px"
        effect_box_shadow="1px 3px 1px #000000"
        padding="12px 22px 12px 46px"
        layout_width="auto"
        position="relative"
        layout_gap="8px"
        margin="0"
        variant="primary"
        size="medium"
onClick={() => handleFilterClick(true)} // <-- pass true to filter featured        className="flex items-center gap-2"
      />
      <Button
        text="Free Tools"
        text_font_size="20"
        text_color="#000000"
        fill_background_color="#b9ffb9"
        border_border="2px solid #000000"
        border_border_radius="4px"
        effect_box_shadow="1px 3px 1px #000000"
        padding="12px 24px 12px 50px"
        layout_width="auto"
        position="relative"
        layout_gap="8px"
        margin="0"
        variant="primary"
        size="medium"
        onClick={() => setSelectedPricing("free")}
        className="flex items-center gap-2"
      />
      <Button
        text="Paid Tools"
        text_font_size="20"
        text_color="#000000"
        fill_background_color="#d6ccff"
        border_border="2px solid #000000"
        border_border_radius="4px"
        effect_box_shadow="1px 3px 1px #000000"
        padding="12px 24px 12px 42px"
        layout_width="auto"
        position="relative"
        layout_gap="8px"
        margin="0"
        variant="primary"
        size="medium"
        onClick={() => setSelectedPricing("paid")}
        className="flex items-center gap-2"
      />
    </div>
  </div>
</section>


        {/* Main Content */}
        <section className="pb-32">
          <div className="max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-[22%] lg:mt-1.5">
                <div className="bg-transparent">
            {/* Filters Header */}
<div className="flex items-center mb-7">
  <img src="/images/img_group.svg" alt="" className="w-6 h-6" />
  <h2 className="text-2xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize ml-1.5">
    Filters
  </h2>
</div>

{/* Clear Filters */}
<button
  onClick={() => {
    setSelectedCategories([]);
    setSelectedProfession([]);
    setSelectedRatings([]);
    // optional: force ChipView to re-render
    setCategoryChips((prev) => [...prev]); 
    setProfessionChips((prev) => [...prev]);
  }}
  className="text-lg font-semibold text-red-500 font-['Public_Sans'] underline mb-6"
>
  Clear Filters
</button>


{/* Category Section */}
<div className="mb-8">
  <h3 className="text-xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize mb-5">Category</h3>
  <ChipView
    key={selectedCategories.join(",")}
    chips={showAllCategories ? categoryChips : categoryChips.slice(0, 10)}
    selectedChips={selectedCategories}
    onChipClick={handleCategoryChipClick}
    multiSelect={true}
    className="flex flex-wrap gap-2"
  />
  {categoryChips.length > 10 && (
    <button
      className="text-lg font-semibold text-text-primary font-['Public_Sans'] underline mt-5 ml-auto block"
      onClick={() => setShowAllCategories(!showAllCategories)}
    >
      {showAllCategories ? "View Less" : "View More"}
    </button>
  )}
</div>

{/* Profession Section */}
<div className="mb-8">
  <h3 className="text-xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize mb-5.5">Profession</h3>
  <ChipView
    key={selectedProfession.join(",")}
    chips={showAllProfessions ? professionChips : professionChips.slice(0, 10)}
    selectedChips={selectedProfession}
    onChipClick={handleProfessionChipClick}
    multiSelect={true}
    className="flex flex-wrap gap-2"
  />
  {professionChips.length > 10 && (
    <button
      className="text-lg font-semibold text-text-primary font-['Public_Sans'] underline mt-5 ml-auto block"
      onClick={() => setShowAllProfessions(!showAllProfessions)}
    >
      {showAllProfessions ? "View Less" : "View More"}
    </button>
  )}
</div>


                  {/* Ratings Section */}
                <div>
      <h3 className="text-xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize mb-6">
        Ratings
      </h3>

      <div className="space-y-3.5">
        {ratings.map((rating) => (
          <div
            key={rating.value}
            className="flex items-center cursor-pointer"
            onClick={() => toggleRating(rating.value)}
          >
            {/* Checkbox */}
            <div
              className={`w-5 h-5 border border-border-primary shadow-sm flex items-center justify-center ${
                selectedRatings.includes(rating.value)
                  ? "bg-blue-500"
                  : "bg-bg-secondary-background"
              }`}
            >
              {selectedRatings.includes(rating.value) && (
                <img
                  src="/images/img_lucide_check.svg"
                  alt="checked"
                  className="w-3.5 h-3.5"
                />
              )}
            </div>

            {/* Stars */}
            <div className="flex items-center ml-5 gap-2.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <img
                  key={star}
                  src={
                    star <= rating.value
                      ? "/images/img_vector_yellow_500.svg"
                      : "/images/img_vector_white_a700.svg"
                  }
                  alt=""
                  className="w-6 h-6"
                />
              ))}
              {rating.value < 5 && (
                <span className="text-xl font-semibold text-text-mutedLight font-['Public_Sans'] ml-4">
                  And up
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1">
                {/* Header with title and sort */}
                <div className="mb-9">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-3">
                    <div className="flex items-end gap-7.5">
                   <div className="flex items-center gap-3">
  <h2 className="text-4xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize">
    AI Tools
  </h2>
 <span className="text-xl font-semibold text-text-mutedLight font-['Public_Sans']">
    {aiTools.length} Tools Found
  </span>
</div>
</div>
 <div className="flex items-center gap-10 relative">
  <span className="text-lg font-semibold text-text-primary font-['Public_Sans']">
    Sort By:
  </span>

  {/* Main Filter Button */}
  <button
    onClick={() => setOpen(!open)}
    className="px-6 py-3 bg-white border-2 border-black rounded-2xl shadow-[1px_3px_1px_#000000] text-lg font-semibold flex items-center gap-2"
  >
    {activeFilter}
    <span className="text-gray-500">▼</span>
  </button>

  {/* Dropdown Menu */}
  {open && (
    <div className="absolute top-full mt-2 w-56 max-w-full bg-white border-2 border-black rounded-xl shadow-lg z-50 right-0 sm:left-0 sm:right-auto overflow-auto">
      {filters.map((filter) => (
        <div
          key={filter}
          onClick={() => handleSortChange(filter)}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 font-['Public_Sans'] ${
            activeFilter === filter ? "bg-blue-100 font-bold" : ""
          }`}
        >
          {filter}
        </div>
      ))}
    </div>
  )}
</div>

                  </div>
                </div>

{/* Tools Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
  {loading ? (
    <div className="col-span-full flex flex-col justify-center items-center py-20">
      <svg
        className="animate-spin h-16 w-16 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="mt-4 text-xl font-semibold text-text-primary">Loading tools...</span>
    </div>
  ) : aiTools.length === 0 ? (
    <div className="col-span-full flex flex-col justify-center items-center py-20">
      <span className="text-2xl font-semibold text-red-600 mb-2">No Tools Found</span>
      <p className="text-gray-500 text-center max-w-xs">
        Sorry, we couldn’t find any tools matching your filters. Try adjusting your search or filters.
      </p>
    </div>
  ) : (
    aiTools.slice(0, visibleCount).map((tool) => (
<div
  key={tool?._id}
  className={`bg-white border-2 ${
    tool?.featured
      ? 'border-border-accent shadow-[3px_4px_1px_#e5ac00]'
      : 'border-border-primary shadow-[3px_4px_1px_#000000]'
  } rounded-md px-6 py-8 cursor-pointer`}
  onClick={() => navigate(`/tools/${tool._id}`)} // Use _id from MongoDB
>
  {/* Tool Header */}
  <div className="flex items-start gap-3 mb-3">
    {tool.image_url && (
      <img
        src={tool.image_url}
        alt={tool.name}
        className="w-[70px] h-[70px] flex-shrink-0 rounded-lg"
      />
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="text-lg font-bold text-text-primary font-['Public_Sans'] leading-tight">
          {tool?.name}
        </h3>
        <div className="flex items-center gap-1 flex-shrink-0">
          <img src="/images/img_vector_amber_a400.svg" alt="" className="w-2.5 h-2.5" />
          <span className="text-sm font-medium text-text-muted font-['Public_Sans']">
            {tool?.rating}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tool.profession?.map((prof, i) => (
          <Button
            key={i}
            text={prof}
            text_font_size="14"
            text_color="#000000"
            fill_background_color="#ffffff"
            border_border="1px solid #000000"
            border_border_radius="14px"
            effect_box_shadow="1px 2px 1px #000000"
            padding="4px 14px"
            layout_width="auto"
            position="relative"
            layout_gap="4px"
            margin="0"
            variant="secondary"
            size="small"
            onClick={() => {}}
            className="text-sm"
          />
        ))}
      </div>
    </div>
  </div>

  {/* Tool Description */}
  <p className="text-base font-medium text-text-muted font-['Public_Sans'] leading-normal mb-3">
    {tool.new_description || tool.description}
  </p>

  {/* Tool Footer */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <span className="text-sm font-medium text-text-muted font-['Public_Sans']">
        {tool?.date}
      </span>
      <div className="w-1.25 h-1.25 bg-text-mutedMedium rounded-sm"></div>
      <span className="text-sm font-medium text-text-muted font-['Public_Sans']">
        {tool?.pricing?.toLowerCase().includes("free") ? "100% Free" : tool?.pricing}
      </span>
    </div>

    <Button
      text="Visit Website"
      text_font_size="14"
      text_color="#ffffff"
      fill_background_color="#0099ff"
      border_border="2px solid #000000"
      border_border_radius="6px"
      effect_box_shadow="1px 2px 1px #000000"
      padding="6px 20px"
      layout_width="auto"
      position="relative"
      layout_gap="0"
      margin="0"
      variant="primary"
      size="small"
      onClick={() => {
        window.open(tool?.link || tool?.official_link, "_blank", "noopener,noreferrer");
        fetch(`${import.meta.env.VITE_API_URL}/api/tools/${tool._id}/visit`, {
          method: "POST",
        }).catch((err) => console.error("Error logging visit:", err));
      }}
      className="whitespace-nowrap leading-none"
    />
  </div>
</div>

    ))
  )}
</div>



                {/* Load More Button */}
                {visibleCount < aiTools.length && (
  <div className="text-center">
    <Button
      text="Load More Tools"
      text_font_size="24"
      text_color="#ffffff"
      fill_background_color="#0099ff"
      border_border="2px solid #000000"
      border_border_radius="4px"
      effect_box_shadow="3px 4px 1px #000000"
      padding="12px 30px"
      layout_width="auto"
      position="relative"
      layout_gap="8px"
      margin="0"
      variant="primary"
      size="large"
      onClick={() => setVisibleCount((prev) => prev + 20)}
    />
  </div>
)}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-bg-primary-dark py-6 sm:py-12 lg:py-16" style={{ backgroundColor: "#172936"}}>
          <div className="max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-8">
         {/* Logo and Social Links */}
<div className="flex flex-col items-center lg:items-start gap-7.5 w-full lg:w-auto">
  <img src="/images/img_footer_logo.png" alt="Select AI Tool" className="w-[236px] h-[130px]" />
  
  <div className="flex items-center gap-5 mt-3"> {/* Added mt-3 for top margin */}
    <a href="#" className="transform transition-transform duration-300 hover:scale-125">
      <img src="/images/img_facebook_176.svg" alt="Facebook" className="w-6 h-6" />
    </a>
    
    <a href="#" className="transform transition-transform duration-300 hover:scale-125">
      <img src="/images/img_instagram_167.svg" alt="Instagram" className="w-6 h-6" />
    </a>
    
    <a href="#" className="transform transition-transform duration-300 hover:scale-125">
      <img src="/images/img_tiktok_fill_svgrepo_com.svg" alt="TikTok" className="w-6 h-6" />
    </a>
    
    <a href="#" className="transform transition-transform duration-300 hover:scale-125">
      <img src="/images/img_pinterest_svgrepo_com.svg" alt="Pinterest" className="w-6 h-6" />
    </a>
    
    <a href="#" className="transform transition-transform duration-300 hover:scale-125">
      <img src="/images/img_youtube_168.svg" alt="YouTube" className="w-6 h-6" />
    </a>
  </div>
</div>


              {/* Footer Links */}
              <div className="flex flex-col sm:flex-row justify-between w-full lg:w-auto gap-8 sm:gap-16 lg:gap-24">
                {/* AI Tool Categories */}
                <div className="flex flex-col gap-4.5">
                  <h3 className="text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize">AI Tool Categories</h3>
                  <div className="flex flex-col gap-3">
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">AI Development</a>
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">Content Creation</a>
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">Graphic Designing</a>
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">Internet Of Things</a>
                  </div>
                </div>

                {/* Ebooks */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize">Ebooks</h3>
                  <div className="flex flex-col gap-3">
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">Governing the Machine: Ethics and AI Regulation</a>
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">The Rise of Thinking Code: AI and the Future</a>
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">The Moral Algorithm: Ethics in Artificial Decision-Making</a>
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">Beyond the Hype: Understanding the AI Revolution</a>
                  </div>
                </div>

                {/* Others */}
                <div className="flex flex-col gap-4.5">
                  <h3 className="text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize">Others</h3>
                  <div className="flex flex-col gap-3">
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">Terms & Conditions</a>
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="text-xl font-medium text-text-disabled font-['Public_Sans'] hover:text-text-white transition-colors">Email Us</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <Button
                  text="View All Tools"
                  text_font_size="16"
                  text_color="#ffffff"
                  fill_background_color="#0099ff"
                  border_border="1px solid #b7b7b7"
                  border_border_radius="3px"
                  effect_box_shadow="1px 2px 1px #b8b8b8"
                  padding="8px 20px"
                  layout_width="auto"
                  position="relative"
                  layout_gap="8px"
                  margin="0"
                  variant="primary"
                  size="small"
                  onClick={() => {}}
                />
                <Button
                  text="View All Ebooks"
                  text_font_size="16"
                  text_color="#ffffff"
                  fill_background_color="#0099ff"
                  border_border="1px solid #b7b7b7"
                  border_border_radius="3px"
                  effect_box_shadow="1px 2px 1px #b8b8b8"
                  padding="8px 22px"
                  layout_width="auto"
                  position="relative"
                  layout_gap="8px"
                  margin="0"
                  variant="primary"
                  size="small"
                  onClick={() => {}}
                />
              </div>
              {/* <img src="/images/img_group_275.svg" alt="Scroll to top" className="w-[46px] h-[46px] cursor-pointer hover:opacity-80 transition-opacity" /> */}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-bg-secondary-light my-5"></div>

            {/* Copyright */}
            <div className="text-right">
              <p className="text-base font-normal text-text-disabled font-['Public_Sans']">© 2025 Select AI Tool inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
<style>
{`
  .scroll-to-top {
    position: fixed;
    bottom: 7rem;
    right: 1.5rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;
    z-index: 1000;
  }
  @media (max-width: 640px) {
    .scroll-to-top {
      bottom: 3rem;
      right: 1rem;
    }
  }
`}
</style>

{showScroll && (
  <button
    onClick={scrollToTop}
    className="scroll-to-top"
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <img
      src="/images/img_group_275.svg"
      alt="Scroll to top"
      className="w-[46px] h-[46px] cursor-pointer hover:opacity-120 transition-opacity"
    />
  </button>
)}


      </main>
    </>
  );
};

export default AIToolsDirectory;