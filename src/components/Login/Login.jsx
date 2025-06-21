import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginById } from "../../hooks/useLoginById";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useLoginById();

  function onSubmit({ nationalId }) {
    loginMutation.mutate(nationalId, {
      onSuccess: (data) => {
        if (data.success) {
          localStorage.setItem("patientData", JSON.stringify(data));
          navigate("/patient");
        } else {
          toast.error(data.message || "Login failed.");
        }
      },
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 px-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-bla">
          Patient Login
        </h2>
        <p className="text-gray-500 text-center mb-4">
          Please enter your National ID to view your medical data.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              National ID
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={15}
              {...register("nationalId", {
                required: "National ID is required",
                pattern: {
                  value: /^\d{14}$/,
                  message: "National ID must be exactly 14 digits",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your 14-digit National ID"
            />
            {errors.nationalId && (
              <p className="text-red-500 text-sm">
                {errors.nationalId.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-lg mt-4 transition-colors duration-200"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
