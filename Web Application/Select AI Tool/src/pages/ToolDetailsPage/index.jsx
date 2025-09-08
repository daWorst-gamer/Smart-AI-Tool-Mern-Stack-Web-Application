import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Button from '../../components/ui/Button';
import { Link } from "react-router-dom";
import Loading from "../../components/loader"; // adjust path as needed

import Header from "../../components/header"; // import the separated header

export default function ToolDetailsPage() {
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
    const { id } = useParams();
    const [tool, setTool] = useState(null);
    const [loading, setLoading] = useState(true);

     const [modalOpen, setModalOpen] = useState(false);
    const [freeMode, setFreeMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

     const [featuredTools, setFeaturedTools] = useState([]);
const [showModal, setShowModal] = useState(false);


const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});
const [formErrors, setFormErrors] = useState({});
const [success, setSuccess] = useState("");

// Handle input change
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

// Handle submit
const handleSubmit = (e) => {
  e.preventDefault();
  // simple validation example
  let errors = {};
  if (!formData.name) errors.name = "Name required";
  if (!formData.email) errors.email = "Email required";
  if (!formData.message) errors.message = "Message required";

  setFormErrors(errors);

  if (Object.keys(errors).length === 0) {
    // Send email logic here
    console.log(formData);
    setSuccess("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  }
};

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000); // hide after 2 seconds
      })
      .catch(() => alert("Failed to copy link."));
  };
useEffect(() => {
  const fetchRelatedTools = async () => {
    try {
      if (!tool) return; // Wait until the current tool is loaded

      // Fetch tools based on the current tool's featured status
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tools/filter`,
        { featured: tool.featured } // true or false depending on current tool
      );

      let tools = res.data || [];

      // Remove the current tool from the list
      tools = tools.filter((t) => t._id !== tool._id);

      // Shuffle array for randomness
      tools = tools.sort(() => 0.5 - Math.random()).slice(0, 4);

      setFeaturedTools(tools);
    } catch (err) {
      console.error(err);
      setFeaturedTools([]);
    }
  };

  fetchRelatedTools();
}, [tool]);



useEffect(() => {
  const fetchTool = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tools/${id}`);
      setTool(res.data);
    } catch (err) {
      console.error(err);
      setTool(null);
    } finally {
      setLoading(false);
    }
  };
  fetchTool();
}, [id]);


if (loading) {
  return <Loading />;
}
if (!tool) {
  return <div className="min-h-screen flex items-center justify-center">Tool not found</div>;
}


  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header */}

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


      {/* Main Content */}
<main className="flex flex-col lg:flex-row flex-1 container mx-auto p-4 sm:p-6 gap-6">
  {/* Left Content */}
  <div className="flex-1 space-y-6">
          {/* Title Section */}
          <div>
            <p className="text-sm text-gray-600">
  <Link
    to="/"
    className="text-blue-500 hover:underline font-medium"
  >
    All Tools
  </Link>{" "}
  / {tool.name}
</p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">
              {tool.name}
            </h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
            {tool.featured && (
  <span className="bg-[#e5ac00] text-white px-2 py-1 rounded-full text-xs font-semibold">
    Featured
  </span>
)}


              <span
  className={`px-2 py-1 rounded-full text-xs font-semibold ${
    tool.pricing.toLowerCase() === "free"
      ? "bg-green-100 text-green-700"
      : "bg-purple-100 text-purple-700"
  }`}
>
  {tool.pricing.toLowerCase() === "free" ? `100% ${tool.pricing}` : tool.pricing}
</span>

              <div className="flex items-center gap-2">
  {/* Stars */}
  <div className="text-yellow-500 text-sm flex">
    {Array.from({ length: 5 }).map((_, index) => {
      const rating = tool.rating || 0;
      if (index < Math.floor(rating)) {
        return <span key={index}>★</span>; // full star
      } else if (index < rating) {
        return <span key={index}>☆</span>; // partial star or empty star
      } else {
        return <span key={index}>☆</span>; // empty star
      }
    })}
  </div>

  {/* Numeric rating */}
  <span className="text-gray-600 text-sm">
    {tool.rating?.toFixed(1)} Ratings
  </span>
</div>

            </div>
            <p className="text-gray-500 text-sm mt-1">July 26, 2025</p>
          </div>

          {/* Action Buttons */}
<div className="flex gap-3 flex-wrap">
  <button
  onClick={() => window.open(tool.link, "_blank")}
  className="bg-[#8ecaff] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150"
>
  Visit Website
</button>

{/* Copy Link Button with Modal */}
<div className="relative inline-block">
  <button
    onClick={handleCopy}
    className="bg-[#ffff7f] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150"
  >
    Copy Link
  </button>

  {/* Modal */}
  {showModal && (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg text-sm z-50 animate-fade">
      Link Copied!
    </div>
  )}
</div>

  {/* Share on Facebook Button */}
<button
  onClick={() => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  }}
  className="bg-[#d6ccff] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150"
>
  Share on Meta
</button>

  {/* Share on X (Twitter) Button */}
<button
  onClick={() => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent("Check out this amazing tool!")}`;
    window.open(twitterShareUrl, "_blank", "width=600,height=400");
  }}
  className="bg-[#b9ffb9] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150"
>
  Share on X
</button>

</div>



          {/* Preview Section */}
          <div className="bg-white rounded-lg border-2 border-border-primary shadow-[3px_4px_1px_#000000] overflow-hidden">
  <img
  src={tool.overviewimg || tool.overviewimg || "https://via.placeholder.com/600x400"}
  alt={tool.name || "Tool Preview"}
  className="w-full h-auto object-cover"
/>

</div>


          {/* Overview */}
          <div className="bg-white rounded-lg border-2 border-border-primary shadow-[3px_4px_1px_#000000] p-4 sm:p-6 space-y-4">
  <h2 className="text-lg font-bold">Overview</h2>
  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
   {tool.new_description
}
  </p>
  
</div>

  </div>

  {/* Right Sidebar */}
  <aside className="w-full lg:w-96 xl:w-[28rem] 2xl:w-[32rem] space-y-6">
    {/* Categories */}
    <div>
      <h3 className="font-semibold mb-2">Category</h3>
      <span className="bg-white border border-black px-3 py-1 rounded-full text-sm">
        {tool.category}
      </span>
    </div>

    <div>
  <h3 className="font-semibold mb-2">Profession</h3>
  <div className="flex flex-wrap gap-2">
    {tool.profession?.map((prof) => (
      <span
        key={prof}
        className="bg-white border border-black px-3 py-1 rounded-full text-sm"
      >
        {prof}
      </span>
    ))}
  </div>
</div>


{/* Featured Tools Section */}
{/* Featured / More Tools Section */}
<div className="flex flex-col gap-6 w-full">
  <h3 className="font-semibold mb-4 text-xl">
    {tool.featured && featuredTools.length > 0 ? "Featured Tools" : "More Tools"}
  </h3>

  {featuredTools.length === 0 ? (
    <p className="text-gray-500 text-sm">No tools to show.</p>
  ) : (
    featuredTools.map((t) => {
      const isFeatured = tool.featured; // current tool's featured status
      return (
        <div
          key={t._id}
          className={`bg-bg-secondary-background rounded-lg px-6 py-6 flex flex-col justify-between w-full border-2 ${
            isFeatured ? "border-border-accent shadow-[3px_4px_1px_#e5ac00]" : "border-black shadow-none"
          }`}
        >
          {/* Tool Header */}
          <div className="flex items-start gap-4 mb-3">
            <img
              src={t.image_url || "/images/img_group_353.svg"}
              alt={t.name}
              className="w-16 h-16 flex-shrink-0 rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-text-primary font-['Public_Sans'] leading-tight">
                  {t.name}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <img src="/images/img_vector_amber_a400.svg" alt="" className="w-2.5 h-2.5" />
                  <span className="text-sm font-medium text-text-muted font-['Public_Sans']">{t.rating}</span>
                </div>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {t.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-black bg-white border border-black rounded-full px-2 py-1 shadow-[1px_2px_1px_#000000]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tool Description */}
          <p className="text-sm text-text-muted font-['Public_Sans'] leading-normal mb-3">
            {t.new_description || t.description}
          </p>

          {/* Tool Footer */}
          <div className="flex items-center justify-between flex-wrap gap-2.5">
            <div className="flex items-center gap-2 text-sm text-text-muted font-['Public_Sans']">
              <span>{t.date}</span>
              <div className="w-1.25 h-1.25 bg-text-mutedMedium rounded-sm"></div>
              <span>{t.pricing?.toLowerCase() === "free" ? `100% ${t.pricing}` : t.pricing}</span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md border-2 border-black shadow-[1px_2px_1px_#000000] text-sm font-medium hover:scale-105 transition-transform duration-150">
              Visit Website
            </button>
          </div>
        </div>
      );
    })
  )}
</div>


  </aside>
</main>


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
        {showScroll && (
  <button
  onClick={scrollToTop}
  style={{
    position: "fixed",
    bottom: "7rem",
    right: "1.7rem",
    // backgroundColor: "#4f46e5",
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
                      <img src="/images/img_group_275.svg" alt="Scroll to top" className="w-[46px] h-[46px] cursor-pointer hover:opacity-120 transition-opacity" />
</button>
)}
    </div>
  );
}
