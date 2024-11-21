import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType ,InferResponseType} from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

export const useLogin = () => { 
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>(
        {
            mutationFn: async ({ json }) => {
                const response = await client.api.auth.login["$post"]({ json });
                if (!response.ok) {
                    throw new Error("Invalid credentials");
                }
                return await response.json();
            },
            onSuccess: () => {
                toast.success("Logged in!");
                window.location.reload();
                queryClient.invalidateQueries({ queryKey: ["current"] });
            },
            onError: (error) => {
                toast.error(error.message);
            },

        }
    )
    return mutation;
}