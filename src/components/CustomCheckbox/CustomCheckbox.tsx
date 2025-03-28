import { ChangeEvent } from 'react';
import style from './CustomCheckbox.module.css';

interface CustomCheckboxProps {
  id: number;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CustomCheckbox(props: CustomCheckboxProps) {
  return (
    <label className={style.checkbox} onClick={(e) => e.stopPropagation()}>
      <input
        type="checkbox"
        id={`${props.id}`}
        onChange={props.onChange}
        checked={props.checked}
      />
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    </label>
  );
}

export default CustomCheckbox;
