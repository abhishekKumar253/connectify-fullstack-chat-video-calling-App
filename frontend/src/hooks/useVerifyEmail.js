import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmail } from "../lib/api";

const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { isPending, error, verifyEmailMutation: mutate };
};

export default useVerifyEmail;