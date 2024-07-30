import { forwardRef, useId } from "react";

export default forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
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
});
