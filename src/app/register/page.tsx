"use client";

import { notificationError, notificationInfo } from "@/core/helpers";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    if (!name || !email || !password) {
      setErrors(["Todos los campos son requeridos"]);
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseAPI = await res?.json();
    console.log("responseAPI", responseAPI);

    if (!responseAPI.ok) {
      notificationError(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!responseNextAuth?.ok) {
      notificationError(responseNextAuth?.error ?? "");
      return;
    }

    notificationInfo("Registrado correctamente");
    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center  w-4/5 sm:max-w-[450px] px-10 py-5 mx-auto my-20 border-2 border-black shadow-lg">
      <h1 className="font-bold text-xl">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
        method="POST"
      >
        <input
          type="text"
          placeholder="german"
          name="name"
          className="border-2 border-black rounded-md px-2 mb-2"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
          className="px-2 py-1 rounded-lg bg-green-500 text-white"
        >
          Register
        </button>
      </form>

      <button
        type="button"
        onClick={() => signIn("google")}
        className="bg-green-600 text-white rounded p-2 flex items-center gap-2"
      >
        <FaGoogle />
        Sign in google
      </button>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default RegisterPage;
