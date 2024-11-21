
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/rpc';

interface usegetProjectsProps{
    workspaceId: string
}

export const usegetProjects = ({ workspaceId }: usegetProjectsProps) => {
    const query = useQuery({
        queryKey: ["projects", workspaceId],
        queryFn: async () => {
            const response = await client.api.projects.$get({
                query: {workspaceId}
            });

            if (!response.ok) {
                throw new Error("Failed to fetch Projects");
            }
            const { data } = await response.json();
            return data;
        },
    });
    return query;
};