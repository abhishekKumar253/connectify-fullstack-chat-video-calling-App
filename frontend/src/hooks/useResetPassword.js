import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword } from "../lib/api";

const useResetPassword = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, resetPasswordMutation: mutate };
};

export default useResetPassword;
