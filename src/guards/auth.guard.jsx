import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateValidationFragment = <Outlet />;

export const AuthGuard = () => {
  const userState = useSelector((store) => store.user);
  return userState.login ? (
    PrivateValidationFragment
  ) : (
    <Navigate replace to={"/"} />
  );
};

export default AuthGuard;
