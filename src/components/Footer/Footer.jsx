import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="flex justify-around p-10 pb-18">
      <Link className="p-5" to="/">
        <Logo width="70px" />
      </Link>
      <div>
        <div className="flex">
          <p className="p-5">
            &copy; Copyright 2024. All Rights Reserved by{" "}
            <Link to="https://www.awaiz.tech/">
              <span className="hover:text-[#7f5af0] underline">
                awaizdottech
              </span>
            </Link>
          </p>
        </div>
        <Link to="https://github.com/awaizdottech/infoCluster">
          <span className="hover:text-[#7f5af0] underline">
            Github Project Repo
          </span>
        </Link>
      </div>
    </section>
  );
}

export default Footer;
