import type { LoginDto } from "@aps/shared-types";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { useCurrentUser, useLogin } from "./auth.hooks";
import { useEffect } from "react";

const defaultAdmin: LoginDto = {
  email: "l.l.creemers@gmail.com",
  password: "wiqmyk-5jedSu-foqbyk",
};

const defaultClient: LoginDto = {
  email: "client@example.com",
  password: "client",
};

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
      <Home className="w-10 h-10" />
      <button onClick={() => login(defaultAdmin)}>Login as Admin</button>
      <button onClick={() => login(defaultClient)}>Login as Client</button>
    </div>
  );
}
