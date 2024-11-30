
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType} from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const router = useRouter();
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
                router.refresh();
                queryClient.invalidateQueries();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        }
    )  

    return mutation;
}