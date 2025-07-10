import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword } from "../lib/api";

const useForgotPassword = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, forgotPasswordMutation: mutate };
};

export default useForgotPassword;
