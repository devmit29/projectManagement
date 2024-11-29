import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskStatus } from "../types";
import React from "react";
import { CircleCheckIcon, CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

interface KanbanColumnHeaderProps {
    board: TaskStatus;
    taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.BACKLOG]: (
        <CircleDashedIcon className="text-pink-400 size-[18px]"/>
    ),
    [TaskStatus.TODO]: (
        <CircleIcon className="text-red-400 size-[18px]"/>
    ),
    [TaskStatus.IN_PROGRESS]: (
        <CircleDotDashedIcon className="text-yellow-400 size-[18px]"/>
    ),
    [TaskStatus.IN_REVIEW]: (
        <CircleDotIcon className="text-blue-400 size-[18px]"/>
    ),
    [TaskStatus.DONE]: (
        <CircleCheckIcon className="text-emerald-400 size-[18px]"/>
    ),
}
 
export const KanbanColumnHeader = ({ board, taskCount }: KanbanColumnHeaderProps) => {
    const icon = statusIconMap[board];
    const { open } = useCreateTaskModal();
    return (
        <div className="px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                {icon}
                <h2 className="text-sm font-medium">
                    {snakeCaseToTitleCase(board)}
                </h2>
                <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
                    {taskCount}
                </div>
                <Button onClick={open} variant={"ghost"} size="icon" className="size-5">
                    <PlusIcon className="text-neutral-500 size-4"/>
                </Button>
            </div>
         </div>
     )
 }