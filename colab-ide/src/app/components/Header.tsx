import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

export default async function Header(){
    const session = await getServerSession(authOptions);
    return(
        <header className="bg-gray-200 p-4">
            <a href = "">colab</a>
            <div>
                {session && (
                    <>
                    Hello, {session?.user?.name}
                    <button>Logout</button>
                    </>
                )}
            </div>
        </header>
    )
}