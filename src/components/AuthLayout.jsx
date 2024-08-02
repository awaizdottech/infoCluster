import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      //if we need authentication and authentication isnt done (for all pages except login & signup)
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      // if we dont need authentication and authentication is done (means user landed on login or signup page)
      navigate("/");
    } // basically it means give the authenticated user everything & for non-authenticated user only home is alowed for exploring
    setLoader(false);
  }, [authStatus, navigate, authentication]);
  return loader ? <>Loading...</> : <>{children}</>;
}
