"use client";

import React from "react";
import { layoutProp } from "@/utils/types";

const AuthProvider = ({ children }: layoutProp) => {
  return { children };
};

export default AuthProvider;
