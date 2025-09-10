import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

import Header from "../../components/header"; 
import Button from '../../components/ui/Button';

const NotFound = () => {

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
  
 

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Select AI Tools - 404 Not Found</title>
        <meta name="description" content="Page not found. Explore the perfect AI tool for you." />
      </Helmet>

      <main className="min-h-screen bg-gray-50">
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
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
     <h1
  className="text-gray-900 mb-4 -mt-40"
  style={{
    fontFamily: 'Lexend Mega',
    fontWeight: 800,
    fontStyle: 'normal',
    fontSize: '200px',
    lineHeight: '140%',
    letterSpacing: '-10%',
    textTransform: 'capitalize',
    color: "#33333399",
  }}
>
  404
</h1>


          <h2
            className="mb-6"
            style={{
              fontFamily: 'Lexend Mega',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '48px',
              lineHeight: '140%',
              letterSpacing: '-8%',
              textTransform: 'capitalize',
              color: '#33333399',
            }}
          >
            SORRY! PAGE NOT FOUND
          </h2>

          <p
            className="mb-8 mx-auto"
            style={{
              fontFamily: 'Public Sans',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '20px',
              lineHeight: '140%',
              letterSpacing: '2%',
              textAlign: 'center',
              textTransform: 'capitalize',
              maxWidth: '900px',
            }}
          >
            Sorry, the page you’re looking for may have been moved, deleted, or never existed in the first place. 
            Let’s get you back to exploring the perfect AI tool for you.
          </p>

         <Link to="/">
  <Button
    text="Go Back Home"
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
    onClick={() => {}}
  />
</Link>

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

export default NotFound;
