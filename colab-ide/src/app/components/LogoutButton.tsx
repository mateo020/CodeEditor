
'use client'
import {signOut} from "next-auth/react"
export default function LogoutButton(){
    return(
        <button onClick={()=> signOut()}
        className="bg-gray-300 py-3 px-6 ml-2 rounded">Logout</button>
        
    )

}