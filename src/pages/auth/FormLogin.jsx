import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser, getUser } from "../../services/UserService";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/useSlides";

const FormLogin = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const data = {
    email,
    password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser(data);
    if (res.status === "OK") {
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(res.access_token));
      if (res?.access_token) {
        const decoded = jwtDecode(res?.access_token);
        if (decoded?.id) {
          const data = await getUser(decoded?.id, res?.access_token);
          dispatch(
            updateUser({ ...data?.data, access_token: res?.access_token })
          );
        }
      }
    } else {
      alert("Error: " + res.message);
    }
  };

  return (
    <section className="bg-primaryBG py-12 xl:px-28 px-4">
      <form className="max-w-[555px] h-auto bg-white m-auto mt-32 px-14 py-10 rounded-md">
        <h3 className="title">ACCESS YOUR ACCOUNT</h3>
        <div className="w-full flex flex-col">
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="w-full flex items-center justify-center relative py-2">
          <div className="w-full h-[1px] bg-black"></div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm cursor-pointer">
            Need an account ?
            <a
              href="/register"
              className="text-sm font-medium cursor-pointer hover:underline hover:underline-offset-2"
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </section>
  );
};

export default FormLogin;
