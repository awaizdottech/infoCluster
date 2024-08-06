export function BigLoadingSVG() {
  return (
    <svg
      className="animate-spin"
      width="93"
      height="93"
      viewBox="-11.625 -11.625 116.25 116.25"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        r="36.5"
        cx="46.5"
        cy="46.5"
        fill="transparent"
        stroke="#242629"
        strokeWidth="12"
        strokeDasharray="229.22px"
        strokeDashoffset="0"
      ></circle>
      <circle
        r="36.5"
        cx="46.5"
        cy="46.5"
        stroke="#7f5af0"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDashoffset="115px"
        fill="transparent"
        strokeDasharray="229.22px"
      ></circle>
    </svg>
  );
}

export function SmallLoadingSVG() {
  return (
    <svg
      className="animate-spin"
      width="55"
      height="55"
      viewBox="-6.875 -6.875 68.75 68.75"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        r="17.5"
        cx="27.5"
        cy="27.5"
        fill="transparent"
        stroke="#242629"
        strokeWidth="8"
        strokeDasharray="109.9px"
        strokeDashoffset="0"
      ></circle>
      <circle
        r="17.5"
        cx="27.5"
        cy="27.5"
        stroke="#fffffe"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDashoffset="55px"
        fill="transparent"
        strokeDasharray="109.9px"
      ></circle>
    </svg>
  );
}
