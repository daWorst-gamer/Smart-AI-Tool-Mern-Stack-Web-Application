import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SearchView from '../../components/ui/SearchView';
import Button from '../../components/ui/Button';
import ChipView from '../../components/ui/ChipView';
import {FaArrowUp} from "react-icons/fa"
import axios from 'axios'; // add axios
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Loading from "../../components/loader"; // adjust path as needed

import Header from "../../components/header"; // import the separated header

const Ebook = () => {
  
const navigate = useNavigate();
const [ebooks, setEbooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [formErrors, setFormErrors] = useState({});
const [success, setSuccess] = useState(false);
const [loading, setLoading] = useState(false);
// Add state to track View More toggles
const [showAllCategories, setShowAllCategories] = useState(false);
const [showAllProfessions, setShowAllProfessions] = useState(false);
const [originalEbooks, setOriginalEbooks] = useState([]);
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

useEffect(() => {
  const fetchEbooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ebooks`);
      setEbooks(res.data);
      setOriginalEbooks(res.data); // keep backup
    } catch (err) {
      console.error("Error fetching ebooks:", err);
      setEbooks([]);
      setOriginalEbooks([]);
    } finally {
      setLoading(false);
    }
  };
  fetchEbooks();
}, []);
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
const filters = ["Default", "Alphabetical", "Newest"];

const [categoryChips, setCategoryChips] = useState([]);
const [professionChips, setProfessionChips] = useState([]);

// Add this new function
const handleEbookSortChange = (filter) => {
  setActiveFilter(filter);
  setOpen(false);

  let sortedEbooks = [...ebooks];

  switch (filter) {
    case "Alphabetical":
      sortedEbooks.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Newest":
      sortedEbooks.sort(
        (a, b) => new Date(b.publish_date) - new Date(a.publish_date)
      );
      break;
    case "Free Tools":
      sortedEbooks = sortedEbooks.filter((ebook) =>
        ebook.pricing?.toLowerCase().includes("free")
      );
      break;
    case "Default":
      sortedEbooks = [...originalEbooks]; // ✅ FIXED here
      break;
    case "Highest Rated":
    default:
      sortedEbooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  setEbooks(sortedEbooks);
};



useEffect(() => {
  const fetchEbookCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ebook-categories`);
      setCategoryChips(res.data.map((c, i) => ({ id: i, label: c })));
    } catch (err) {
      console.error("Error fetching ebook categories:", err);
    }
  };
  fetchEbookCategories();
}, []);


  // AI Tools data
const [aiTools, setAiTools] = useState([]);

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
    case "Alphabetical":
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
      sortedEbooks = [...originalEbooks];
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
    let res;
    if (newSelected.length === 0) {
      // no category selected → fetch all ebooks
      res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ebooks`);
    } else {
      // filter by categories
      res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ebooks/filter`, {
        categories: newSelected,
      });
    }

    setEbooks(res.data);
    setOriginalEbooks(res.data);
  } catch (err) {
    console.error("Error fetching filtered ebooks:", err);
    setEbooks([]);
  } finally {
    setLoading(false);
  }
};


// Fetch all ebooks
useEffect(() => {
  const fetchEbooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ebooks`);
      setEbooks(res.data);
      setOriginalEbooks(res.data); // ✅ keep the original for reset
    } catch (err) {
      console.error("Error fetching ebooks:", err);
      setEbooks([]);
      setOriginalEbooks([]);
    } finally {
      setLoading(false);
    }
  };
  fetchEbooks();
}, []);

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
                if (isSelected)
                  newSelected = selectedChips.filter((c) => c !== chip.label);
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
      <Header
  modalOpen={modalOpen}
  setModalOpen={setModalOpen}
  freeMode={freeMode}
  setFreeMode={setFreeMode}
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  handleSubmit={handleSubmit}
  formData={formData}
  handleInputChange={handleInputChange}
  formErrors={formErrors}
  success={success}
/>
{/* Filter Buttons */}
<section className="py-10">
  <div className="max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
<h1 className="text-5xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize [letter-spacing:0.1rem]">
  Ebooks
</h1>

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
    Genre
  </h2>
</div>

{/* Clear Filters */}
<button
  onClick={async () => {
    setSelectedCategories([]);
    setSelectedProfession([]);
    setSelectedRatings([]);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ebooks`);
      setEbooks(res.data);
      setOriginalEbooks(res.data);
    } catch (err) {
      console.error("Error resetting ebooks:", err);
      setEbooks([]);
    }
  }}
  className="text-lg font-semibold text-red-500 font-['Public_Sans'] underline mb-6"
>
  Clear Genre
</button>



{/* Category Section */}
<div className="mb-8">
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
    Ebooks
  </h2>
 <span className="text-xl font-semibold text-text-mutedLight font-['Public_Sans']">
    {ebooks.length} Ebooks Found
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
          onClick={() => handleEbookSortChange(filter)}

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

{/* Ebooks Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mb-20">
  {loading ? (
    <div className="col-span-full flex flex-col justify-center items-center py-20">
      <svg
        className="animate-spin h-16 w-16 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="mt-4 text-xl font-semibold text-text-primary">
        Loading ebooks...
      </span>
    </div>
  ) : ebooks.length === 0 ? (
    <div className="col-span-full flex flex-col justify-center items-center py-20">
      <span className="text-2xl font-semibold text-red-600 mb-2">
        No Ebooks Found
      </span>
      <p className="text-gray-500 text-center max-w-xs">
        Sorry, we couldn’t find any ebooks matching your filters. Try adjusting
        your search or filters.
      </p>
    </div>
  ) : (
    ebooks.slice(0, visibleCount).map((ebook) => (
   <div
  key={ebook?._id}
  className="flex bg-white border-border-primary shadow-[3px_4px_1px_#000000] rounded-lg overflow-hidden cursor-pointer 
             transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
  // onClick={() => navigate(`/ebooks/${ebook._id}`)}
>
  {/* Book Cover */}
  {ebook.image && (
    <img
      src={ebook.image}
      alt={ebook.name}
      className="w-[150px] h-[200px] object-cover flex-shrink-0"
    />
  )}

  {/* Book Info */}
  <div className="flex flex-col justify-between p-5 flex-1">
    <div>
      <h3 className="text-lg font-bold text-gray-800 leading-snug">
        {ebook?.name}
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        by {ebook?.author} • {ebook?.publisher}
      </p>

      {/* Category */}
      <div className="flex flex-wrap gap-2 mt-2">
        <Button
          text={ebook?.category}
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
      </div>
    </div>

    {/* Footer */}
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">{ebook?.publish_date}</p>
      <Button
        text="View Book"
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
        onClick={(e) => {
  e.stopPropagation();
  navigate(`/ebooks/${ebook._id}`);
}}

        className="whitespace-nowrap leading-none"
      />
    </div>
  </div>
</div>

    ))
  )}
</div>







                {/* Load More Button */}
                {visibleCount < ebooks.length && (
  <div className="text-center">
    <Button
      text="Load More Ebooks"
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
                 <Link to="/">
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
                   </Link>
   
                   <Link to="/ebook">
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
                   </Link>
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
      bottom: 4.5rem;
      right: 0.9rem;
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

export default Ebook;