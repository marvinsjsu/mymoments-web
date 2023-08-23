import { FC, ReactElement } from "react";
import { isBrowser } from "@contentpi/lib";

import UserProvider from "../contexts/user";
import LoginLayout from "../components/users/LoginLayout";

interface IProps {
  currentUrl: string;
}

const Page: FC<IProps> = ({
  currentUrl = isBrowser() ? window.location.search.replace("?redirectTo=", "") : "",
}): ReactElement => {

  console.log({ currentUrl });
  
  return (
    <UserProvider>
      <LoginLayout currentUrl={currentUrl} />
    </UserProvider>
  )
};

export default Page;
