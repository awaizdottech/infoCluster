import { useId } from "react";

export default Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
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
  }
);
