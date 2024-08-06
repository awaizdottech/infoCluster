import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userData);
  const navItems = [
    // todo: add currentRoute prop then accordingly the style
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header>
      <Container className="m-3">
        <nav className="flex">
          <Link className="p-5" to="/">
            <Logo />
          </Link>
          <ul className="flex flex-1 justify-end">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    disabled={location.pathname == item.slug}
                    className={`p-5 ${
                      location.pathname == item.slug
                        ? "text-[#7f5af0]"
                        : "hover:text-[#7f5af0]"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <div className="flex">
                <li className="p-5">
                  <LogoutBtn className="hover:text-[#7f5af0]" />
                </li>
                <li className="px-6 py-3 my-4 rounded-full mx-5 bg-[#7f5af0]">
                  {userData.name[0].toUpperCase()}
                </li>
              </div>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
