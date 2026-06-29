'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  pattern: RegExp;
  placeholder: string;
}

export const COUNTRIES: Country[] = [
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', pattern: /^[34567]\d{7}$/, placeholder: '5555 5555' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', pattern: /^5\d{8}$/, placeholder: '51 234 5678' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', pattern: /^5\d{8}$/, placeholder: '50 123 4567' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', pattern: /^[569]\d{7}$/, placeholder: '5123 4567' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', pattern: /^[36]\d{7}$/, placeholder: '3912 3456' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', pattern: /^[79]\d{7}$/, placeholder: '9123 4567' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', pattern: /^7\d{9}$/, placeholder: '7123 456789' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', pattern: /^[2-9]\d{9}$/, placeholder: '202 555 0111' },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export default function PhoneInput({
  value,
  onChange,
  required = false,
  className,
  label,
  disabled = false,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Default to Qatar
  const [localNumber, setLocalNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Parse initial value to match country and local number
  useEffect(() => {
    if (!value) {
      if (isFirstRender.current) {
        setSelectedCountry(COUNTRIES[0]);
        setLocalNumber('');
        isFirstRender.current = false;
      }
      return;
    }

    // Try to find matching country code
    const cleanValue = value.replace(/\s+/g, '');
    let matched = false;

    // Sort by dial code length descending to match longer ones first (e.g. +974 before +97)
    const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);

    for (const country of sortedCountries) {
      if (cleanValue.startsWith(country.dialCode)) {
        setSelectedCountry(country);
        const remaining = value.substring(value.indexOf(country.dialCode) + country.dialCode.length).trim();
        setLocalNumber(remaining);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Fallback if it doesn't match any known country, treat as other or default
      if (cleanValue.startsWith('+')) {
        // Find if we can split by first space or first few chars
        const parts = value.split(' ');
        if (parts.length > 1 && parts[0].startsWith('+')) {
          setLocalNumber(parts.slice(1).join(' '));
        } else {
          setLocalNumber(value);
        }
      } else {
        setLocalNumber(value);
      }
    }
    isFirstRender.current = false;
  }, [value]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Validate the phone number
  const validateNumber = (number: string, country: Country) => {
    if (!number) {
      if (required) {
        setError('Phone number is required');
      } else {
        setError(null);
      }
      return;
    }

    const cleanNum = number.replace(/[\s\-()]+/g, '');
    
    // Check if contains non-digits
    if (!/^\d+$/.test(cleanNum)) {
      setError('Only digits are allowed');
      return;
    }

    // Check specific country rules
    const isValid = country.pattern.test(cleanNum);
    if (!isValid) {
      setError(`Invalid number format for ${country.name} (e.g., ${country.placeholder})`);
    } else {
      setError(null);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    
    // Combine and send
    const combined = `${country.dialCode} ${localNumber}`;
    onChange(combined);
    validateNumber(localNumber, country);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    
    // Allow digits, spaces, hyphens, parentheses
    const filteredVal = inputVal.replace(/[^\d\s\-()]/g, '');
    setLocalNumber(filteredVal);
    
    const combined = `${selectedCountry.dialCode} ${filteredVal.trim()}`;
    onChange(combined);
    validateNumber(filteredVal.trim(), selectedCountry);
  };

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && (
        <label className="text-[14px] font-medium text-[#37352F] block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative flex rounded-sm overflow-visible bg-[#F7F6F3]">
        {/* Country Selector Dropdown */}
        <div ref={dropdownRef} className="relative shrink-0 border-r border-[#E9E9E7]">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-2 h-full text-[14px] text-[#37352F] font-medium hover:bg-[#E9E9E7]/40 active:bg-[#E9E9E7]/60 transition-colors rounded-l-sm cursor-pointer disabled:cursor-not-allowed"
          >
            <span className="text-[16px] leading-none select-none">{selectedCountry.flag}</span>
            <span className="font-mono text-[13px]">{selectedCountry.dialCode}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#91918E]" />
          </button>

          {/* Floating Dropdown List */}
          {isOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-64 bg-white border border-[#E9E9E7] shadow-xl rounded-sm z-50 py-1 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-100">
              <div className="px-2.5 py-1 text-[11px] font-bold text-[#91918E] uppercase tracking-wider">
                Select Country
              </div>
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-[14px] text-left hover:bg-[#F7F6F3] transition-colors cursor-pointer",
                    selectedCountry.code === country.code && "bg-[#FFF2E5]/60 text-[#FC7810] font-medium"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">{country.flag}</span>
                    <span className="truncate max-w-[120px]">{country.name}</span>
                  </div>
                  <span className="font-mono text-[12px] text-[#91918E]">{country.dialCode}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Local Number Input */}
        <input
          type="tel"
          disabled={disabled}
          value={localNumber}
          onChange={handleInputChange}
          placeholder={selectedCountry.placeholder}
          required={required}
          className="flex-1 bg-transparent border-none px-3 py-2 text-[14px] text-[#37352F] placeholder:text-[#91918E] outline-none focus:ring-1 focus:ring-[#E9E9E7] transition-all rounded-r-sm"
        />
      </div>

      {/* Validation Error Message */}
      {error && (
        <div className="flex items-center gap-1.5 text-[12px] text-red-600 animate-in fade-in duration-150">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
