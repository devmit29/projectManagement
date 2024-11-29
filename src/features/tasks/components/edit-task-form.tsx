"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTaskSchema} from "../schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeperator } from "@/components/dotted-seperated";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
 import { DatePicker } from "@/components/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TASK, TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useUpdateTask } from "../api/use-update-task";

interface EditTaskFormProps {
    onCancel?: () => void;
    projectOptions: { id: string, name: string, imageUrl: string }[];
    memberOptions: { id: string, name: string }[];
    initialValues: TASK;
}

export const EditTaskForm = ({ onCancel, projectOptions, memberOptions, initialValues }: EditTaskFormProps) => {
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useUpdateTask();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema.omit({workspaceId: true, description: true})),
        defaultValues: {
            ...initialValues,
            dueDate: initialValues.dueDate ? new Date(initialValues.dueDate) : undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
        mutate({json: values, param: {taskId: initialValues.$id} },
            {
                onSuccess: ({data}) => {
                    form.reset();
                    onCancel?.();
                }
            });
    };

    return (
        <Card className="w-full h-full shadow-none border-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Edit Task!
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeperator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                        <FormField control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Task Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter task name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Due Date
                                    </FormLabel>
                                    <FormControl>
                                        <DatePicker {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name="assigneeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Assignee
                                    </FormLabel>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select assignee"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage />
                                        <SelectContent>
                                            {memberOptions.map((member) => (
                                                <SelectItem key={member. id} value={member.id}>
                                                    <div className="flex items-center gap-x-2">
                                                    <MemberAvatar
                                                        className="size-6"
                                                        name={member.name}
                                                        />
                                                        {member.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Status
                                    </FormLabel>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage />
                                        <SelectContent>
                                            <SelectItem value={TaskStatus.BACKLOG}>
                                                Backlog
                                            </SelectItem>
                                            <SelectItem value={TaskStatus.IN_PROGRESS}>
                                                In Progress
                                            </SelectItem>
                                            <SelectItem value={TaskStatus.IN_REVIEW}>
                                                In Review
                                            </SelectItem>
                                            <SelectItem value={TaskStatus.TODO}>
                                                Todo
                                            </SelectItem>
                                            <SelectItem value={TaskStatus.DONE}>
                                                Done
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Project
                                    </FormLabel>
                                    <Select
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Project"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <FormMessage />
                                        <SelectContent>
                                            {projectOptions.map((project) => (
                                                <SelectItem key={project. id} value={project.id}>
                                                    <div className="flex items-center gap-x-2">
                                                    <ProjectAvatar
                                                        className="size-6"
                                                        name={project.name}
                                                        image={project.imageUrl}
                                                    />
                                                        {project.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                            
                        </div>
                        <DottedSeperator className="py-7" />
                        <div className="flex justify-between items-center">
                            <Button
                                type="button"
                                size='lg'
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && 'invisible')}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size='lg'
                                disabled={isPending}
                                >
                                Save Changes
                            </Button>
                        </div>

                    </form>
                    
                    </Form>
            </CardContent>
        </Card>
    )
}