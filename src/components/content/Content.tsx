"use client";

import { useRef, useEffect } from "react";
import { ContentProps } from "@/utils/types";

const Content = ({ content }: ContentProps) => {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!ref.current) throw Error("ref is not assigned");

    // Now ref.current is sure to be HTMLDivElement
    ref.current.innerHTML = content;
  }, []);

  return <div ref={ref}>Content</div>;
};

export default Content;
