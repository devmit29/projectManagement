import { Models } from "node-appwrite";

export enum TaskStatus {
    BACKLOG = "BACKLOG",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    TODO = "TODO",
    IN_REVIEW = "IN_REVIEW",
}

export type TASK = Models.Document & {
    name: string;
    status: TaskStatus;
    workspaceId: string;
    assigneeId: string;
    projectId: string;
    position: number;
    dueDate: string;
    description?: string;
} 