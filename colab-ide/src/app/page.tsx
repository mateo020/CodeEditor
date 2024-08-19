import Image from "next/image";
import {CollaborativeEditor} from "./components/CodeEditor"
import { getServerSession } from "next-auth";
import Header from "./components/Header";
import Projects from "../app/components/Projects"
// import {Room} from "./Room"
import { Box } from '@chakra-ui/react'
import { authOptions } from "./lib/authOptions";
import LoginView from "./components/views/LoginView";
import Link from "next/link"
export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session){
    return (
      <LoginView/>
    );

  }
  return (
    <main>
      <Header/> 
      <h1 className="text-4xl mb-4">Your Projects:</h1>
      <Projects/>
      <div className="pt-4">
        <Link className='bg-gray-300 py-2 px-3 ml-2 mt-4 rounded' href={'/new-project'}>
          New Project &rarr;
        </Link>
      </div>
    {/* <Room> */}
    {/* <Header/>  */}
    {/* <Box minH="100vh" bg="#0f0a19" color="grey.500" px={6} py={8}> */}
      {/* <CollaborativeEditor /> */}
    {/* </Box> */}
    {/* </Room> */}
  </main>
  );
}
