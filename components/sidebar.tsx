"use client";

import { FileSystemType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Folder from "./folder"
import { ElementRef, useRef, useState, useEffect } from "react";
import DocumentList from "./document-list";
import { Path } from "@/lib/paths";

interface SidebarProps {
    files: FileSystemType["files"]
    directories: FileSystemType["directories"]
    _onDoubleClick: (path: Path) => void
}

const Sidebar = ({
    files, 
    directories,
    _onDoubleClick
}: SidebarProps) => {
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        resetWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const resetWidth = () => {
        if (sidebarRef.current) {
            setIsResetting(true);
            sidebarRef.current.style.width = "240px";
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full p-2 bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300")}
            >

                <DocumentList
                    files={files}
                    directories={directories}
                    level={0}
                    _onDoubleClick={_onDoubleClick}
                />
                
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100
            transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                />

            </aside>
        </>
    );
}
 
export default Sidebar;