
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/rpc';

interface usegetTasksProps{
    workspaceId: string
}

export const useGetTasks = ({ workspaceId }: usegetTasksProps) => {
    const query = useQuery({
        queryKey: ["Tasks", workspaceId],
        queryFn: async () => {
            const response = await client.api.tasks.$get({
                query: {workspaceId}
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Tasks");
            }
            const { data } = await response.json();
            return data;
        },
    });
    return query;
};