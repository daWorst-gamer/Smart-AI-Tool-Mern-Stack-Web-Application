import React, { useState } from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const chipContainerClasses = cva(
  'flex flex-wrap items-center gap-2',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
      },
      size: {
        small: 'gap-1',
        medium: 'gap-2',
        large: 'gap-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const chipClasses = cva(
  'inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
        active: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        inactive: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
      },
      size: {
        small: 'px-2 py-1 text-xs',
        medium: 'px-3 py-1.5 text-sm',
        large: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

const ChipView = ({
  // Optional parameters (no defaults)
  layout_width,
  margin,
  position,
  
  // Standard React props
  chips = [],
  selectedChips = [],
  onChipClick,
  multiSelect = true,
  variant,
  size,
  className,
  children,
  ...props
}) => {
  const [internalSelected, setInternalSelected] = useState(selectedChips);

  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidMargin = margin && typeof margin === 'string' && margin?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidMargin ? `m-[${margin}]` : '',
    hasValidPosition ? position : '',
  ]?.filter(Boolean)?.join(' ');

  const handleChipClick = (chipId, chipData) => {
    let newSelected;
    
    if (multiSelect) {
      newSelected = internalSelected?.includes(chipId)
        ? internalSelected?.filter(id => id !== chipId)
        : [...internalSelected, chipId];
    } else {
      newSelected = internalSelected?.includes(chipId) ? [] : [chipId];
    }
    
    setInternalSelected(newSelected);
    
    if (typeof onChipClick === 'function') {
      onChipClick(chipId, chipData, newSelected);
    }
  };

  const isSelected = (chipId) => {
    return selectedChips?.length > 0 ? selectedChips?.includes(chipId) : internalSelected?.includes(chipId);
  };

  // Default chips if none provided
  const defaultChips = [
    { id: 'ai-development', label: 'AI Development' },
    { id: 'content-creation', label: 'Content Creation' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'automation', label: 'Automation' },
  ];

  const chipsToRender = chips?.length > 0 ? chips : defaultChips;

  return (
    <div
      className={twMerge(
        chipContainerClasses({ variant, size }),
        optionalClasses,
        className
      )}
      role="group"
      aria-label="Filter chips"
      {...props}
    >
      {chipsToRender?.map((chip) => {
        const chipId = chip?.id || chip?.value || chip?.label;
        const chipLabel = chip?.label || chip?.text || chip;
        const selected = isSelected(chipId);
        
        return (
          <button
            key={chipId}
            onClick={() => handleChipClick(chipId, chip)}
            className={twMerge(
              chipClasses({ 
                variant: selected ? 'active' : 'inactive',
                size 
              })
            )}
            role="option"
            aria-selected={selected}
            aria-pressed={selected}
          >
            {chipLabel}
          </button>
        );
      })}
      {children}
    </div>
  );
};

export default ChipView;