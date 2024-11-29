import { useState } from "react";
import { TASK, TaskStatus } from "../types";

import { DragDropContext } from "@hello-pangea/dnd";
import { KanbanColumnHeader } from "./kanban-column-header";

const boards: TaskStatus[] = [
    TaskStatus.TODO,
    TaskStatus.BACKLOG,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE
]

type TasksState = {
    [key in TaskStatus]: TASK[]
}

interface DataKanbanProps{
    data: TASK[]
}
export const DataKanban = ({ data }: DataKanbanProps) => {
    const [tasks, setTasks] = useState<TasksState>(() => {
        const initialTasks: TasksState = {
            [TaskStatus.TODO]: [],
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: []
        }

        data.forEach((task) => {
            initialTasks[task.status].push(task);
        });
            
        Object.keys(initialTasks).forEach((key) => {
            initialTasks[key as TaskStatus].sort((a, b) => a.position - b.position);
        });

        return initialTasks;    
    });
    return (
        <DragDropContext onDragEnd={() => { }}>
            <div className="flex overflow-x-auto">
                {boards.map((board) => {
                    return (
                        <div key={board} className="flex-1 bg-muted mx-2 p-1.5 rounded-md min-w-[200px]">
                            <KanbanColumnHeader
                                board={board}
                                taskCount={tasks[board].length}
                            />
                        </div>
                    )
                 })}
            </div>
        </DragDropContext>
    );
}
 