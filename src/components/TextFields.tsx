import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface TextFieldsProps {
  type?: string;
  disabled?: boolean;
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onChange?: (value: string) => void;
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  textarea?: boolean;
  formatPrice?: boolean;
}

const TextFields: React.FC<TextFieldsProps> = ({
  type,
  disabled,
  value,
  setValue,
  required,
  id,
  register,
  errors,
  label,
  onChange,
  formatPrice,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;

    if (onChange) {
      onChange(newValue);
    } else if (setValue) {
      setValue(newValue);
    }
  };
  return (
    <div className="relative w-full">
      <div
        className={`w-full flex ${
          errors[id] ? "border-red" : "border-neutral-300"
        } ${
          errors[id]
            ? "focus:border-red text-red"
            : "focus:border-white text-white"
        } border-gray border rounded-lg items-center justify-center pl-4 pr-5 gap-2`}
      >
        <input
          id={id}
          {...register(id, { required })}
          type={type}
          placeholder=""
          disabled={disabled}
          value={value}
          onChange={handleChange}
          className={`peer rounded-lg w-full disabled:opacity-70 font-medium text-sm lg:text-base disabled:cursor-not-allowed pt-[22px] pb-[10px] text-white bg-transparent outline-none`}
        />
        {/* Label as animation placeholder primary */}
        <label
          className={`absolute text-md pointer-events-none ${
            formatPrice ? "left-12" : "left-4"
          } duration-150 transform  -translate-y-1 top-5 z-10 origin-[0] ${
            value && "-translate-y-4 scale-75"
          } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 text-sm lg:text-base peer-focus:scale-75 font-medium peer-focus:-translate-y-4 ${
            errors[id] ? "text-red" : "text-white"
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default TextFields;
