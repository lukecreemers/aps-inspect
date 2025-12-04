import type { LoginDto } from "@aps/shared-types";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { useCurrentUser, useLogin } from "./auth.hooks";
import { useEffect } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const { mutate: loginMutation } = useLogin();
  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      navigate("/app/" + currentUser.role.toLowerCase());
    }
  }, [currentUser, navigate]);

  function login(dto: LoginDto) {
    loginMutation(dto);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Login</h1>
      <form
        className="flex flex-col gap-4 mt-6 max-w-xs"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const email = (form.elements.namedItem("email") as HTMLInputElement)
            .value;
          const password = (
            form.elements.namedItem("password") as HTMLInputElement
          ).value;
          login({ email, password });
        }}
      >
        <label className="flex flex-col text-sm font-medium gap-1">
          Email
          <input
            type="email"
            name="email"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="your@email.com"
            required
            autoComplete="email"
          />
        </label>
        <label className="flex flex-col text-sm font-medium gap-1">
          Password
          <input
            type="password"
            name="password"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="********"
            required
            autoComplete="current-password"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
