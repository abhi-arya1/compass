"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Landing from "@/components/landing";
import { useFiles } from "@/providers/fs-provider";
import { useEffect } from "react";

export default function Home() {
  const fileSystem = useFiles(); 

  useEffect(() => {
    fileSystem.readRootDirectory();
  }, [])

  return (
      <div 
        className="flex font-varela flex-col z-10 p-3 w-full items-center justify-center"
      >
        <div className="fixed top-3 right-3">
          <ModeToggle />
        </div>
        <Landing />
      </div>
  );
}
