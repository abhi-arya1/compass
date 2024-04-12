"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import { FileSystemType } from "@/lib/types";
import { Path } from "@/lib/paths";

export default function Home() {
  const [pathFiles, setPathFiles] = useState<FileSystemType | undefined>(undefined)

  useEffect(() => {
    invoke<[string[], string[]]>('list_files_in_directory', { path: '/Users/ashwa/Desktop' })
      .then(([files, directories]) => {
        setPathFiles({
          files: files.map(file => new Path(file)),
          directories: directories.map(directory => new Path(directory, true))
        });
      })
      .catch(console.error);
  }, []);


  return (
      <div 
        className="flex flex-col z-10 h-dvh w-full justify-between"
      >
        <div className="fixed top-3 right-3">
          <ModeToggle />
        </div>
        <Sidebar 
          files={pathFiles?.files || []}
          directories={pathFiles?.directories || []} 
        />
      </div>
  );
}
