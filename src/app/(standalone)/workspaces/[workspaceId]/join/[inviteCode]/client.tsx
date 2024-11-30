"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const WorkspaceIdJoinPageClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: initialValues, isLoading } = useGetWorkspace({ workspaceId });
    
    if (isLoading) {
        return <PageLoader/>
    }

    if (!initialValues) {
        return <PageError message="Workspace not found"/>
    }
    
    return (
        <div className="w-full lg:max-w-xl">
        <JoinWorkspaceForm initialValues={initialValues}/>
    </div>
    )
 }