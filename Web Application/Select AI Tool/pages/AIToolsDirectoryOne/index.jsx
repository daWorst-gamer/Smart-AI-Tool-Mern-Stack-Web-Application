import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchView from '../../src/components/ui/SearchView';
import Button from '../../src/components/ui/Button';
import ChipView from '../../src/components/ui/ChipView';

const AIToolsDirectoryOne = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('Default');
  const [menuOpen, setMenuOpen] = useState(false);

  // Category chips data
  const categoryChips = [
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'ai-development', label: 'AI Development' },
    { id: 'astrology', label: 'Astrology' },
    { id: 'advertising', label: 'Advertising' },
    { id: 'audio', label: 'Audio' },
    { id: 'augmented-reality', label: 'Augmented Reality' },
    { id: 'automation', label: 'Automation' },
    { id: 'billing-invoicing', label: 'Billing & Invoicing' },
    { id: 'betting', label: 'Betting' },
    { id: 'iot', label: 'IOT' },
    { id: 'audio-music', label: 'Audio & Music' },
    { id: 'advertising-2', label: 'Advertising' }
  ];

  const professionChips = [
    { id: 'marketing', label: 'Marketing' },
    { id: 'art-illustration', label: 'Art & Illustration' },
    { id: 'content-creation', label: 'Content Creation' },
    { id: 'design', label: 'Design' },
    { id: 'art', label: 'Art' },
    { id: 'education', label: 'Education' },
    { id: 'marketing-2', label: 'Marketing' },
    { id: 'education-2', label: 'Education' },
    { id: 'entrepreneurship', label: 'Entrepreneurship' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'iot-2', label: 'IOT' },
    { id: 'journalism', label: 'Journalism' },
    { id: 'engineering', label: 'Engineering' }
  ];

  // AI Tools data
  const aiTools = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    name: 'PicPicAI - Image Enhancer',
    rating: '4.7',
    category: 'Image Upscaling',
    profession: 'Designers',
    description: 'PicPicAI enhances portraits with AI, turning any image into a professional-quality photo.',
    date: 'July 26, 2025',
    pricing: '100% Free',
    featured: index === 0 || index === 5 || index === 8 || index === 14 || index === 17 || index === 20
  }));

  const handleCategoryChipClick = (chipId) => {
    setSelectedCategory(chipId === selectedCategory ? '' : chipId);
  };

  const handleProfessionChipClick = (chipId) => {
    setSelectedProfession(chipId === selectedProfession ? '' : chipId);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? '' : rating);
  };

  return (
    <>
      <Helmet>
        <title>Select AI Tools</title>
        <meta name="description" content="Find the perfect AI tool from our curated directory of 3000+ AI-powered solutions. Filter by category, profession, and ratings to discover tools for image enhancement, content creation, design, and more." />
        <meta property="og:title" content="AI Tools Directory - Discover 3000+ AI-Powered Tools | Select AI Tool" />
        <meta property="og:description" content="Find the perfect AI tool from our curated directory of 3000+ AI-powered solutions. Filter by category, profession, and ratings to discover tools for image enhancement, content creation, design, and more." />
      </Helmet>
      <main className="w-full bg-bg-accent-blueLight">
        {/* Header Section */}
        <section className="w-full bg-bg-primary-light">
          <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
            <header className="flex justify-between items-center py-4 sm:py-6">
              {/* Left Section - Free Mode Toggle */}
              <div className="flex items-center gap-2 sm:gap-3">
                <img src="/images/img_arrow_right.svg" alt="" className="w-2 h-3.5" />
                <span className="text-lg sm:text-xl md:text-2xl font-medium text-text-white font-['Public_Sans']">
                  Free mode
                </span>
                <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                </div>
              </div>

              {/* Center Section - Navigation */}
              <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                <button className="text-lg sm:text-xl md:text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize hover:opacity-80 transition-opacity">
                  AI Tools
                </button>
                <button className="text-lg sm:text-xl md:text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize hover:opacity-80 transition-opacity">
                  Ebooks
                </button>
                <img src="/images/img_group_4.svg" alt="Logo" className="w-12 h-12 sm:w-14 sm:h-14" />
                <button className="text-lg sm:text-xl md:text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize hover:opacity-80 transition-opacity">
                  Terms
                </button>
                <button className="text-lg sm:text-xl md:text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize hover:opacity-80 transition-opacity">
                  Privacy Policy
                </button>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-text-white"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Right Section - Email Button */}
              <Button
                text="Email Us"
                text_font_size="18"
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
                layout_gap="0"
                margin="0"
                variant="primary"
                size="medium"
                onClick={() => {}}
                className="hidden md:block"
              />
            </header>

            {/* Mobile Menu */}
            {menuOpen && (
              <nav className="md:hidden bg-bg-primary-light border-t border-border-primary py-4">
                <div className="flex flex-col gap-4">
                  <button className="text-lg font-bold text-text-white font-['Lexend_Mega'] capitalize text-left">
                    AI Tools
                  </button>
                  <button className="text-lg font-bold text-text-white font-['Lexend_Mega'] capitalize text-left">
                    Ebooks
                  </button>
                  <button className="text-lg font-bold text-text-white font-['Lexend_Mega'] capitalize text-left">
                    Terms
                  </button>
                  <button className="text-lg font-bold text-text-white font-['Lexend_Mega'] capitalize text-left">
                    Privacy Policy
                  </button>
                </div>
              </nav>
            )}
          </div>
        </section>

        {/* Hero Section */}
        <section className="w-full bg-bg-primary-light pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24">
          <div className="w-full max-w-[1134px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-white font-['Lexend_Mega'] mb-6 sm:mb-8 leading-tight">
              A Curated List For The Best AI Tools
            </h1>
            <div className="text-base sm:text-lg md:text-xl text-text-white font-['Public_Sans'] leading-relaxed max-w-4xl mx-auto">
              <span className="font-normal">Find the right AI tool for any job fast. Select AI Tool lets you search, filter, and compare </span>
              <span className="font-bold">3000+ AI-powered tools</span>
              <br />
              <span className="font-normal">built to help professionals, creators, and businesses do more in less time.</span>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="w-full relative -mt-10 mb-10">
          <div className="w-full max-w-[1052px] mx-auto px-4 sm:px-6 lg:px-8">
            <SearchView
              placeholder="Search 30000+ AI Tools..."
              text_font_size="20"
              text_font_family="Public Sans"
              text_font_weight="500"
              text_line_height="29px"
              text_text_align="center"
              text_color="#333333b2"
              fill_background_color="#ffffff"
              border_border="3px solid #000000"
              border_border_radius="40px"
              effect_box_shadow="4px 5px 1px #000000"
              padding="22px 92px 22px 12px"
              layout_width="auto"
              position="relative"
              layout_gap="0"
              margin="0"
              variant="primary"
              size="medium"
            />
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="w-full mb-8 sm:mb-12">
          <div className="w-full max-w-[576px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                text="Featured Tools"
                text_font_size="20"
                text_font_family="Public Sans"
                text_font_weight="500"
                text_line_height="24px"
                text_text_align="left"
                text_color="#000000"
                fill_background_color="#ffff7f"
                border_border="2px solid #000000"
                border_border_radius="4px"
                effect_box_shadow="1px 3px 1px #000000"
                padding="12px 22px 12px 46px"
                layout_width="auto"
                position="relative"
                layout_gap="0"
                margin="0"
                variant="primary"
                size="medium"
                onClick={() => {}}
                className="w-full sm:w-auto relative"
              >
                <img src="/images/img_vector.svg" alt="" className="absolute left-6 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                Featured Tools
              </Button>
              <Button
                text="Free Tools"
                text_font_size="20"
                text_font_family="Public Sans"
                text_font_weight="500"
                text_line_height="24px"
                text_text_align="left"
                text_color="#000000"
                fill_background_color="#b9ffb9"
                border_border="2px solid #000000"
                border_border_radius="4px"
                effect_box_shadow="1px 3px 1px #000000"
                padding="12px 24px 12px 50px"
                layout_width="auto"
                position="relative"
                layout_gap="0"
                margin="0"
                variant="primary"
                size="medium"
                onClick={() => {}}
                className="w-full sm:w-auto relative"
              >
                <img src="/images/img_vector_black_900.svg" alt="" className="absolute left-6 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                Free Tools
              </Button>
              <Button
                text="Paid Tools"
                text_font_size="20"
                text_font_family="Public Sans"
                text_font_weight="500"
                text_line_height="24px"
                text_text_align="left"
                text_color="#000000"
                fill_background_color="#d6ccff"
                border_border="2px solid #000000"
                border_border_radius="4px"
                effect_box_shadow="1px 3px 1px #000000"
                padding="12px 24px 12px 42px"
                layout_width="auto"
                position="relative"
                layout_gap="0"
                margin="0"
                variant="primary"
                size="medium"
                onClick={() => {}}
                className="w-full sm:w-auto relative"
              >
                <img src="/images/img_vector_black_900_16x10.svg" alt="" className="absolute left-6 top-1/2 transform -translate-y-1/2 w-2.5 h-4" />
                Paid Tools
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full">
          <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              
              {/* Sidebar Filters */}
              <aside className="w-full lg:w-[22%] lg:mt-2">
                <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  {/* Filters Header */}
                  <div className="flex items-center mb-6 sm:mb-8">
                    <img src="/images/img_group.svg" alt="" className="w-6 h-6 mr-2" />
                    <h2 className="text-xl sm:text-2xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize">
                      Filters
                    </h2>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize mb-4 sm:mb-5">
                      Category
                    </h3>
                    <ChipView
                      chips={categoryChips}
                      selectedChips={selectedCategory ? [selectedCategory] : []}
                      onChipClick={handleCategoryChipClick}
                      multiSelect={false}
                      layout_width="100%"
                      margin="0"
                      position="relative"
                      variant="primary"
                      size="medium"
                      className="gap-2 sm:gap-3"
                    />
                    <button className="text-base sm:text-lg font-semibold text-text-primary underline mt-4 sm:mt-5 hover:opacity-80 transition-opacity">
                      View More
                    </button>
                  </div>

                  {/* Profession Filter */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize mb-4 sm:mb-5">
                      Profession
                    </h3>
                    <ChipView
                      chips={professionChips}
                      selectedChips={selectedProfession ? [selectedProfession] : []}
                      onChipClick={handleProfessionChipClick}
                      multiSelect={false}
                      layout_width="100%"
                      margin="0"
                      position="relative"
                      variant="primary"
                      size="medium"
                      className="gap-2 sm:gap-3"
                    />
                    <button className="text-base sm:text-lg font-semibold text-text-primary underline mt-4 sm:mt-5 hover:opacity-80 transition-opacity">
                      View More
                    </button>
                  </div>

                  {/* Ratings Filter */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize mb-4 sm:mb-6">
                      Ratings
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {[5, 4, 3, 2, 1]?.map((rating) => (
                        <div key={rating} className="flex items-center gap-4 sm:gap-5">
                          <input
                            type="checkbox"
                            id={`rating-${rating}`}
                            checked={selectedRating === rating?.toString()}
                            onChange={() => handleRatingClick(rating?.toString())}
                            className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-border-primary rounded shadow-sm"
                          />
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex gap-1 sm:gap-2">
                              {Array.from({ length: 5 }, (_, index) => (
                                <img
                                  key={index}
                                  src={index < rating ? "/images/img_vector_yellow_500.svg" : "/images/img_vector_white_a700.svg"}
                                  alt=""
                                  className="w-5 h-5 sm:w-6 sm:h-6"
                                />
                              ))}
                            </div>
                            {rating < 5 && (
                              <span className="text-lg sm:text-xl font-semibold text-text-mutedLight">
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
              <div className="w-full lg:flex-1">
                {/* Header with Sort */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-9 gap-4 sm:gap-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-secondary font-['Lexend_Mega'] capitalize">
                      AI Tools
                    </h1>
                    <span className="text-lg sm:text-xl font-semibold text-text-mutedLight mb-0 sm:mb-2">
                      3,000 Tools Found
                    </span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-base sm:text-lg font-semibold text-text-primary">
                      Sort By:
                    </span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e?.target?.value)}
                        className="appearance-none bg-bg-secondary-background border-2 border-border-primary rounded-3xl px-6 sm:px-7 py-2 sm:py-3 pr-10 sm:pr-12 text-lg sm:text-xl font-medium text-text-primary shadow-[1px_3px_1px_#000000] focus:outline-none focus:ring-2 focus:ring-bg-primary-background"
                      >
                        <option value="Default">Default</option>
                        <option value="Rating">Rating</option>
                        <option value="Name">Name</option>
                        <option value="Date">Date</option>
                      </select>
                      <img
                        src="/images/img_vector_blue_gray_900.svg"
                        alt=""
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-2 pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-20">
                  {aiTools?.map((tool) => (
                    <article
                      key={tool?.id}
                      className={`bg-bg-secondary-background border-2 ${
                        tool?.featured ? 'border-border-accent' : 'border-border-primary'
                      } rounded-md p-4 sm:p-6 shadow-[3px_4px_1px_${tool?.featured ? '#e5ac00' : '#000000'}] hover:shadow-lg transition-shadow duration-300`}
                    >
                      {/* Tool Header */}
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <img
                          src="/images/img_group_353.svg"
                          alt={`${tool?.name} logo`}
                          className="w-16 h-16 sm:w-[70px] sm:h-[70px] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                            <h3 className="text-base sm:text-lg font-bold text-text-primary font-['Public_Sans'] leading-tight">
                              {tool?.name}
                            </h3>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <img src="/images/img_vector_amber_a400.svg" alt="" className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                              <span className="text-sm font-medium text-text-muted">
                                {tool?.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              text={tool?.category}
                              text_font_size="14"
                              text_font_family="Public Sans"
                              text_font_weight="500"
                              text_line_height="17px"
                              text_text_align="left"
                              text_color="#000000"
                              fill_background_color="#ffffff"
                              border_border="1px solid #000000"
                              border_border_radius="14px"
                              effect_box_shadow="1px 2px 1px #000000"
                              padding="4px 14px"
                              layout_width="auto"
                              position="relative"
                              layout_gap="0"
                              margin="0"
                              variant="primary"
                              size="small"
                              onClick={() => {}}
                              className="text-xs sm:text-sm"
                            />
                            <Button
                              text={tool?.profession}
                              text_font_size="14"
                              text_font_family="Public Sans"
                              text_font_weight="500"
                              text_line_height="17px"
                              text_text_align="left"
                              text_color="#000000"
                              fill_background_color="#ffffff"
                              border_border="1px solid #000000"
                              border_border_radius="14px"
                              effect_box_shadow="1px 2px 1px #000000"
                              padding="4px 14px"
                              layout_width="auto"
                              position="relative"
                              layout_gap="0"
                              margin="0"
                              variant="primary"
                              size="small"
                              onClick={() => {}}
                              className="text-xs sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tool Description */}
                      <p className="text-sm sm:text-base font-medium text-text-muted font-['Public_Sans'] leading-normal mb-4 sm:mb-6">
                        {tool?.description}
                      </p>

                      {/* Tool Footer */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-sm font-medium text-text-muted">
                            {tool?.date}
                          </span>
                          <div className="w-1 h-1 bg-text-mutedMedium rounded-full"></div>
                          <span className="text-sm font-medium text-text-muted">
                            {tool?.pricing}
                          </span>
                        </div>
                        <Button
                          text="Visit Website"
                          text_font_size="14"
                          text_font_family="Public Sans"
                          text_font_weight="500"
                          text_line_height="17px"
                          text_text_align="center"
                          text_color="#ffffff"
                          fill_background_color="#0099ff"
                          border_border="2px solid #000000"
                          border_border_radius="3px"
                          effect_box_shadow="1px 2px 1px #000000"
                          padding="4px 16px"
                          layout_width="auto"
                          position="relative"
                          layout_gap="0"
                          margin="0"
                          variant="primary"
                          size="small"
                          onClick={() => {}}
                          className="flex-shrink-0"
                        />
                      </div>
                    </article>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="text-center">
                  <Button
                    text="Load More Tools"
                    text_font_size="24"
                    text_font_family="Public Sans"
                    text_font_weight="500"
                    text_line_height="29px"
                    text_text_align="left"
                    text_color="#ffffff"
                    fill_background_color="#0099ff"
                    border_border="2px solid #000000"
                    border_border_radius="4px"
                    effect_box_shadow="2px 4px 1px #000000"
                    padding="12px 30px"
                    layout_width="auto"
                    position="relative"
                    layout_gap="0"
                    margin="0"
                    variant="primary"
                    size="large"
                    onClick={() => {}}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-bg-primary-dark mt-20 sm:mt-24 lg:mt-32 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
          <div className="w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-8 sm:mb-12">
              
              {/* Logo and Social Links */}
              <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8 w-full lg:w-auto">
                <img
                  src="/images/img_footer_logo.png"
                  alt="Select AI Tool Logo"
                  className="w-48 sm:w-56 lg:w-[236px] h-auto"
                />
                <div className="flex items-center gap-4 sm:gap-5">
                  <img src="/images/img_facebook_176.svg" alt="Facebook" className="w-3 h-6 hover:opacity-80 cursor-pointer transition-opacity" />
                  <img src="/images/img_instagram_167.svg" alt="Instagram" className="w-6 h-6 hover:opacity-80 cursor-pointer transition-opacity" />
                  <img src="/images/img_tiktok_fill_svgrepo_com.svg" alt="TikTok" className="w-6 h-6 hover:opacity-80 cursor-pointer transition-opacity" />
                  <img src="/images/img_pinterest_svgrepo_com.svg" alt="Pinterest" className="w-6 h-6 hover:opacity-80 cursor-pointer transition-opacity" />
                  <img src="/images/img_youtube_168.svg" alt="YouTube" className="w-6 h-4 hover:opacity-80 cursor-pointer transition-opacity" />
                </div>
              </div>

              {/* Footer Links */}
              <div className="flex flex-col sm:flex-row justify-between w-full lg:w-auto gap-8 sm:gap-12 lg:gap-16">
                
                {/* AI Tool Categories */}
                <div className="flex flex-col gap-4 sm:gap-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize">
                    AI Tool Categories
                  </h3>
                  <nav className="flex flex-col gap-3 sm:gap-4">
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      AI Development
                    </a>
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      Content Creation
                    </a>
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      Graphic Designing
                    </a>
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      Internet Of Things
                    </a>
                  </nav>
                </div>

                {/* Ebooks */}
                <div className="flex flex-col gap-4 sm:gap-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize">
                    Ebooks
                  </h3>
                  <nav className="flex flex-col gap-3 sm:gap-4">
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      Governing the Machine: Ethics and AI Regulation
                    </a>
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      The Rise of Thinking Code: AI and the Future
                    </a>
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      The Moral Algorithm: Ethics in Artificial Decision-Making
                    </a>
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      Beyond the Hype: Understanding the AI Revolution
                    </a>
                  </nav>
                </div>

                {/* Others */}
                <div className="flex flex-col gap-4 sm:gap-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-text-white font-['Lexend_Mega'] capitalize">
                    Others
                  </h3>
                  <nav className="flex flex-col gap-3 sm:gap-4">
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      Terms & Conditions
                    </a>
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      Privacy Policy
                    </a>
                    <a href="#" className="text-lg sm:text-xl font-medium text-text-disabled hover:text-text-white transition-colors">
                      Email Us
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <Button
                  text="View All Tools"
                  text_font_size="16"
                  text_font_family="Public Sans"
                  text_font_weight="500"
                  text_line_height="19px"
                  text_text_align="left"
                  text_color="#ffffff"
                  fill_background_color="#0099ff"
                  border_border="1px solid #b7b7b7"
                  border_border_radius="3px"
                  effect_box_shadow="1px 2px 1px #b8b8b8"
                  padding="8px 20px"
                  layout_width="auto"
                  position="relative"
                  layout_gap="0"
                  margin="0"
                  variant="primary"
                  size="medium"
                  onClick={() => {}}
                  className=""
                />
                <Button
                  text="View All Ebooks"
                  text_font_size="16"
                  text_font_family="Public Sans"
                  text_font_weight="500"
                  text_line_height="19px"
                  text_text_align="left"
                  text_color="#ffffff"
                  fill_background_color="#0099ff"
                  border_border="1px solid #b7b7b7"
                  border_border_radius="3px"
                  effect_box_shadow="1px 2px 1px #b8b8b8"
                  padding="8px 22px"
                  layout_width="auto"
                  position="relative"
                  layout_gap="0"
                  margin="0"
                  variant="primary"
                  size="medium"
                  onClick={() => {}}
                  className=""
                />
              </div>
              <img src="/images/img_group_275.svg" alt="Scroll to top" className="w-10 h-10 sm:w-12 sm:h-12 hover:opacity-80 cursor-pointer transition-opacity" />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-bg-secondary-light my-6 sm:my-8"></div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm sm:text-base font-normal text-text-disabled">
                © 2025 Select AI Tool inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default AIToolsDirectoryOne;