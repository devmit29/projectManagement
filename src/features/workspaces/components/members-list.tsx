"use client"

import { Fragment } from "react";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import { useWorkspaceId } from "../hooks/use-workspace-id";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DottedSeperator } from "@/components/dotted-seperater";
import { Separator } from "@/components/ui/separator";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";
export const MembersList = () => {
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = useConfirm(
        "Remove Member",
        "Are you sure you want to remove this member?",
        "destructive"
    );

    const { data } = useGetMembers({workspaceId});
    const {
        mutate: deleteMember,
        isPending: isDeletingMember,
    } = useDeleteMember();
    
    const {
        mutate: updateMember,
        isPending: isUpdatingMember,
    } = useUpdateMember();
    
    const handleUpdateMember = (memberId: string, role: MemberRole) => {
        updateMember({
            json: { role },
            param: {memberId},
        });
    }

    const handleDeleteMember = async (memberId: string) => {
        const ok = await confirm();
        if (!ok) return;
        deleteMember({ param: { memberId } }, {
            onSuccess: () => {
                window.location.reload();
            },
        });
     }


    return ( 
        <Card className="w-full h-full border-none shadow-none">
            <ConfirmDialog/>
            <CardHeader className="felx flex-row items-center font-bold text-lg gap-x-4 p-7 space-y-0">
                <Button asChild variant="secondary" size="sm" className="bg-neutral-100">
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className="size-4 mr-2" />
                    </Link>
                </Button>
                Member List
            </CardHeader>
            <div className="px-7">
                <DottedSeperator/>
            </div>
            <CardContent className="p-7">
                {data?.documents.map((member, index) => (
                    <Fragment key={member.$id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                className="size-10"
                                fallbackClassName="text-lg"
                                name={member.name}
                            />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">{member.name }</p>
                                <p className="text-xs text-muted-foreground">{member.email }</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                            <Button
                                className="ml-auto"
                                variant={"secondary"}
                            size={"icon"}>

                                <MoreVerticalIcon className="size-4 text-muted-foreground"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem
                                        className="font-medium"
                                        onClick={()=>handleUpdateMember(member.$id, MemberRole.ADMIN)}
                                        disabled={isUpdatingMember}
                                    >
                                        Set as Administrator
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium"
                                        onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                                        disabled={isUpdatingMember}
                                    >
                                        Set as Member
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="font-medium text-amber-700"
                                        onClick={() => handleDeleteMember(member.$id) }
                                        disabled={isDeletingMember}
                                    >
                                        Remove {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                        </div>
                        {index < data.documents.length - 1 && (
                            <Separator className="my-2.5"/>
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
     );

}
 