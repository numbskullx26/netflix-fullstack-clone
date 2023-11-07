import { useCallback, useState } from "react";
import Input from "../components/input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("Login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "Login" ? "Register" : "Login"
    );
  }, []);

  const Login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error) {
      console.log("error");
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      Login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, Login]);

  // const register = useCallback(async () => {
  //   try {
  //     await axios.post("/api/register", {
  //       email,
  //       name,
  //       password,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-fixed bg-no-repeat bg-cover bg-center">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="netflix-logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-50 px-10 py-10 self-center mt-2 lg:max-w-md rounded-nd w-full">
            <h2 className="text-white text-4xl font-semibold mb-8">
              {variant === "Login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "Register" && (
                <Input
                  id="username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  value={name}
                  label="Username"
                />
              )}
              <Input
                id="email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                value={email}
                label="Email"
              />

              <Input
                id="password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                value={password}
                label="Password"
              />
            </div>

            <button
              onClick={variant === "Login" ? Login : register}
              className="bg-red-600 text-white rounded-md w-full mt-10 hover:bg-red-700 transition py-4"
            >
              {variant === "Login" ? "Login" : "Sign Up"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 ">
              {variant === "Register"
                ? "Already have an account?"
                : "First time using Netflix?"}
              <span
                onClick={toggleVariant}
                className="text-white hover:underline cursor-pointer ml-4"
              >
                {variant === "Register" ? "Sign In" : "Create an account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
