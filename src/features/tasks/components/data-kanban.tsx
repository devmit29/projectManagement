import { useCallback, useEffect, useState } from "react";
import { TASK, TaskStatus } from "../types";

import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { KanbanColumnHeader } from "./kanban-column-header";
import { KanbanCard } from "./kanban-card";

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
    data: TASK[];
    onChange: (tasks: { $id: string, status: TaskStatus, position: number }[]) => void;
}
export const DataKanban = ({
    data,
    onChange
 }: DataKanbanProps) => {
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

    useEffect(() => {
        const newTasks: TasksState = {
            [TaskStatus.TODO]: [],
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: []
        }

        data.forEach((task) => {
            newTasks[task.status].push(task);
        });
            
        Object.keys(newTasks).forEach((key) => {
            newTasks[key as TaskStatus].sort((a, b) => a.position - b.position);
        });

        setTasks(newTasks);
    }, [data]);

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) return; 
        
        const { source, destination } = result;
        const sourceStatus = source.droppableId as TaskStatus;
        const destStatus = destination.droppableId as TaskStatus;

        let updatesPayload: { $id: string, status: TaskStatus, position: number }[] = [];

        setTasks((prevTasks) => {
            const newTasks = { ...prevTasks };

            const sourceColumn = [...newTasks[sourceStatus]];
            const [movedTask] = sourceColumn.splice(source.index, 1);

            if (!movedTask) {
                console.error("Task not found");
                return prevTasks;
            }

            const updatedMovedTask = sourceStatus !== destStatus
                ? { ...movedTask, status: destStatus }
                : movedTask;

            
            newTasks[sourceStatus] = sourceColumn;

            const destColumn = [...newTasks[destStatus]];
            destColumn.splice(destination.index, 0, updatedMovedTask);
            newTasks[destStatus] = destColumn;

            updatesPayload = [];
            
            updatesPayload.push({
                $id: updatedMovedTask.$id,
                status: destStatus,
                position: Math.min((destination.index + 1) * 1000, 1_000_000),
            })

            newTasks[destStatus].forEach((task, index) => {
                if (task && task.$id !== updatedMovedTask.$id) {
                    const newPosition = Math.min((index + 1) * 1000, 1_000_000);
                    if (task.position !== newPosition) {
                        updatesPayload.push({
                            $id: task.$id,
                            status: destStatus,
                            position: newPosition
                        })
                    }
                }
            });
            

            if (sourceStatus !== destStatus) {
                newTasks[sourceStatus].forEach((task, index) => {
                    if (task) {
                        const newPosition = Math.min((index + 1) * 1000, 1_000_000);
                        if (task.position != newPosition) {
                            updatesPayload.push({
                                $id: task.$id,
                                status: sourceStatus,
                                position: newPosition,
                            });
                        }
                    }
                });
            }
            return newTasks; 
        });

        onChange(updatesPayload);
    },[onChange])
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto">
                {boards.map((board) => {
                    return (
                        <div key={board} className="flex-1 bg-muted mx-2 p-1.5 rounded-md min-w-[200px]">
                            <KanbanColumnHeader
                                board={board}
                                taskCount={tasks[board].length}
                            />
                            <Droppable droppableId={board}>
                                {(provided) => {
                                    return (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="py-1.5 min-h-[200px]"
                                        > 
                                            {tasks[board].map((task, index) => {
                                                return (<Draggable index={index}
                                                    draggableId={task.$id}
                                                    key={task.$id}
                                                >
                                                    {(provided) => {
                                                        return (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                            <KanbanCard task={task}/>    
                                                            </div>
                                                        )
                                                    }}     
                                                </Draggable>)
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                 })}
            </div>
        </DragDropContext>
    );
}
 