import { useNavigate } from "react-router-dom";
import { useCurrentUser, useLogin } from "./auth.hooks";
import { useEffect, useState } from "react";
import LoginInput from "./components/LoginInput";
import logo from "../../assets/aps-logo.png";
import PrimaryButton from "../../components/PrimaryButton";

export function LoginPage() {
  const navigate = useNavigate();
  const {
    mutate: loginMutation,
    isPending,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
    reset: resetLogin,
  } = useLogin();
  const { data: currentUser } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/app/" + currentUser.role.toLowerCase());
    }
  }, [currentUser, navigate]);

  function handleLogin() {
    let hasError = false;
    if (!email) {
      setEmailError(true);
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }
    if (hasError) return;

    loginMutation({ email, password });
  }

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailError) setEmailError(false);
    if (isLoginError) resetLogin();
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (passwordError) setPasswordError(false);
    if (isLoginError) resetLogin();
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col items-center w-80 gap-6">
        <img src={logo} alt="logo" className="w-40 " />
        <div className="flex flex-col gap-6 mt-6 w-full">
          <LoginInput
            label="Email"
            placeholder="Email"
            value={email}
            type="text"
            onChange={handleEmailChange}
            isError={emailError || isLoginError}
            errorMessage={(emailError && "Email is required") || undefined}
          />
          <LoginInput
            label="Password"
            placeholder="Password"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            isError={passwordError || isLoginError}
            errorMessage={
              passwordError
                ? "Password is required"
                : "Invalid email or password"
            }
          />
          <div className="pt-5">
            <PrimaryButton
              label="Login"
              onClick={handleLogin}
              isLoading={isPending || isLoginSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
