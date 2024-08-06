import Image from "next/image";
import {CollaborativeEditor} from "./components/CodeEditor"
import { getServerSession } from "next-auth";
// import {Room} from "./Room"
import { Box } from '@chakra-ui/react'
import { authOptions } from "./lib/authOptions";
import LoginView from "./components/views/LoginView";
export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session){
    return (
      <LoginView/>
    );

  }
  return (
    <main>
    {/* <Room> */}
    <Box minH="100vh" bg="#0f0a19" color="grey.500" px={6} py={8}>
      <CollaborativeEditor />
    </Box>
    {/* </Room> */}
  </main>
  );
}
