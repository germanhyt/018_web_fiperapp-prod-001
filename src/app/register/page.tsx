"use client";

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

    const responseAPI = await res.json();
    console.log("responseAPI", responseAPI);

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      return;
    }
    router.push("/operations");
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center w-full sm:min-w-[500px] mx-auto my-20">
      <h1 className="font-bold text-xl">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
