import { useId } from "react";

export default Select = React.forwardRef(
  ({ options, label, className = "", ...props }, ref) => {
    const id = useId();
    return (
      <>
        {label && <lable htmlFor={id}></lable>}
        <select {...props} id={id} ref={ref} className={`${className}`}>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </>
    );
  }
);
