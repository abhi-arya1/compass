"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import { FileSystemType } from "@/lib/types";
import { Path } from "@/lib/paths";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const UI_DELAY = 120;

export default function Home() {
  const [pathFiles, setPathFiles] = useState<FileSystemType | undefined>(undefined)
  const [curPath, setCurPath] = useState<Path>(new Path('/Users/ashwa'))

  const getPathFiles = (path: Path) => {
    invoke<[string[], string[]]>('list_files_in_directory', { path: path.getAbsolute() })
      .then(([files, directories]) => {
        console.log(path)
        setCurPath(path);
        setPathFiles({
          files: files.map(file => new Path(file)),
          directories: directories.map(directory => new Path(directory, true))
        });
      })
      .catch(console.error);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(`Key pressed: ${event.key}`);
    event.preventDefault();
    event.stopPropagation();
    setTimeout(() => {
      if (event.key === 'Enter') {
        getPathFiles(pathFiles?.directories[0] || new Path('/Users/ashwa'));
      }
      if (event.key === 'Tab') {
        getPathFiles(new Path(curPath.getParent()) || new Path('/Users/ashwa'));
      }
    }, UI_DELAY)
  };

  //appWindow.listen('keydown', handleKeyDown);

  useEffect(() => {
    getPathFiles(curPath);

    // return () => {
    //   document.removeEventListener('keydown', handleKeyDown);
    // };
  }, []);

  return (
      <div 
        className="flex flex-row z-10 h-dvh w-full"
      >
        <div className="fixed top-3 right-3">
          <ModeToggle />
        </div>

        <Sidebar 
          files={pathFiles?.files || []}
          directories={pathFiles?.directories || []} 
          _onDoubleClick={getPathFiles}
        />

        <Breadcrumb className="pl-2 pt-1">
        <BreadcrumbList>
          {
            curPath.getSegments().map((segment, idx) => {
              return (
                <>
                  <BreadcrumbItem key={idx}>
                    <BreadcrumbLink 
                      role="button" 
                      onClick={() => {getPathFiles(segment)}}
                      >
                        {idx === 0 && '/'}{segment.getBaseName()}
                      </BreadcrumbLink>
                  </BreadcrumbItem>
                  
                  {idx !== curPath.getSegments().length - 1 && <BreadcrumbSeparator />}
                </>
              )
            })
          }
        </BreadcrumbList>
        </Breadcrumb>
      </div>
  );
}
