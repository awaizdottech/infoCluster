import { forwardRef, useId } from "react";

export default forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex items-center">
      {label && (
        <label htmlFor={id} className="mx-3">
          {label}
        </label>
      )}
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
    </div>
  );
});
