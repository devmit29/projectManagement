import { MoreHorizontal } from "lucide-react";
import { TASK } from "../types";
import { TaskActions } from "./task-actions";
import { DottedSeperator } from "@/components/dotted-seperated";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface KanbanCardProps{
    task: TASK;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
    return (
        <div className="p-2.5 bg-white mb-1.5 rounded shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-x-2">
                <p className="line-clamp-2 text-sm">{task.name}</p>
                <TaskActions id={task.$id} projectId={task.projectId}>
                    <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition"/>
                </TaskActions>
            </div>
            <DottedSeperator />
            <div className="flex items-center gap-x-1.5">
                <MemberAvatar name={task.assignee.name} fallbackClassName="text-[10px]" />
                <div className="size-1 rounded-full bg-neutral-300" />
                <TaskDate value={task.dueDate} className="text-xs" />
            </div>
            <div className="flex items-center gap-x-1.5">
                <ProjectAvatar name={task.project.name} image={task.project.imageUrl} fallbackClassName="text-[10px]" />
                <span className="text-xs font-medium">{task.project.name}</span>
            </div>
         </div>
     )
}