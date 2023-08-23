import jwt from "jsonwebtoken";
import { getBase64 } from "@contentpi/lib";

import config from "../config";

const { security: { secretKey } } = config;

export function jwtVerify(accessToken: any, cb: any): void {
  jwt.verify(accessToken, secretKey, (error: any, accessTokenData: any = {}) => {
    const { data: user } = accessTokenData;

    console.log('jwtVerify: ', { user });

    if (error || !user) {
      return cb(false);
    }

    const userData = getBase64(user);

    return cb(userData);
  });
}

export async function getUserData(accessToken: any): Promise<any> {
  const UserPromise = new Promise(resolve => jwtVerify(accessToken, (user: any) => resolve(user)));
  const user = await UserPromise;
  return user;
}

