import Image from "next/image";
import {CollaborativeEditor} from "./components/CodeEditor"
// import {Room} from "./Room"
import { Box } from '@chakra-ui/react'
export default function Home() {
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
