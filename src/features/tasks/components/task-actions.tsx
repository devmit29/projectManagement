import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

interface TaskActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}

export const TaskActions = ({
    id,
    projectId,
    children,
}: TaskActionsProps) => {
    return(
        <div className="flex justify-end">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                    <DropdownMenuItem
                        onClick={() => { }}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <ExternalLinkIcon className="mr-2 stroke-2 size-4" />
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => { }}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <ExternalLinkIcon className="mr-2 stroke-2 size-4" />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => { }}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <PencilIcon className="mr-2 stroke-2 size-4" />
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => { }}
                        disabled={false}
                        className="text-red-600 focus:text-red-600 font-medium p-[10px]"
                    >
                        <TrashIcon className=" mr-2 stroke-2 size-4" />
                        Delete Task 
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
 }