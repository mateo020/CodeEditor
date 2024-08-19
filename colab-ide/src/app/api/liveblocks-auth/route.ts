import { authOptions } from "@/app/lib/authOptions";
import { liveblocksClient } from "@/app/lib/liveblocksClient";
import { Liveblocks } from "@liveblocks/node";
import { getServerSession } from "next-auth";

function getRandomHexColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  


export async function POST(request: Request) {
    // Get the current user from your database
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      return new Response('Unauthorized', { status: 401 });
    }
  
    const user = session.user;
    const email = user.email || '';
  
    const randomColor = getRandomHexColor();
    // Identify the user and return the result
    const { status, body } = await liveblocksClient.identifyUser(
      {
        userId: email,
        groupIds: [],
      },
      {
        userInfo: {
          name: user.name || '',
          email: email,
          picture: user.image||'',
          color: randomColor

        }
      },
    );
  
    return new Response(body, { status });
  }