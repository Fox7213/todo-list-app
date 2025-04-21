import Dropdown, { DropdownOption } from './Dropdown';
import { Priority } from '../../models/Task';

import priorityIcon from '../../image/Inputs/i3.svg';

const priorityOptions: DropdownOption[] = [
  { value: Priority.HIGH.toString(), label: 'High Priority', color: '#E63946' },
  { value: Priority.MEDIUM.toString(), label: 'Medium Priority', color: '#F9A826' },
  { value: Priority.LOW.toString(), label: 'Low Priority', color: '#2A9D8F' },
];

interface PriorityDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

const PriorityDropdown = ({ value, onChange }: PriorityDropdownProps) => {
  return (
    <Dropdown
      label="Priority level"
      placeholder="Select priority"
      iconSrc={priorityIcon}
      options={priorityOptions}
      value={value}
      onChange={onChange}
    />
  );
};

export default PriorityDropdown; 