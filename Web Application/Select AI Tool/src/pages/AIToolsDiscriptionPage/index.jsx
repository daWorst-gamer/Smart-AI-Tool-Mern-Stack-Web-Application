import React from "react";

export default function ToolDetailsPage() {
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
<main className="flex flex-col lg:flex-row flex-1 container mx-auto p-4 sm:p-6 gap-6">
  {/* Left Content */}
  <div className="flex-1 space-y-6">
          {/* Title Section */}
          <div>
            <p className="text-sm text-gray-600">
              All Tools / PicPicAI - Image Enhancer
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">
              PicPicAI - Image Enhancer
            </h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                Featured
              </span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                100% Free
              </span>
              <div className="flex items-center text-yellow-500 text-sm">
                ★★★★☆
              </div>
              <span className="text-gray-600 text-sm">4.0 Ratings</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">July 26, 2025</p>
          </div>

          {/* Action Buttons */}
<div className="flex gap-3 flex-wrap">
  <button className="bg-[#8ecaff] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150">
    Visit Website
  </button>
  <button className="bg-[#ffff7f] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150">
    Copy Link
  </button>
  <button className="bg-[#d6ccff] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150">
    Share on Meta
  </button>
  <button className="bg-[#b9ffb9] text-black text-sm sm:text-base px-5 py-2 rounded border-2 border-black shadow-[1px_3px_1px_#000000] active:scale-110 active:shadow-lg transition-transform duration-150">
    Share on X
  </button>
</div>



          {/* Preview Section */}
          <div className="bg-white rounded-lg border-2 border-border-primary shadow-[3px_4px_1px_#000000] overflow-hidden">
  <img
    src="https://static.vecteezy.com/system/resources/previews/023/808/934/non_2x/chat-gpt-4-interface-and-conversation-method-powered-by-openai-s-advanced-artificial-intelligence-ai-powered-conversations-in-laptop-vector.jpg"
    alt="Tool Preview"
    className="w-full h-auto object-cover"
  />
</div>


          {/* Overview */}
          <div className="bg-white rounded-lg border-2 border-border-primary shadow-[3px_4px_1px_#000000] p-4 sm:p-6 space-y-4">
  <h2 className="text-lg font-bold">Overview</h2>
  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
    PicPicAI provides an AI-based portrait enhancer tool that empowers
    users to refine individual or group images by accentuating the
    finest details. Through advanced AI technology, it can transform
    portraits, family photos, or group shots into professional-grade
    pictures.
  </p>
  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
    The tool offers natural and seamless enhancement of image details
    and includes additional features such as Background Remover,
    Colorize Photos, and more. All tools are designed to make editing
    effortless and accessible on both desktop and mobile.
  </p>
</div>

  </div>

  {/* Right Sidebar */}
  <aside className="w-full lg:w-96 xl:w-[28rem] 2xl:w-[32rem] space-y-6">
    {/* Categories */}
    <div>
      <h3 className="font-semibold mb-2">Category</h3>
      <span className="bg-white border border-black px-3 py-1 rounded-full text-sm">
        Artificial Intelligence
      </span>
    </div>

    <div>
      <h3 className="font-semibold mb-2">Profession</h3>
      <div className="flex flex-wrap gap-2">
        {[
          "Marketing",
          "Art & Illustration",
          "Engineering",
          "Content Creation",
          "Entrepreneurship",
        ].map((tag) => (
          <span
            key={tag}
            className="bg-white border border-black px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* Featured Tools */}
    <div className="flex flex-col gap-6 w-full">
      <h3 className="font-semibold mb-4 text-xl">Featured Tools</h3>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-bg-secondary-background rounded-lg px-6 py-6 flex flex-col justify-between w-full border-2 border-border-accent shadow-[3px_4px_1px_#e5ac00]"
        >
          {/* Tool Header */}
          <div className="flex items-start gap-4 mb-3">
            <img
              src="/images/img_group_353.svg"
              alt={`Tool ${i}`}
              className="w-16 h-16 flex-shrink-0 rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-text-primary font-['Public_Sans'] leading-tight">
                  PicPicAI - Image Enhancer
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <img src="/images/img_vector_amber_a400.svg" alt="" className="w-2.5 h-2.5" />
                  <span className="text-sm font-medium text-text-muted font-['Public_Sans']">4.5</span>
                </div>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-black bg-white border border-black rounded-full px-2 py-1 shadow-[1px_2px_1px_#000000]">AI</span>
                <span className="text-sm text-black bg-white border border-black rounded-full px-2 py-1 shadow-[1px_2px_1px_#000000]">Image</span>
              </div>
            </div>
          </div>

          {/* Tool Description */}
          <p className="text-sm text-text-muted font-['Public_Sans'] leading-normal mb-3">
            Enhance your images with AI-powered tools quickly and efficiently.
          </p>

          {/* Tool Footer */}
          <div className="flex items-center justify-between flex-wrap gap-2.5">
            <div className="flex items-center gap-2 text-sm text-text-muted font-['Public_Sans']">
              <span>July 26, 2025</span>
              <div className="w-1.25 h-1.25 bg-text-mutedMedium rounded-sm"></div>
              <span>100% Free</span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md border-2 border-black shadow-[1px_2px_1px_#000000] text-sm font-medium hover:scale-105 transition-transform duration-150">
              Visit Website
            </button>
          </div>
        </div>
      ))}
    </div>
  </aside>
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
}
