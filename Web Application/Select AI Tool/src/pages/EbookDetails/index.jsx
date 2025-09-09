import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loader";

import Button from '../../components/ui/Button';

import Header from "../../components/header"; // import the separated header
import AllToolsSection from "../AllToolsSection"; // import the separated header

const EbookDetailPage = () => {
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
      <header className="bg-blue-400 text-white py-3 px-6 flex justify-between items-center flex-wrap gap-3">
        <nav className="flex gap-4 font-semibold flex-wrap text-sm sm:text-base">
          <a href="#">AI Tools</a>
          <a href="#">Ebooks</a>
          <a href="#">Terms</a>
          <a href="#">Privacy Policy</a>
        </nav>
        <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded text-sm sm:text-base">
          Email Us
        </button>
      </header>

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
      <footer className="bg-gray-900 text-white py-10 px-6 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 container mx-auto">
          {/* Logo */}
          <div>
            <h3 className="text-lg font-bold">Select AI Tool</h3>
            <p className="text-sm mt-2">
              Your trusted connection to AI innovation
            </p>
            <div className="flex gap-3 mt-3">
              <span className="bg-gray-700 px-2 py-1 rounded">F</span>
              <span className="bg-gray-700 px-2 py-1 rounded">T</span>
              <span className="bg-gray-700 px-2 py-1 rounded">I</span>
            </div>
          </div>

          {/* AI Tool Categories */}
          <div>
            <h3 className="font-semibold mb-3">AI Tool Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>AI Development</li>
              <li>Content Creation</li>
              <li>Graphic Designing</li>
              <li>Internet of Things</li>
            </ul>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded text-sm">
              View All Tools
            </button>
          </div>

          {/* Ebooks */}
          <div>
            <h3 className="font-semibold mb-3">Ebooks</h3>
            <ul className="space-y-2 text-sm">
              <li>Governing the Machine</li>
              <li>The Rise of Thinking Code</li>
              <li>The Moral Algorithm</li>
              <li>Beyond the Hype</li>
            </ul>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded text-sm">
              View All Ebooks
            </button>
          </div>

          {/* Others */}
          <div>
            <h3 className="font-semibold mb-3">Others</h3>
            <ul className="space-y-2 text-sm">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Email Us</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm mt-10">
          © 2025 Select AI Tool Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default EbookDetailPage;
