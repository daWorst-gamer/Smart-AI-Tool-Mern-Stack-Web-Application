import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loader";
import Button from '../../components/ui/Button';
import Header from "../../components/header"; // import the separated header
import AllToolsSection from "../AllToolsSection"; // import the separated header

const EbookDetailPage = () => {

    const [modalOpen, setModalOpen] = useState(false);
const [freeMode, setFreeMode] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const [formData, setFormData] = useState({});
const [formErrors, setFormErrors] = useState({});
const [success, setSuccess] = useState(false);

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
  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEbook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ebooks/${id}`);
        setEbook(res.data);
      } catch (err) {
        console.error("Error fetching ebook:", err);
        setEbook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEbook();
  }, [id]);
 const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000); // modal disappears after 2 seconds
    });
  };

  if (loading) return <Loading />;

  if (!ebook) return <p className="text-center mt-20 text-xl">Ebook not found.</p>;

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
<main className="flex flex-col container mx-auto p-4 sm:p-6 gap-6">
  {/* Top Section: Image + Title/Buttons */}
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Image on the left */}
    <div className="lg:w-1/3 flex-shrink-0">
      <img
        src="https://static.vecteezy.com/system/resources/previews/023/808/934/non_2x/chat-gpt-4-interface-and-conversation-method-powered-by-openai-s-advanced-artificial-intelligence-ai-powered-conversations-in-laptop-vector.jpg"
        alt="Tool Preview"
        className="w-full h-full object-cover rounded-lg border-2 border-border-primary shadow-[3px_4px_1px_#000000]"
        style={{ minHeight: '300px' }}
      />
    </div>

    {/* Title + Buttons on the right */}
    <div className="flex-1 space-y-4">
      <p className="text-sm text-gray-600">
        <Link to="/ebook" className="text-blue-500 hover:underline font-medium">
          All Ebooks
        </Link>{" "}
        / {ebook.name}
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold">{ebook.name}</h1>

      <div className="flex items-center gap-4 flex-wrap text-gray-700 text-sm">
        <span>. {ebook.author}</span>
        <span>. {ebook.publisher}</span>
        <span>. Released: {ebook.publish_date}</span>
      </div>

      <div className="mt-2">
        <span className="border border-black px-3 py-1 rounded-full text-sm">
          {ebook.category}
        </span>
      </div>

      <div className="flex gap-3 flex-wrap mt-4">
        <button className="bg-[#8ecaff] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150">
          Download PDF
        </button>
        <button 
        onClick={copyLink}
        className="bg-[#ffff7f] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150">
          Copy Link
        </button>

         {/* Modal */}
        {showModal && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg text-sm z-50 animate-fade">
            Link Copied!
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Bottom Section: Overview + Featured Tools + Load More */}
  <div className="space-y-6 mt-6">
    {/* Overview */}
    <div className="bg-white rounded-lg border-2 border-border-primary shadow-[3px_4px_1px_#000000] p-4 sm:p-6 space-y-4">
  <h2 className="text-lg font-bold">Overview</h2>
  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
   {ebook.overview
}
  </p>
  
</div>
<h2
  className="mb-6"
  style={{
    fontFamily: 'Lexend Mega',
    fontWeight: 700,       // Bold
    fontStyle: 'normal',   // Bold handled via fontWeight
    fontSize: '32px',
    lineHeight: '140%',
    marginTop:"5%",
    letterSpacing: '-10%',
    textTransform: 'capitalize',
    color: '#0B0B0B'
  }}
>
  Search Results
</h2>

    {/* Featured Tools - Horizontal Wrap Perfectly Aligned */}
<AllToolsSection />

  <div className="text-center">
   <Link to="/" >
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
    </Link>
  </div>
  </div>
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
    </div>
  );
};

export default EbookDetailPage;
