import React, { useState, useEffect } from "react";
import "./Homepage.css";
import logo from "../assets/Final Logo-03.png";
import { FaStar, FaGift, FaDollarSign, FaTimesCircle , FaArrowUp} from "react-icons/fa"


function Homepage() {
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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/0cod26pfb62euct6ob89ysu1c5j2u5jf.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up on unmount
    };
  }, []);

const [modalOpen, setModalOpen] = useState(false);
const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [formErrors, setFormErrors] = useState({});
const [success, setSuccess] = useState(false);

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(""); 
  const rating = (Math.random() * (4.8 - 4) + 4).toFixed(1);

  const buttonStyle = (type, defaultColor, activeColor) => ({
    backgroundColor: active === type ? activeColor : defaultColor,
    border: "2px solid black",
    padding: "0.8rem 1.5rem",
    borderRadius: "0px",
    fontSize: "1.4rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState(null);

  const [showAllCategories, setShowAllCategories] = useState(false);
const [showAllProfessions, setShowAllProfessions] = useState(false);

// Define your arrays (you can replace them with dynamic data)
const categories = [
  "Marketing",
  "Content Creation",
  "Design",
  "Data Science",
  "Engineering",
  "Finance",
  "HR",
  "Operations",
  "Legal",
  "Healthcare",
  "Sales",
  "IT",
];
const professions = [
  "Entrepreneurship",
  "Education",
  "Journalism",
  "Art & Illustration",
  "IOT",
  "Engineering",
  "Marketing",
  "Finance",
  "Healthcare",
  "Law",
  "Consulting",
  "Research",
];

  const optionStyle = (isActive) => ({
    padding: "0.6rem 1.2rem",
    border: "2px solid #ccc",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: isActive ? "#4f46e5" : "#fff",
    color: isActive ? "#fff" : "#333",
    transition: "all 0.2s ease",
  });

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          {/* Nav Group (centered) */}
          <div className="nav-group">
            <div className="nav-left">
              <a href="/ai-tools">AI Tools</a>
              <a href="/ebooks">Ebooks</a>
            </div>

            <div className="nav-center">

            <a href="#"><img src={logo} alt="Logo" className="nav-logo" /></a>  
            </div>

            <div className="nav-right">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>

          {/* Email Button (desktop only) */}
          <a href="#!" className="email-link desktop-only" onClick={() => setModalOpen(true)}>
  Email Us
</a>


          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <a href="/ai-tools">AI Tools</a>
            <a href="/ebooks">Ebooks</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Email Us</a>
          </div>
        )}
      </header>

 {/* Hero */}
      <section
        className="hero"
        style={{
          background: "linear-gradient(to right, #4f46e5, #9333ea)",
          color: "#fff",
          textAlign: "center",
          padding: "5rem 1rem 8rem 1rem",
          position: "relative",
        }}
      >
        <h2 style={{ fontSize: "3rem", fontWeight: "900" }}>
          A Curated List For The Best AI Tools
        </h2>
        <p
          style={{
            maxWidth: "800px",
            margin: "1.5rem auto",
            fontSize: "1.4rem",
            lineHeight: "1.8",
          }}
        >
          Find the right AI tool for any job fast. Select AI Tool lets you
          search, filter, and compare 3000+ AI-powered tools built to help
          professionals, creators, and businesses do more in less time.
        </p>

 {/* Search box overlaps hero */}
<div
  style={{
    position: "absolute",
    left: "50%",
    bottom: "-2.5rem",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "650px",
    background: "#fff",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    padding: "1rem 1.2rem",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "26px", height: "26px", marginRight: "0.8rem" }}
    viewBox="0 0 24 24"
    fill="none"
    stroke="gray"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
  <input
    type="text"
    placeholder="Search 30000+ AI Tools..."
    style={{
      border: "none",
      outline: "none",
      flex: 1,
      fontSize: "1.2rem",
      color: "black", // Text black
    }}
  />
</div>

{/* Responsive adjustments */}
<style>
  {`
    @media (max-width: 768px) {
      div[style*="position: absolute"] {
        padding: 1rem 2rem;  /* add more horizontal padding */
        max-width: 95%;      /* avoid sticking to edges */
      }

      div[style*="position: absolute"] input {
        font-size: 1rem;     /* slightly smaller font on mobile */
      }
    }
  `}
</style>

      </section>

      <div className="main" style={{ marginTop: "4rem" }}>
{/* <div className="main"> */}
<section className="filters container">
  <div className="filter-buttons">
    <button
      className={`filter-btn featured ${
        active === "featured" ? "active" : active ? "disabled" : ""
      }`}
      onClick={() => setActive("featured")}
    >
      <FaStar className="icon" />
      Featured Tools
    </button>

    <button
      className={`filter-btn free ${
        active === "free" ? "active" : active ? "disabled" : ""
      }`}
      onClick={() => setActive("free")}
    >
      <FaGift className="icon" />
      Free Tools
    </button>

    <button
      className={`filter-btn paid ${
        active === "paid" ? "active" : active ? "disabled" : ""
      }`}
      onClick={() => setActive("paid")}
    >
      <FaDollarSign className="icon" />
      Paid Tools
    </button>

    <button
      className="filter-btn clear"
      onClick={() => setActive("")}
    >
      <FaTimesCircle className="icon" />
      Clear All
    </button>
  </div>

  <style>
    {`
      .filter-buttons {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
        margin: 2rem 0;
      }

      .filter-btn {
        border: none;
        border-radius: 12px;
        font-size: 1.6rem;
        font-weight: 600;
        cursor: pointer;
        padding: 1rem 2rem;
        transition: all 0.3s ease-in-out;
        color: black;
        display: flex;
        align-items: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }

      .filter-btn .icon {
        margin-right: 0.5rem;
        font-size: 1.4rem;
      }

      /* Default background colors */
      .filter-btn.featured { background-color: #facc15; }
      .filter-btn.free { background-color: #bbf7d0; }
      .filter-btn.paid { background-color: #c69df3ff; }
      .filter-btn.clear { background-color: #ef4444; color: white; }

      /* Active state */
      .filter-btn.active {
        background-color: #3b82f6;
        color: white;
        box-shadow: 0 6px 12px rgba(0,0,0,0.2);
      }

      /* Disabled state */
      .filter-btn.disabled {
        background-color: #d1d5db; /* Grey */
        color: #6b7280;
      }

      /* Hover effects */
      .filter-btn:not(.clear):hover:not(.disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 10px rgba(0,0,0,0.15);
      }

      .filter-btn.clear:hover { filter: brightness(0.9); }

      @media (max-width: 1024px) {
        .filter-btn {
          font-size: 1.4rem;
          padding: 0.9rem 1.8rem;
        }
        .filter-btn .icon {
          font-size: 1.2rem;
          margin-right: 0.4rem;
        }
      }

      @media (max-width: 640px) {
        .filter-btn {
          font-size: 1.2rem;
          padding: 0.7rem 1.3rem;
        }
        .filter-btn .icon {
          font-size: 1rem;
          margin-right: 0.3rem;
        }
      }
    `}
  </style>
</section>





<div
  className="headingclass"
  style={{
    width: "100%",
    letterSpacing: "0.1rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "40rem", // space between heading and dropdown
    margin: "2rem 0",
    paddingRight: "12rem", // shift a little from the right edge
    flexWrap: "wrap",       // allow wrapping on small screens
  }}
>
  {/* Heading Div */}
  <div className="tools-header" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <h2
      style={{
        fontSize: "2rem",
        fontWeight: "800",
        margin: 0,
        color: "#111",
        whiteSpace: "nowrap", // prevent line break in "AI Tools –"
      }}
    >
      <span>AI Tools – </span>
      <span style={{ fontSize: "1.4rem", color: "#888" }}>3,000 Tools Found</span>
    </h2>
  </div>

  {/* Dropdown Div */}
  <div style={{ minWidth: "160px" }}>
    <select
      style={{
        padding: "0.8rem 1.2rem",
        borderRadius: "8px",
        fontSize: "1.2rem",
        border: "2px solid black",
        width: "100%",
      }}
    >
      <option>Sort By: Default</option>
      <option>Sort By: Rating</option>
      <option>Sort By: Latest</option>
    </select>
  </div>
</div>

{/* Responsive adjustments */}
<style>
  {`
    @media (max-width: 768px) {
      .headingclass {
        justify-content: center !important;
        gap: 1rem !important;
        padding-right: 1rem !important;
        padding-left: 1rem !important;
      }
      .tools-header h2 {
        font-size: 1.6rem;
        text-align: center;
      }
      .tools-header h2 span:last-child {
        font-size: 1.2rem;
      }
      .headingclass select {
        max-width: 200px;
        font-size: 1rem;
      }
    }
  `}
</style>




{/* Responsive adjustments using CSS */}
<style>
  {`
    @media (max-width: 768px) {
      .tools-header h2 {
        font-size: 1.6rem;
        text-align: center;
        width: 100%;
      }
      .tools-header select {
        width: 100%;
      }
    }
  `}
</style>

{/* Sidebar + Tools */}
<section
  className="main-content container"
  style={{
    display: "flex",
    gap: "2rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  }}
>
  {/* Sidebar Wrapper */}
<div style={{ flex: "1", maxWidth: "280px", width: "100%" }}>
      {/* Sidebar Heading outside box */}
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "800",
          marginBottom: "1rem",
          color: "#111",
        }}
      >
        Filters
      </h2>
      

      <aside
        className="sidebar"
        style={{
        //   border: "1px solid #eee",
          borderRadius: "10px",
          padding: "1.5rem",
        //   background: "#fafafa",
        }}
      >
       {/* Category */}
<div className="filter-section" style={{ marginBottom: "2rem" }}>
  <h4 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
    Category
  </h4>
  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
    {(showAllCategories ? categories : categories.slice(0, 10)).map((cat) => (
      <div
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        style={optionStyle(selectedCategory === cat)}
      >
        {cat}
      </div>
    ))}

    {categories.length > 10 && (
      <div
        onClick={() => setShowAllCategories(!showAllCategories)}
        style={{
          cursor: "pointer",
          textDecoration: "underline",
          color: "#4f46e5",
          padding: "0.6rem 1.2rem",
          borderRadius: "12px",
          backgroundColor: "transparent",
          fontWeight: "600",
        }}
      >
        {showAllCategories ? "Show Less" : "Show All"}
      </div>
    )}
  </div>
</div>

{/* Profession */}
<div className="filter-section" style={{ marginBottom: "2rem" }}>
  <h4 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
    Profession
  </h4>
  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
    {(showAllProfessions ? professions : professions.slice(0, 10)).map(
      (prof) => (
        <div
          key={prof}
          onClick={() => setSelectedProfession(prof)}
          style={optionStyle(selectedProfession === prof)}
        >
          {prof}
        </div>
      )
    )}

    {professions.length > 10 && (
      <div
        onClick={() => setShowAllProfessions(!showAllProfessions)}
        style={{
          cursor: "pointer",
          textDecoration: "underline",
          color: "#4f46e5",
          padding: "0.6rem 1.2rem",
          borderRadius: "12px",
          backgroundColor: "transparent",
          fontWeight: "600",
        }}
      >
        {showAllProfessions ? "Show Less" : "Show All"}
      </div>
    )}
  </div>
</div>


        {/* Ratings (checkboxes remain) */}
        <div className="filter-section">
          <h4
            style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}
          >
            Ratings
          </h4>
          <label style={{ display: "block", marginBottom: "0.6rem" }}>
            <input type="checkbox" /> ★★★★★ (5)
          </label>
          <label style={{ display: "block", marginBottom: "0.6rem" }}>
            <input type="checkbox" /> ★★★★☆ (4+)
          </label>
          <label style={{ display: "block", marginBottom: "0.6rem" }}>
            <input type="checkbox" /> ★★★☆☆ (3+)
          </label>
          <label style={{ display: "block", marginBottom: "0.6rem" }}>
            <input type="checkbox" /> ★★☆☆☆ (2+)
          </label>
        </div>
      </aside>

      {/* Responsive tweak */}
      <style>
        {`
          @media (max-width: 768px) {
            .sidebar {
              max-width: 100% !important;
            }
          }
        `}
      </style>
    </div>


    
{/* Tools Grid */}
<div
  className="tools"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  }}
>
  {Array.from({ length: 12 }).map((_, i) => {
    const colors = ["gold", "blue"];
    const prevColor = i > 0 ? colors[i - 1] : null;
    let borderColor;
    do {
      borderColor = colors[Math.floor(Math.random() * colors.length)];
    } while (borderColor === prevColor);

    const categories = ["Image Upscaling", "Designers", "Marketing"];
    const rating = (Math.random() * (4.8 - 4) + 4).toFixed(1); // Random 4 - 4.8

    const images = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/800px-Adobe_Photoshop_CC_icon.svg.png",
      
    ];
    const imageUrl = images[i]; // unique image for each card

    const renderStars = (rating) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const halfStar = rating - fullStars >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

      for (let j = 0; j < fullStars; j++) {
        stars.push(
          <span key={`full-${j}`} style={{ color: "#FFD700", fontSize: "1.2rem" }}>
            ★
          </span>
        );
      }
      if (halfStar) {
        stars.push(
          <span key="half" style={{ color: "#FFD700", fontSize: "1.2rem" }}>
            ☆
          </span>
        );
      }
      for (let k = 0; k < emptyStars; k++) {
        stars.push(
          <span key={`empty-${k}`} style={{ color: "#ccc", fontSize: "1.2rem" }}>
            ★
          </span>
        );
      }
      return stars;
    };

    return (
      <div
        key={i}
        className="tool-card"
        style={{
          border: `2px solid ${borderColor}`,
          borderRadius: "16px",
          padding: "2rem",
          background: "white",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        {/* Rating floated to right */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontWeight: "600",
          }}
        >
          {renderStars(rating)}
          <span style={{ color: "#333", fontSize: "1rem" }}>{rating}</span>
        </div>

        {/* Top-left image with margin-bottom */}
        <img
          src={imageUrl}
          alt="tool"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />

        <h3 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "0.5rem" }}>
          PicPicAI - Image Enhancer
        </h3>

        {/* Categories */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          {categories.map((cat) => (
            <span
              key={cat}
              style={{
                fontSize: "1rem",
                color: "#666",
                padding: "0.2rem 0.6rem",
                border: "1px solid #000",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }} className="desc">
          PicPicAI enhances portraits with AI, turning any image into a professional-quality photo.
        </p>

        {/* Visit Website and Meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "0.5rem",
          }}
        >
          <a
            href="/visit"
            style={{
              backgroundColor: "#3300FF",
              color: "#fff",
              padding: "0.3rem 0.8rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.2s ease",
              display: "inline-block",
              minWidth: "fit-content",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1a00cc")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#3300FF")}
          >
            Visit Website
          </a>

          <p style={{ fontSize: "1rem", color: "#999", margin: 0 }}>July 26, 2025 · 100% Free</p>
        </div>
      </div>
    );
  })}
</div>




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





</section>



      <div className="load-more">
        <button>Load More Tools</button>
      </div>
</div>
      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-left">
            <img src={logo} alt="Select AI Tool Logo" className="footer-logo" />
            <p>
              Helping you find the best AI tools for work, creativity, and
              business.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>AI Tool Categories</h4>
              <ul>
                <li>Marketing</li>
                <li>Content Creation</li>
                <li>Design</li>
                <li>Data Science</li>
                <li>Engineering</li>
              </ul>
            </div>
            <div>
              <h4>Professions</h4>
              <ul>
                <li>Entrepreneurship</li>
                <li>Education</li>
                <li>Journalism</li>
                <li>Art & Illustration</li>
                <li>IOT</li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>Email Us</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="copyright">
          © 2025 Select AI Tool Inc. All rights reserved.
        </p>
      </footer>

      {showScroll && (
<button
  onClick={scrollToTop}
  style={{
    position: "fixed",
    bottom: "12rem",
    right: "2.5rem",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    width: "50px",        // fixed width
    height: "50px",       // fixed height
    borderRadius: "50%",  // makes it a perfect circle
    cursor: "pointer",
    fontSize: "1.5rem",
    display: "flex",      // center the icon
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease",
    zIndex: 1000,
  }}
  onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
>
  <FaArrowUp />
</button>

)}

    </div>
    
  );
}

export default Homepage;
