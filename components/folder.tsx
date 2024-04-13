import { Path } from "@/lib/paths";
import { invoke } from "@tauri-apps/api/tauri";
import { ChevronDown, ChevronRight, FolderIcon } from "lucide-react";
import { useState } from "react";

interface FolderProps { 
    path: Path
    onClick: (path: Path, status: boolean) => void
    _onDoubleClick: (path: Path) => void    
}

const Folder = ({ path, onClick, _onDoubleClick }: FolderProps) => {
    const [expanded, setExpanded] = useState(false); 
    
    const handleOnClick = () => {
        setExpanded(!expanded)
        onClick(path, expanded);
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return ( 
        <div 
            className="group py-[0.7px] pl-1 transition-all items-center hover:text-muted-foreground flex flex-row gap-x-1" 
            role="button"
            onClick={handleOnClick}
            onDoubleClick={() => _onDoubleClick(path)}
            onDrag={() => _onDoubleClick(path)}
        >
            <FolderIcon className="h-4 w-4"/>
            <span>{path.getBaseName()}</span>
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50 opacity-0 group-hover:opacity-100" />
        </div>
     );
}
 
export default Folder;