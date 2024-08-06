import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";
import NextAuth from "next-auth"
const API_KEY = "sk_dev_Zo-JUeW1VSADDiqkmx8EXSsOUnKJ_-CHRiTkaHekL9HSxe62HX48QufuyeKHC8ce";

import { authOptions } from "@/app/lib/authOptions";
const liveblocks = new Liveblocks({
  secret: API_KEY!,
});
//@ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }