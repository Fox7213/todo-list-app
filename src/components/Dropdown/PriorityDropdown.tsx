import { Priority } from '../../models/Task';
import Dropdown, { DropdownOption } from './Dropdown';

import i3 from '../../image/Inputs/i3.svg';

interface PriorityDropdownProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  includeEmpty?: boolean;
  placeholder?: string;
}

const PriorityDropdown = ({ value, onChange, includeEmpty = false, placeholder = 'Priority', label = 'Priority' }: PriorityDropdownProps) => {
  const priorityOptions: DropdownOption[] = [
    { value: Priority.HIGH.toString(), label: 'High Priority', color: '#E63946' },
    { value: Priority.MEDIUM.toString(), label: 'Medium Priority', color: '#F4A261' },
    { value: Priority.LOW.toString(), label: 'Low Priority', color: '#2A9D8F' },
  ];
  
  // возможность добавления пустого варианта
  const options = includeEmpty 
    ? [{ value: '', label: 'All Priorities' }, ...priorityOptions] 
    : priorityOptions;

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      iconSrc={i3}
      label={label}
    />
  );
};

export default PriorityDropdown; 