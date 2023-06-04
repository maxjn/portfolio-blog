"use client";

import { layoutProp } from "@/utils/types";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: layoutProp) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
