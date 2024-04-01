import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as UserService from "../../services/UserService";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const FormLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const mutation = useMutationHooks((data) => UserService.loginUser(data));

  // const { data, isSuccess } = mutation;

  // console.log(mutation);

  const handleLogin = async () => {
    try {
      const data = await UserService.loginUser({ email, password });
      if (data?.status === "ERROR") {
        setError(data?.message);
      } else {
        navigate("/");
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(data?.refresh_token)
        );
        if (data?.access_token) {
          const decoded = jwtDecode(data?.access_token);
          if (decoded?.id) {
            await handleGetDetailsUser(decoded?.id, data?.access_token);
          }
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);

      setError("An error occurred. Please try again.");
    }
  };

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateRegister = () => {
    navigate("/register");
  };

  // const handleLogin = () => {
  //   mutation.mutate({
  //     email,
  //     password,
  //   });
  // };

  // useEffect(() => {
  //   if (isSuccess && data) {
  //     if (data?.status === "ERROR") {
  //       console.error(data?.message);
  //     } else {
  //       navigate("/");
  //       localStorage.setItem(
  //         "access_token",
  //         JSON.stringify(data?.access_token)
  //       );
  //       localStorage.setItem(
  //         "refresh_token",
  //         JSON.stringify(data?.refresh_token)
  //       );
  //       if (data?.access_token) {
  //         const decoded = jwtDecode(data?.access_token);
  //         if (decoded?.id) {
  //           handleGetDetailsUser(decoded?.id, data?.access_token);
  //         }
  //       }
  //     }
  //   }
  // }, [isSuccess, data]);

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="bg-primaryBG py-12 xl:px-28 px-4">
      <form className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md">
        <h3 className="title">ACCESS YOUR ACCOUNT</h3>
        <div className="w-full flex flex-col">
          <div>
            <input
              value={email}
              onChange={handleOnchangeEmail}
              type="email"
              placeholder="Email address"
              autoComplete="email"
              autoFocus
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
          <div className="relative">
            <span
              className="z-10 absolute top-4 right-8"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            <input
              value={password}
              onChange={handleOnchangePassword}
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="password"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center">
            <input type="checkbox" className="w-4 h-4 mr-2" />
            <p className="text-sm font-medium cursor-pointer">Remember me</p>
          </div>
          <p className="text-sm font-medium whitespace-nowrap cursor-pointer hover:underline hover:underline-offset-2">
            Forgot your password?
          </p>
        </div>

        <div className="w-full flex flex-col my-4">
          <button
            onClick={handleLogin}
            disabled={!email.length || !password.length}
            className="bg-dark-button  disabled:bg-gray-400 disabled:cursor-no-drop"
          >
            Log in
          </button>
        </div>

        {/* Hiển thị thông báo lỗi */}
        {error && (
          <span style={{ color: "red" }}>{error}</span>
        )}

        <div className="w-full flex items-center justify-center relative py-2">
          <div className="w-full h-[1px] bg-black"></div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm cursor-pointer">
            Need an account ?
            <span
              onClick={handleNavigateRegister}
              className="text-sm font-medium cursor-pointer hover:underline hover:underline-offset-2"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default FormLogin;
