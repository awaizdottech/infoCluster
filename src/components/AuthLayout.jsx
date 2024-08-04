import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authRequired = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authRequired && authStatus !== authRequired) {
      // auth isnt done when required
      navigate("/login");
    } else if (!authRequired && authStatus !== authRequired) {
      // auth is done when not required (means user landed on login or signup page)
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authRequired]);
  return loader ? <>Loading...</> : <>{children}</>;
}