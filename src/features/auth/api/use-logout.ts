
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType} from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>(
        {
            mutationFn: async () => {
                const response = await client.api.auth.logout["$post"]();
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return await response.json();
            },
            onSuccess: () => {
                toast.success("Logged out!");
                window.location.reload();
                queryClient.invalidateQueries({ queryKey: ["current"] });
                queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    )  

    return mutation;
}