"use client";
import {
  notificationError,
  notificationInfo,
} from "@/core/helpers/NotificationHelper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      notificationError(responseNextAuth.error);
      return;
    }

    router.push("/");
    // notificationInfo(`Welcome to MyFiperApp ${email}`);
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center w-4/5 sm:max-w-[450px] px-10 py-5 mx-auto my-20 border-2 border-black shadow-lg">
      <h1 className="font-bold text-xl">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="german@german.com"
          name="email"
          className="border-2 border-black rounded-md px-2 mb-2"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="german"
          name="password"
          className="border-2 border-black rounded-md px-2 mb-2"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="px-2 py-1 rounded-lg bg-green-600 text-white"
        >
          Login
        </button>
        <a
          href="/register"
          className="px-2 py-1 rounded-lg bg-blue-500 text-white flex justify-center"
        >
          Register
        </a>
      </form>

      <button
        type="button"
        onClick={() => signIn("google")}
        className="bg-green-600 text-white rounded p-2 flex items-center gap-2"
      >
        <FaGoogle />
        Sign in google
      </button>
    </div>
  );
};
export default LoginPage;
