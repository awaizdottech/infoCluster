export default function Button({
  children,
  type = "button",
  bgColor = "bg-[#7f5af0]",
  textColor,
  className = "",
  ...props
}) {
  return (
    <button
      className={`${bgColor} ${textColor} ${className}  rounded-3xl mx-5 py-2 px-5`}
      {...props}
    >
      {children}
    </button>
  );
}
