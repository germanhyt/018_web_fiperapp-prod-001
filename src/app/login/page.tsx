"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("response", responseNextAuth);
    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }

    router.push("/operations");
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center w-full sm:min-w-[500px] mx-auto my-20">
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
        onClick={() => signIn("google")}
        className="bg-green-600 text-white rounded p-2 flex items-center gap-2"
      >
        <FaGoogle />
        Sign in google
      </button>

      {errors.length > 0 && (
        <div className="rounded-lg border-2 min-w-[500px] border-black bg-red-500 px-2 py-1 mt-2 ">
          <ul className="mb-0">
            {errors.map((error) => (
              <li className="" key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default LoginPage;
