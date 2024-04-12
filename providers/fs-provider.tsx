"use client";

import { readDir } from "@tauri-apps/api/fs"
import { createContext, useContext } from "react";

interface FSContextType {
    readRootDirectory: () => any;
}

const defaultFSValue: FSContextType = { 
    readRootDirectory: () => {},
}


const FileSystem = createContext(defaultFSValue);

export const FileSystemProvider = ({ children }: any) => {

    async function readRootDirectory() {
        try {
          const path = '/Users/ashwa/Desktop';
      
          const files = await readDir(path);
          console.log('Files and directories in the root directory:', files);
        } catch (err) {
          console.error('Error reading the root directory:', err);
        }
      }


    return (
        <FileSystem.Provider value={{ readRootDirectory }}>
            {children}
        </FileSystem.Provider>
    );

}

export const useFiles = () => useContext(FileSystem);