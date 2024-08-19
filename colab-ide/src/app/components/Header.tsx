import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import LogoutButton from "../components/LogoutButton"
import Link from "next/link";
export default async function Header(){
    const session = await getServerSession(authOptions);
    return(
        <header className="bg-gray-400 p-4">
            <div className="flex justify-between items-center">
            <Link href = "/">Colab-Editor</Link>
            <div>
                {session && (
                    <>
                    Hello, {session?.user?.name}
                    <LogoutButton/>
                    </>
                )}
            </div>


            </div>
            
        </header>
    )
}