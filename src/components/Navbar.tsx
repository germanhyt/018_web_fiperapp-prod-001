"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { GoTriangleDown } from "react-icons/go";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();

  const [btnsession, setBtnSession] = useState(false);

  const openViewSession = (): void => {
    setBtnSession(!btnsession);
  };

  console.log(session);

  return (
    <div className="bg-green-700">
      <nav className="container mx-auto py-4 flex justify-between items-center ">
        <div>
          <Link href="/">
            <Image
              src="/myfiper.ico"
              alt="Vercel Logo"
              width={30}
              height={30}
            />
          </Link>
        </div>
        <div>
          <ul className="flex justify-between gap-2 text-white">
            <li className="font-semibold text-white hover:text-black">
              <Link href="/">Home</Link>
            </li>
            <li className="font-semibold text-white hover:text-black">
              <Link href="/operations">Operaciones</Link>
            </li>
            <li className="font-semibold text-white hover:text-black">
              <Link href="/new">Nueva Operación</Link>
            </li>
            <li className="font-semibold text-white hover:text-black">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              {session ? (
                <>
                  <div className="mx-auto w-32 flex flex-col justify-center">
                    {/* <BtnAuthExample /> */}
                    <a className="rounded-sm bg-red-500 text-white flex justify-center hover:scale-[1.1] transition-all duration-300">
                      <button onClick={() => signOut()}>LogOut</button>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="mx-auto w-32 flex flex-col justify-center">
                    {/* <BtnAuthExample /> */}
                    <a
                      href="/login"
                      className="rounded-sm bg-blue-500 text-white flex justify-center hover:scale-[1.1] transition-all duration-300"
                    >
                      LogIn
                    </a>
                  </div>
                </>
              )}
            </li>
            <div className="relative ">
              <button id="" type="button" onClick={openViewSession}>
                <GoTriangleDown />
              </button>
              {btnsession && (
                <>
                  <div className="min-w-[200px] absolute top-5 right-0 bg-white border-2 border-blue-600 text-black px-2 py-1 rounded-md">
                    {session ? (
                      <>
                        <div className="flex flex-col">
                          {session.user.image && (
                            <>
                              <Image
                                loader={() => {
                                  return session.user.image ?? "";
                                }}
                                src="image"
                                alt="Vercel Logo"
                                width={100}
                                height={100}
                                className="mx-auto"
                              />
                            </>
                          )}
                          <div>
                            <div className="flex gap-1">
                              user:{" "}
                              <span className="font-bold break-all">
                                {session.user.email}
                              </span>
                            </div>
                            {session.user.name && (
                              <div className="flex gap-1">
                                Name:{" "}
                                <span className="font-bold break-all">
                                  {session.user.name}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-center">Inicie Sesión</div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
