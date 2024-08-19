'use server';

import { liveblocksClient } from "@/app/lib/liveblocksClient";
import { getUserEmail } from "@/app/lib/userClient";
import {CollaborativeEditor} from "../../components/CodeEditor";
import { Room } from "@/app/Room";

type PageProps = {
    params:{
        projectId: string;
    };
};


export default async function proejctPage(props: PageProps){
const projectId = props.params.projectId
const userEmail = await getUserEmail();
const projectInfo = await liveblocksClient.getRoom(projectId);
const userAccess = projectInfo.usersAccesses?.[userEmail];
const hasAccess = userAccess && [...userAccess].includes('room:write');
if (!hasAccess){
    return(
        <div>Access denied</div>
    );
}
return(

 <div>board page: {projectInfo.metadata.projectName}
 <Room id={projectId}>
 <CollaborativeEditor /> 
 </Room>
  
 </div>


 
);
}

