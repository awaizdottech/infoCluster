import { forwardRef, useId } from "react";

export default forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={`${className}`}
        ref={ref}
        id={id}
        {...props}
      />
    </>
  );
});
