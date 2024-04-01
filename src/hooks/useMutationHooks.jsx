import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: async (...args) => {
      try {
        return await fnCallback(...args);
      } catch (error) {
        console.error("Error in useMutationHooks:", error);
        throw error;
      }
    },
  });
  return mutation;
};
