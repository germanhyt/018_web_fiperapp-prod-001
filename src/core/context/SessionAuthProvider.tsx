"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

interface IProps {
  children: React.ReactNode;
}
const SessionAuthProvider = ({ children }: IProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionAuthProvider;

// Proveedor de Session
