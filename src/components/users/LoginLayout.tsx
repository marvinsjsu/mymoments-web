import { redirectTo } from "@contentpi/lib";
import { FC, ReactElement, useContext, useEffect } from "react";

import { UserContext } from "../../contexts/user";

import Login from "./Login";

interface IProps {
  currentUrl: string;
}

const Layout: FC<IProps> = ({ currentUrl }): ReactElement => {
  const { login } = useContext(UserContext);

  console.log({ login, currentUrl });

  return (
    <Login login={login} currentUrl={currentUrl} />
  );
};

export default Layout;
