import { forwardRef, useId } from "react";

export default forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id}></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`${className}`}
        defaultValue="active"
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
});
