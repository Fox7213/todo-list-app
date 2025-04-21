import { useState, useRef, useEffect, ChangeEvent } from 'react';
import style from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
  color?: string;
}

interface DropdownProps {
  label: string;
  placeholder?: string;
  iconSrc?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Dropdown = ({
  label,
  placeholder = 'Select an option',
  iconSrc,
  options,
  value,
  onChange,
  className = '',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | undefined>(
    value ? options.find(option => option.value === value) : undefined
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update selected option when value prop changes
  useEffect(() => {
    if (value) {
      const option = options.find(opt => opt.value === value);
      setSelectedOption(option);
    }
  }, [value, options]);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${style.dropdownContainer} ${className}`} ref={dropdownRef}>
      <label className={style.dropdownLabel}>{label}</label>
      <div className={style.dropdownWrapper}>
        <div 
          className={`${style.dropdownField} ${isOpen ? style.active : ''}`} 
          onClick={toggleDropdown}
        >
          {selectedOption ? (
            <div className={style.selectedOption}>
              {selectedOption.color && (
                <span 
                  className={style.colorIndicator} 
                  style={{ backgroundColor: selectedOption.color }}
                ></span>
              )}
              <span>{selectedOption.label}</span>
            </div>
          ) : (
            <span className={style.placeholder}>{placeholder}</span>
          )}
          {iconSrc && (
            <img src={iconSrc} alt="" className={style.dropdownIconImage} />
          )}
        </div>
        
        {isOpen && (
          <ul className={style.optionsList}>
            {options.map((option) => (
              <li 
                key={option.value} 
                className={style.option}
                onClick={() => handleOptionClick(option)}
              >
                {option.color && (
                  <span 
                    className={style.colorIndicator} 
                    style={{ backgroundColor: option.color }}
                  ></span>
                )}
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown; 