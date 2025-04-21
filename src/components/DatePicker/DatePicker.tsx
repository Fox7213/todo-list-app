import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { DayPicker, Matcher } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import useOutsideClick from '../../hooks/useOutsideClick';
import Input from '../Input/Input';
import styles from './DatePicker.module.scss';

interface DatePickerProps {
  label: string;
  placeholder?: string;
  iconSrc?: string;
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  disabled?: boolean;
  className?: string;
}

const DatePicker = ({
  label,
  placeholder = 'Select date',
  iconSrc,
  selected,
  onChange,
  minDate,
  maxDate,
  dateFormat = 'MM/dd/yyyy',
  disabled = false,
  className = '',
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(selected || null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Use the custom hook for handling outside clicks
  useOutsideClick(datePickerRef, () => {
    setIsCalendarOpen(false);
  });

  // Update internal state when the selected prop changes
  useEffect(() => {
    setSelectedDate(selected || null);
    setInputValue(selected ? format(selected, dateFormat) : '');
  }, [selected, dateFormat]);

  // Handle date selection
  const handleDaySelect = (date: Date | undefined) => {
    const newDate = date || null;
    setSelectedDate(newDate);
    setInputValue(newDate ? format(newDate, dateFormat) : '');
    setIsCalendarOpen(false);
    
    if (onChange) {
      onChange(newDate);
    }
  };

  // Handle input click to open calendar
  const handleInputClick = () => {
    if (!disabled) {
      setIsCalendarOpen(!isCalendarOpen);
    }
  };

  // Create disabled days based on minDate and maxDate
  const disabledDays = {
    before: minDate,
    after: maxDate,
  } as Matcher | Matcher[] | undefined;

  return (
    <div className={`${styles.datePickerContainer} ${className}`} ref={datePickerRef}>
      <div onClick={handleInputClick}>
        <Input
          label={label}
          placeholder={placeholder}
          iconSrc={iconSrc}
          value={inputValue}
          // Make the input read-only since we handle the value
          onChange={() => {}}
        />
      </div>
      
      {isCalendarOpen && (
        <div className={styles.calendarContainer}>
          <DayPicker
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleDaySelect}
            disabled={disabledDays}
            className={styles.dayPicker}
            modifiersClassNames={{
              selected: styles.selected,
              today: styles.today,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker; 