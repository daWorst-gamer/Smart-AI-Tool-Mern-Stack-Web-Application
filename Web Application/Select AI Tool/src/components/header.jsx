import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";

export default function Header({
  modalOpen,
  setModalOpen,
  freeMode,
  setFreeMode,
  menuOpen,
  setMenuOpen,
  formData,
  handleInputChange,
  formErrors,
  setFormData,
}) {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatusMessage("");

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    // 2-second simulated delay
    setTimeout(() => {
      setLoading(false);

      if (data.success) {
        // Show success message first
        setStatusMessage("✅ Thanks for contacting us! We’ll get back to you soon.");
        setStatusColor("text-green-600");

        // Clear form after a short delay so user sees message
        setTimeout(() => setFormData({ name: "", email: "", message: "" }), 500);
      } else {
        setStatusMessage("❌ Failed to send email. Please try again.");
        setStatusColor("text-red-600");
      }
    }, 2000);
  } catch (err) {
    setTimeout(() => {
      setLoading(false);
      setStatusMessage("❌ An error occurred. Please try again.");
      setStatusColor("text-red-600");
    }, 2000);
    console.error(err);
  }
};


  return (
    <header className="w-full bg-[#3375F5] py-4 px-6 rounded-b-lg">
      <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
               {/* Navigation */}
        <nav className="flex justify-between items-center">
          {/* Left: Free Mode */}
          <div className="flex items-center gap-2">
            <img src="/images/img_arrow_right.svg" alt="" className="w-2 h-3.5" />
            <span className="text-lg font-medium text-white font-['Public_Sans']">
              Free mode
            </span>
            <div
              onClick={() => setFreeMode(!freeMode)}
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

          {/* Center: Navigation + Logo */}
          <div className="hidden lg:flex items-center gap-12 justify-center flex-1">
            <div className="flex items-center gap-8">
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

            <Link to="/">
              <img src="/images/img_group_4.svg" alt="Logo" className="w-[54px] h-[54px]" />
            </Link>

            <div className="flex items-center gap-8">
            
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

          {/* Right: Email Button */}
          <div className="hidden lg:block">
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
              onClick={() => setModalOpen(true)}
            />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-3 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`${menuOpen ? "block" : "hidden"} lg:hidden bg-[#3375F5] p-4 mt-4 rounded-lg`}>
          <div className="flex flex-col gap-4">
            <Link to="/"><button className="text-xl font-bold text-white text-left">AI Tools</button></Link>
            <Link to="/ebook"><button className="text-xl font-bold text-white text-left">Ebooks</button></Link>
            <Link to="/terms"><button className="text-xl font-bold text-white text-left">Terms</button></Link>
            <Link to="/policy"><button className="text-xl font-bold text-white text-left">Privacy Policy</button></Link>
            <Button
              text="Email Us"
              text_font_size="18"
              text_color="#000000"
              fill_background_color="#ffff2a"
              border_border="2px solid #000000"
              border_border_radius="12px"
              padding="6px 24px"
              layout_width="100%"
              onClick={() => setModalOpen(true)}
            />
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
            onClick={() => setModalOpen(false)}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                padding: "2rem",
                borderRadius: "20px",
                width: "90%",
                maxWidth: "520px",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-center text-2xl font-extrabold mb-6 text-[#4f46e5]">
                Contact Us
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {["name", "email", "message"].map((field, i) => (
                  <div key={i} className="relative">
                    {field !== "message" ? (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        placeholder={field === "name" ? "Full Name" : "Email Address"}
                        required
                        className="w-full p-4 border-2 border-gray-300 rounded-lg outline-none focus:border-[#4f46e5] focus:shadow-md transition-all"
                      />
                    ) : (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Your Message"
                        required
                        className="w-full p-4 border-2 border-gray-300 rounded-lg outline-none focus:border-[#4f46e5] focus:shadow-md transition-all"
                      />
                    )}
                    {formErrors[field] && <span className="text-red-500 text-sm">{formErrors[field]}</span>}
                  </div>
                ))}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-gradient-to-r from-[#4f46e5] to-[#9333ea] text-white font-bold py-3 rounded-lg shadow-md transition-transform flex justify-center items-center ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                  }`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {/* Status Label */}
                {statusMessage && (
                  <span className={`text-center mt-2 text-lg font-semibold ${statusColor}`}>
                    {statusMessage}
                  </span>
                )}
              </form>

              <span
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-4 text-3xl font-bold cursor-pointer hover:text-blue-900"
              >
                ×
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
