import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const searchClasses = cva(
  'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'focus:ring-blue-500',
        secondary: 'focus:ring-gray-500',
      },
      size: {
        small: 'text-sm px-3 py-2',
        medium: 'text-base px-4 py-3',
        large: 'text-lg px-6 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const SearchView = ({
  // Required parameters with defaults
  placeholder = "Search 30000+ AI Tools...",
  text_font_size = "24",
  text_font_family = "Public Sans",
  text_font_weight = "500",
  text_line_height = "29px",
  text_text_align = "center",
  text_color = "#333333b2",
  fill_background_color = "#ffffff",
  border_border = "3 solid #000000",
  border_border_radius = "40px",
  effect_box_shadow = "4px 5px 1px #000000",
  
  // Optional parameters (no defaults)
  layout_gap,
  layout_width,
  padding,
  margin,
  position,
  
  // Standard React props
  variant,
  size,
  value,
  onChange,
  onSubmit,
  className,
  disabled = false,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState(value || '');

  // Safe validation for optional parameters
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidGap ? `gap-[${layout_gap}]` : '',
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidMargin ? `m-[${margin}]` : '',
    hasValidPosition ? position : '',
  ]?.filter(Boolean)?.join(' ');

  // Build inline styles for required parameters
  const searchStyles = {
    fontSize: text_font_size ? `${text_font_size}px` : '24px',
    fontFamily: text_font_family || 'Public Sans',
    fontWeight: text_font_weight || '500',
    lineHeight: text_line_height || '29px',
    textAlign: text_text_align || 'center',
    color: text_color || '#333333b2',
    backgroundColor: fill_background_color || '#ffffff',
    border: border_border || '3px solid #000000',
    borderRadius: border_border_radius || '40px',
    boxShadow: effect_box_shadow || '4px 5px 1px #000000',
  };

  const handleChange = (event) => {
    const newValue = event?.target?.value;
    setSearchValue(newValue);
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(searchValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value !== undefined ? value : searchValue}
          onChange={handleChange}
          disabled={disabled}
          style={searchStyles}
          className={twMerge(
            searchClasses({ variant, size }),
            optionalClasses,
            className
          )}
          aria-label="Search input"
          {...props}
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:opacity-70 transition-opacity"
          aria-label="Search"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchView;