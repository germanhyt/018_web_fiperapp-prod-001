"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function BtnAuthExample() {
  const { data: session, status } = useSession();

  console.log("session ", session);
  console.log("status ", status);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button
          onClick={() => signOut()}
          className="px-2 py-1 bg-red-600 text-white rounded-xl"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in
      <br />
      <button
        onClick={() => signIn()}
        className="px-2 py-1 bg-green-600 text-white rounded-lg"
      >
        Sign in
      </button>
    </>
  );
}
