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

const Privacy = () => {
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

  const [menuOpen, setMenuOpen] = useState(false);
  const [freeMode, setFreeMode] = useState(false); // <-- toggle state

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
<h1 className="text-5xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize [letter-spacing:0.1rem] text-center sm:text-left mb-3 sm:mb-6">
  Privacy & Policy
</h1>


    </div>
  </div>
</section>

<section className="pb-32 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Main Introduction */}
  <p
    className="mt-0 mb-6 text-base sm:text-lg"
    style={{
      fontFamily: 'Public Sans',
      fontWeight: 400,
      lineHeight: '1.6',
      letterSpacing: '0',
    }}
  >
    At Select AI Tool, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services. Please read carefully.
  </p>

  {/* Information We Collect */}
  <h2
    className="mb-4 text-xl sm:text-2xl font-semibold"
    style={{ fontFamily: 'Lexend Mega', textTransform: 'capitalize', color: '#0B0B0B' }}
  >
    Information We Collect
  </h2>
  <p className="mb-6 text-base sm:text-lg" style={{ fontFamily: 'Public Sans', lineHeight: '1.6' }}>
    We may collect personal information such as your name, email address, and usage data when you interact with our website. This information helps us provide, maintain, and improve our services.
  </p>

  {/* How We Use Your Information */}
  <h2
    className="mb-4 text-xl sm:text-2xl font-semibold"
    style={{ fontFamily: 'Lexend Mega', textTransform: 'capitalize', color: '#0B0B0B' }}
  >
    How We Use Your Information
  </h2>
  <p className="mb-6 text-base sm:text-lg" style={{ fontFamily: 'Public Sans', lineHeight: '1.6' }}>
    The information we collect is used to deliver services, respond to inquiries, send updates, improve website functionality, and ensure a safe and personalized experience. We do not sell your data to third parties.
  </p>

  {/* Cookies and Tracking */}
  <h2
    className="mb-4 text-xl sm:text-2xl font-semibold"
    style={{ fontFamily: 'Lexend Mega', textTransform: 'capitalize', color: '#0B0B0B' }}
  >
    Cookies and Tracking
  </h2>
  <p className="mb-6 text-base sm:text-lg" style={{ fontFamily: 'Public Sans', lineHeight: '1.6' }}>
    We use cookies and similar technologies to monitor website traffic, analyze usage patterns, and enhance your experience. You can manage cookie settings through your browser.
  </p>

  {/* Data Security */}
  <h2
    className="mb-4 text-xl sm:text-2xl font-semibold"
    style={{ fontFamily: 'Lexend Mega', textTransform: 'capitalize', color: '#0B0B0B' }}
  >
    Data Security
  </h2>
  <p className="mb-6 text-base sm:text-lg" style={{ fontFamily: 'Public Sans', lineHeight: '1.6' }}>
    We implement appropriate technical and administrative measures to protect your personal information from unauthorized access, use, or disclosure.
  </p>

  {/* Third-Party Services */}
  <h2
    className="mb-4 text-xl sm:text-2xl font-semibold"
    style={{ fontFamily: 'Lexend Mega', textTransform: 'capitalize', color: '#0B0B0B' }}
  >
    Third-Party Services
  </h2>
  <p className="mb-6 text-base sm:text-lg" style={{ fontFamily: 'Public Sans', lineHeight: '1.6' }}>
    Our website may contain links to third-party services. We are not responsible for their privacy practices. We recommend reviewing their privacy policies before sharing any personal information.
  </p>

  {/* Contact Us */}
  <h2
    className="mb-4 text-xl sm:text-2xl font-semibold"
    style={{ fontFamily: 'Lexend Mega', textTransform: 'capitalize', color: '#0B0B0B' }}
  >
    Contact Us
  </h2>
  <p className="mb-6 text-base sm:text-lg" style={{ fontFamily: 'Public Sans', lineHeight: '1.6' }}>
    If you have questions or concerns about this Privacy Policy, please reach out to us at <a href="mailto:support@selectaitool.com" className="text-blue-500 underline">support@selectaitool.com</a>.
  </p>
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

export default Privacy;