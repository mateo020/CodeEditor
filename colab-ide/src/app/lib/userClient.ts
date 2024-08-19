//This client file will be responsible got getting the email for authorised user througth next auth
//authOptions: stablishes authentication provider
//getServer session is usesd to retrive the current session information on the sever side. session contains info on current user

import {authOptions} from "../lib/authOptions";
import { getServerSession } from "next-auth";
export async function getUserEmail(): Promise<string>{
    const session = await getServerSession(authOptions);
    return session?.user?.email || '';
}