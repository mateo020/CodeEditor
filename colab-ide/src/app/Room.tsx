"use client";

import { ReactNode } from "react";
//import {RoomProvider} from '../../liveblocks.config'
import { RoomProvider } from "@liveblocks/react/suspense";
import { ClientSideSuspense, LiveblocksProvider} from "@liveblocks/react";
import {LiveList} from "@liveblocks/core";
const publicApiKey = "pk_dev_T2IKGz999r-svrjenkbKTmhbLZNCDZgmBN7jhF2t1209IAAONPcwutNEXj4oQMR5";
type RoomProps = {
    id: string;
    children: React.ReactNode;
  };

export function Room({ id, children }: RoomProps){
  return (
    <LiveblocksProvider publicApiKey={publicApiKey}>
          <RoomProvider
            id={id}
            initialPresence={{

            }}>
            <ClientSideSuspense fallback={<div>Loading…</div>}>
                {() => children}
            </ClientSideSuspense>
            </RoomProvider>

    </LiveblocksProvider>
  
  
  );
}