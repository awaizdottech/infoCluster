import { forwardRef, useId } from "react";

export default forwardRef(function Input(
  { label, type = "text", className = "", button, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="flex items-center">
      {label && (
        <label className="mx-3" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className} flex-1`}
        ref={ref}
        id={id}
        {...props}
      />
      {button}
    </div>
  );
});
