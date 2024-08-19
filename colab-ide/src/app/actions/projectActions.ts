'use server';


import{Liveblocks, RoomInfo} from "@liveblocks/node";
import uniqid from 'uniqid';
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/authOptions";

type createProjectResult = {
    id: string;
}
export async function createProject(name: string) : Promise<false | RoomInfo>{

      const liveblocksClient = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY || '',
  });
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || '';
  if (email) {
    const roomId = uniqid.time();
    return await liveblocksClient.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ['room:write'],
      },
      metadata: {
        projectName: name,
      },
    });
  }

  return false;

}
