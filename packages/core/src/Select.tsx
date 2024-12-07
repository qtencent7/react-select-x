import React, { useState, useRef, useEffect } from 'react';
import type { SelectProps, Option } from './types';

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '请选择...',
  isMulti = false,
  isSearchable = true,
  isDisabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    if (isMulti) {
      const currentValue = Array.isArray(value) ? value : [];
      const isSelected = currentValue.some(item => item.value === option.value);
      
      const newValue = isSelected
        ? currentValue.filter(item => item.value !== option.value)
        : [...currentValue, option];
      
      onChange?.(newValue);
    } else {
      onChange?.(option);
      setIsOpen(false);
    }
    setSearchTerm('');
  };

  const displayValue = () => {
    if (!value) return '';
    if (!isMulti) return value.label;
    if (Array.isArray(value) && value.length === 0) return placeholder;
    return null;
  };

  const renderTags = () => {
    if (!isMulti || !Array.isArray(value)) return null;
    
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((item) => (
          <div
            key={item.value}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm"
          >
            <span>{item.label}</span>
            <button
              type="button"
              className="hover:text-blue-600 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item);
              }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      <div
        className={`
          min-h-[40px] px-3 py-2 border rounded-md
          ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'}
          ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'}
          flex items-center justify-between
        `}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
      >
        <div className="flex-1 flex items-center gap-2">
          {renderTags()}
          {isSearchable && isOpen ? (
            <input
              type="text"
              className="outline-none flex-1 bg-transparent min-w-[60px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              placeholder={value && Array.isArray(value) && value.length > 0 ? '' : placeholder}
            />
          ) : (
            <span className={(!value || (Array.isArray(value) && value.length === 0)) ? 'text-gray-400 flex-1' : 'flex-1'}>
              {displayValue() || placeholder}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const isSelected = Array.isArray(value)
                ? value.some(item => item.value === option.value)
                : value?.value === option.value;

              return (
                <div
                  key={option.value}
                  className={`
                    px-3 py-2 cursor-pointer
                    ${isSelected ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}
                  `}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};
