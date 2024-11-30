"use client"

import { DottedSeperator } from "@/components/dotted-seperated";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    },
}

export const JoinWorkspaceForm = ({
    initialValues,
}: JoinWorkspaceFormProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const { mutate, isPending } = useJoinWorkspace();

    const onSubmit = () => {
        mutate({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`);
            }
        }
        );
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    {`You've been invited to join the`} <span className="font-bold">{initialValues.name}</span> workspace
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeperator />
                <CardContent className="p-7">
                    <div className="flex items-center justify-between flex-col lf:flex-row">
                        <Button className="w-full lg:w-fit"
                            variant={"secondary"}
                            size={"lg"}
                            type="button"
                            asChild
                            disabled={isPending}
                        >
                            <Link href="/">
                                Cancel
                                </Link>
                        </Button>
                        <Button
                            type="button"
                            size="lg"
                            className="w-full lg:w-fit"
                            disabled={isPending}
                        onClick={onSubmit}>
                            Join Workspace
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
 }