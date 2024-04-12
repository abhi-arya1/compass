import { Path } from "@/lib/paths";
import { ChevronDown, ChevronRight, FolderIcon } from "lucide-react";
import { useState } from "react";

interface FolderProps { 
    path: Path
}

const Folder = ({ path }: FolderProps) => {
    const [expanded, setExpanded] = useState(false); 
    
    const handleOnClick = () => {
        setExpanded(!expanded); 
    }


    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return ( 
        <div 
            className="group py-[0.7px] pl-1 transition-all items-center hover:text-muted-foreground flex flex-row gap-x-1" 
            role="button"
            onClick={handleOnClick}
        >
            <FolderIcon className="h-[0.8rem] w-[0.8rem]"/>
            <span>{path.getBaseName()}</span>
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50 opacity-0 group-hover:opacity-100" />
        </div>
     );
}
 
export default Folder;