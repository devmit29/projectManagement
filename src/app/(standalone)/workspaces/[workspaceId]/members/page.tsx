import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { MembersPageClient } from "./client";

const WorkspaceIdMembersPage = async () => {
    const user = await getCurrent();
    if (!user) redirect ("/sign-in");
    
    return ( 
        <MembersPageClient/>
     );
}
 
export default WorkspaceIdMembersPage;