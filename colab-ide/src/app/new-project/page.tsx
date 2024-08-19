'use client';
import {redirect} from "next/navigation";
import{createProject} from "../actions/projectActions"
export default function newProjectPage(){
    async function handleNewProjectSubmit(formData: FormData){
        const projectName = formData.get('name')?.toString() || '';
        const roomInfo = await createProject(projectName)
        if(roomInfo){
            redirect(`/projects/${roomInfo.id}`);
        }


    }
    return(
        <div>
            <form action={handleNewProjectSubmit} className="max-w-xs block">
                <h1 className="text-2xl">Create new board</h1>
                <input type="text" name="name" placeholder="Board Name"/>
                <button type="submit" className="mt-2 w-full"> Create Board</button>

            </form>
        </div>
    )

}