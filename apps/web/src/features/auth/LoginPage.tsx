import type { LoginDto } from "@aps/shared-types";
import { useNavigate } from "react-router-dom";
import { useCurrentUser, useLogin } from "./auth.hooks";
import { useEffect, useState } from "react";
import LoginInput from "./components/LoginInput";
import logo from "../../assets/aps-logo.png";

export function LoginPage() {
  const navigate = useNavigate();
  const { mutate: loginMutation } = useLogin();
  const { data: currentUser } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/app/" + currentUser.role.toLowerCase());
    }
  }, [currentUser, navigate]);

  function login(dto: LoginDto) {
    loginMutation(dto);
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center w-80 gap-6">
        <img src={logo} alt="logo" className="w-40 " />
        <form
          className="flex flex-col gap-4 mt-6 w-full"
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
          <LoginInput
            label="Email"
            placeholder="Email"
            value={email}
            type="text"
            onChange={setEmail}
          />
          <LoginInput
            label="Password"
            placeholder="Password"
            value={password}
            type="password"
            onChange={setPassword}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
