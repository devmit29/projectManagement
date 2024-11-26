import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { GetMember } from "../members/utils";
import { createSessionClient } from "@/lib/appwrite";
import { Project } from "./types";

interface GetProjectProps { 
    projectId: string;
}


export const getProject = async ({ projectId}: GetProjectProps ) => {

    const { databases, account } = await createSessionClient();
    const user = await account.get();

    const project = await databases.getDocument<Project>(
        DATABASE_ID,
        PROJECTS_ID,
        projectId,
    );
        const member = await GetMember({
            databases,
            userId: user.$id,
            workspaceId: project.workspaceId,
        });
        
    if (!member) {
        throw new Error("Unauthorized");
    }
        
    return project;
    
}