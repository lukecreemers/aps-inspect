import type { UserResponse, UserRoleType } from "@aps/shared-types";
import { useUser } from "../../app/providers/UserProvider";
import { useNavigate } from "react-router-dom";

const defaultAdmin: UserResponse = {
  id: "1",
  email: "admin@example.com",
  role: "ADMIN",
};

const defaultClient: UserResponse = {
  id: "2",
  email: "client@example.com",
  role: "CLIENT",
};

export function LoginPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  function login(user: UserResponse) {
    setUser(user);
    navigate("/app/" + user.role);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Login</h1>
      <button onClick={() => login(defaultAdmin)}>Login as Admin</button>
      <button onClick={() => login(defaultClient)}>Login as Client</button>
    </div>
  );
}
