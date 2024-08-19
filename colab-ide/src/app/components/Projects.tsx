'use server';
import{Liveblocks} from "@liveblocks/node";
import {liveblocksClient} from "../lib/liveblocksClient"
import {getUserEmail} from "../lib/userClient";
import Link from "next/link";
import { RoomProvider } from "@liveblocks/react/suspense";
import PresenceAvatars from "./PresenceAvatars"
export default async function Projects() {
    const email = await getUserEmail();
    const {data:rooms} = await liveblocksClient.getRooms({userId: email});
    return (
        <div className="my-4 grid md:grid-cols-4 gap-2">
            {rooms?.length > 0 && rooms.map(room => (
                <Link className="bg-gray-200 p-4 rounded-md block" href={'/projects/${room.id}'} key={room.id}>
                    <RoomProvider id={room.id} initialPresence={{}}>
                        <div className="absolute bottom-1 right-1">
                        <PresenceAvatars presenceKey={'projectId'} presenceValue={room.id}/>
                        </div>
                    </RoomProvider>
                    {room.metadata.projectName}
                </Link>
            ))}
        </div>
    );
  }