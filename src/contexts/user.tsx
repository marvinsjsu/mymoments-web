import { FC, createContext, ReactElement, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getGraphQlError, redirectTo, getDebug } from "@contentpi/lib";
import { useQuery, useMutation } from "@apollo/client";

import LOGIN_MUTATION from "../graphql/user/login.mutation";
import GET_USER_DATA_QUERY from "../graphql/user/getUserData.query";
import loginMutation from "../graphql/user/login.mutation";

interface IUserContext {
  login(input: any): any;
  connectedUser: any;
}

interface IProps {
  page?: string;
  children: ReactElement;
}

export const UserContext = createContext<IUserContext>({
  login: () => null,
  connectedUser: null,
});

const UserProvider: FC<IProps> = ({ page = "", children }): ReactElement => {
  const [cookies, setCookie] = useCookies();
  const [connectedUser, setConnectedUser] = useState(null);
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const { data: dataUser } = useQuery(GET_USER_DATA_QUERY, {
    variables: {
      at: cookies.at || "",
    }
  });

  console.log({ cookies, connectedUser });

  useEffect(() => {
    if (dataUser) {
      if (!dataUser.getUserData && page !== "login") {
        redirectTo("/login?redirectTo=/dashboard")
      } else {
        setConnectedUser(dataUser.getUserData);
      }
    }
  }, [dataUser, page]); 


  async function login(input: { email: string, password: string }): Promise<any> {
    try {
      const { data: dataLogin } = await loginMutation({
        variables: {
          email: input.email,
          password: input.password,
        }
      });
      
      if (dataLogin) {
        setCookie("at", dataLogin.login.token, { path: "/" });
        return dataLogin.login.token;
      }
    } catch (err) {
      return getGraphQlError(err);
    }
  }

  const context = { login, connectedUser };

  console.log({ context });

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
};

export default UserProvider;
