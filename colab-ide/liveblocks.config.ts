// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import {LiveList, LiveObject} from "@liveblocks/core";


const client = createClient({
  authEndpoint: "/api/liveblockas-auth",
  throttle:100,

})
export type Presence = {
  projectId?: null|string;

};

export type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    picture: string;
    color: string;
  },

};

export type RoomEvent = {};

export type TypedLiveblocksProvider = LiveblocksYjsProvider<
  Presence,
  Storage,
  UserMeta,
  RoomEvent
>;
type UserInfo = {
  name: string;
  email: string;
  picture: string;
  color: string;
};

export type UserAwareness = {
  user?: UserInfo;
};

export type AwarenessList = [number, UserAwareness][];


export const {
  RoomProvider,
  useMyPresence,
  useUpdateMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  useThreads,
} = createRoomContext<
  Presence,
  Storage,
  UserMeta,
  RoomEvent

>(client);