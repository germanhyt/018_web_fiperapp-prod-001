"use client";

import Link from "next/link";
import { FaMousePointer } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-2/3 mx-auto mt-12 bg-green-600 py-4 rounded-lg">
        <h2 className="text-4xl text-white hover:text-black text-center font-bold">
          Mi app de finanzas personales (MyFiperApp)
        </h2>
      </div>
      <div className="flex justify-center">
        <span className="p-2.5 shadow-lg rounded-lg cursor-pointer">
          <Link href="/operations">
            <FaMousePointer className="w-9 h-9 text-xl text-black font-bold" />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
