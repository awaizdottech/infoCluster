import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userData);
  const navItems = [
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
      <Container>
        <nav className="flex justify-between">
          <Link className="p-5" to="/">
            <Logo />
          </Link>
          <ul className="hidden lg:flex flex-1 justify-end">
            {navItems.map(
              (item) =>
                item.active && (
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
                )
            )}
            {authStatus && (
              <div className="hidden sm:flex">
                <li className="p-5">
                  <LogoutBtn className="hover:text-[#7f5af0]" />
                </li>
                <li className="px-6 py-3 my-4 rounded-full mx-5 bg-[#7f5af0]">
                  {userData.name[0].toUpperCase()}
                </li>
              </div>
            )}
          </ul>
          <div className="hidden max-lg:inline-block relative">
            <Menu as="div" className="p-5">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 hover:text-[#7f5af0]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </MenuButton>
              <MenuItems
                transition
                className="absolute w-40 right-3 z-10 mt-2 origin-top-right rounded-md bg-[#242629] transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {navItems.map(
                  (item) =>
                    item.active && (
                      <MenuItem key={item.name}>
                        <button
                          onClick={() => navigate(item.slug)}
                          disabled={location.pathname == item.slug}
                          className={`block px-5 py-3 ${
                            location.pathname == item.slug
                              ? "text-[#7f5af0]"
                              : "hover:text-[#7f5af0]"
                          }`}
                        >
                          {item.name}
                        </button>
                      </MenuItem>
                    )
                )}
                {authStatus && (
                  <MenuItem>
                    <LogoutBtn className="block px-5 py-3 hover:text-[#7f5af0]" />
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </nav>
      </Container>
    </header>
  );
}
