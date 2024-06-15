"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { GoTriangleDown } from "react-icons/go";
import { useState } from "react";
import { FaHamburger } from "react-icons/fa";

const Navbar = () => {
  const { data: session } = useSession();

  const [btnsession, setBtnSession] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const openViewSession = (): void => {
    setBtnSession(!btnsession);
  };

  const openMainMenu = (): void => {
    setShowMenuMobile(!showMenuMobile);
  };

  return (
    <div className="bg-green-700 shadow-xl relative">
      <nav className="container mx-auto py-6 flex justify-between items-center ">
        <div>
          <Link href="/">
            <Image
              src="/myfiper.ico"
              alt="Vercel Logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        {/* Main Options Desktop */}
        <div className="hidden sm:block">
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
              <div className="mx-auto w-32 flex flex-col justify-center">
                {session ? (
                  <>
                    <a className="rounded-sm bg-red-500 text-white flex justify-center">
                      <button onClick={() => signOut()}>Logout</button>
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="rounded-sm bg-blue-500 text-white flex justify-center "
                    >
                      Login
                    </a>
                  </>
                )}
              </div>
            </li>
            <li className="relative">
              <button id="btnToggle" type="button" onClick={openViewSession}>
                <GoTriangleDown />
              </button>
              {btnsession && (
                <>
                  <div className="min-w-[200px] absolute top-5 right-0 bg-white border-2 border-black-600 text-black px-2 py-1 rounded-md">
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
                              user:
                              <span className="font-bold break-all">
                                {session.user.email}
                              </span>
                            </div>
                            {session.user.name && (
                              <div className="flex gap-1">
                                Name:
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
            </li>
          </ul>
        </div>
        {/* Main Options Mobile */}
        <div className="block sm:hidden ">
          <div onClick={openMainMenu} className="flex sm:hidden">
            <FaHamburger className="text-white text-3xl" />
          </div>
          {showMenuMobile && (
            <div className="absolute top-24 right-0 bg-green-700 px-10 py-5 rounded-sm min-h-[90vh] min-w-[100vw]">
              <ul className="flex flex-col justify-center gap-4 text-white">
                <li
                  onClick={openMainMenu}
                  className="font-semibold text-white hover:text-black"
                >
                  <Link href="/">Home</Link>
                </li>
                <li
                  onClick={openMainMenu}
                  className="font-semibold text-white hover:text-black"
                >
                  <Link href="/operations">Operaciones</Link>
                </li>
                <li
                  onClick={openMainMenu}
                  className="font-semibold text-white hover:text-black"
                >
                  <Link href="/new">Nueva Operación</Link>
                </li>
                <li
                  onClick={openMainMenu}
                  className="font-semibold text-white hover:text-black"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <div className=" w-32 flex flex-col justify-center">
                    {session ? (
                      <>
                        <a className="rounded-sm bg-red-500 text-white flex justify-center">
                          <button onClick={() => signOut()}>Logout</button>
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href="/login"
                          className="rounded-sm bg-blue-500 text-white flex justify-center "
                        >
                          Login
                        </a>
                      </>
                    )}
                  </div>
                </li>
                <li className="py-5">
                  <div className="min-w-[200px] bg-white border-2 border-black-600 text-black px-2 py-1 rounded-md">
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
                              user:
                              <span className="font-bold break-all">
                                {session.user.email}
                              </span>
                            </div>
                            {session.user.name && (
                              <div className="flex gap-1">
                                Name:
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
                        <div className="text-center">
                          No se ha iniciado Sesión
                        </div>
                      </>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
