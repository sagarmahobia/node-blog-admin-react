import {useMutation} from "@tanstack/react-query";
import {login} from "../../network/NetworkService";


const loginKey = "login";

export const useLogin = (
    onSuccess: () => void
) => {
    return useMutation(
        {
            mutationKey: [loginKey],
            mutationFn: (input: {
                email: string,
                password: string
            }) => {
                return login(input.email, input.password);
            },
            onSuccess: (data: any) => {
                localStorage.setItem("token", data.token);
                onSuccess();
            }
        }
    )
}
