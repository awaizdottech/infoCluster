import awaizdottech from "../assets/awaizdottech.png";

export default function Logo({ width = "50px" }) {
  return (
    <div>
      <img src={awaizdottech} width={width} alt="awaiz.tech" />
    </div>
  );
}
