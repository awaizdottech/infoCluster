import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="flex justify-around p-6 pb-18">
      <div>
        <Link to="https://github.com/awaizdottech/infoCluster">
          <p className="hover:text-[#7f5af0] underline">Github Project Repo</p>
        </Link>
        <p className="p-2">
          &copy; Copyright 2024. All Rights Reserved by{" "}
          <Link to="https://www.awaiz.tech/">
            <span className="hover:text-[#7f5af0] underline">awaizdottech</span>
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Footer;
