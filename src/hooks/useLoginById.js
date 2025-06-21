import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useLoginById() {
  return useMutation({
    mutationFn: async (nationalId) => {
      const { data } = await axios.get(
        `https://diagnosys-backend-nine.vercel.app/patient/info/${nationalId}`
      );
      return data;
    },

    onSuccess: (data) => {
      toast.success(data?.message || "Login successful!");
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });
}
