/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  errors: any;
  register: any;
  className?: string;
}

const FormField: React.FunctionComponent<FormFieldProps> = ({
  label,
  name,
  type = "text",
  autoComplete = "off",
  placeholder,
  errors,
  register,
  className = "",
}) => {
  return (
    <div className={clsx("flex flex-col items-start w-full gap-1", className)}>
      <label htmlFor={name} className="text-base font-medium">
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        className="w-full h-10 px-3 py-2 text-base duration-300 border border-gray-300 rounded-md outline-none hover:border-gray-600 focus:border-gray-600"
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-sm font-medium text-red-500">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default FormField;
