import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...rest }: IProps) => {
  return (
    <input
      className="border-[1px] rounded-lg py-2 border-gray-600 
      focus:border-indigo-700 shadow-md focus:outline-none 
      focus:ring-1 focus:ring-indigo-700 text-md px-3"
      {...rest}
    />
  );
};

export default Input;
