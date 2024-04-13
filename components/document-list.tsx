import Folder from "./folder";
import { invoke } from "@tauri-apps/api/tauri";
import { Path } from "@/lib/paths";
import { useState } from "react";
import { FileText } from "lucide-react";
import { open } from "@tauri-apps/api/shell";

interface ExpandedElement { 
    path: Path
    files: string[]
    directories: string[]
}

interface DocumentListParams {
    directories: Path[]
    files: Path[]
    level: number
    _onDoubleClick: (path: Path) => void
}

const DocumentList = (
    {directories, files, level, _onDoubleClick} : DocumentListParams
) => {
    const [expanded, setExpanded] = useState<ExpandedElement[]>([]); 

    const onDirectoryClick = (path: Path, status: boolean) => {
        if (status) {
            setExpanded(expanded.filter((element) => !element.path.isEqual(path)));
            return;
        } 
        invoke<[string[], string[]]>('list_files_in_directory', { path: path.getAbsolute() })
        .then(([files, directories]) => {
            setExpanded([...expanded, { path, files, directories }]);
        })
        .catch(console.error);
    }
    
    return ( 
        <>
            <div 
                className="text-sm"
                style={{
                    paddingLeft: level ? `${(level + 12)}px` : undefined,
                }}
            >
                {
                    directories.map((path, idx) => {
                        return ( 
                            <div key={idx} className="bg-neutral">
                                { path.getBaseName() !== ".git" &&
                                    <Folder  
                                        path={path} 
                                        onClick={onDirectoryClick}
                                        _onDoubleClick={_onDoubleClick}
                                    />
                                }
                                {
                                    expanded.find((element) => element.path.isEqual(path)) ? 
                                    <DocumentList 
                                        directories={expanded.find((element) => element.path.isEqual(path))?.directories.map(directory => new Path(directory, true)) || []} 
                                        files={expanded.find((element) => element.path.isEqual(path))?.files.map(file => new Path(file)) || []}
                                        level={level + 1}
                                        _onDoubleClick={_onDoubleClick}
                                    /> 
                                    : 
                                    null
                                }
                            </div>
                        ) 
                    })
                }
            </div>

            <div 
                className="text-sm"
                style={{
                    paddingLeft: level ? `${(level + 12)}px` : undefined
                }}
            >
                {
                    files.map((path, idx) => {
                        return (
                            path.getBaseName() === ".DS_Store" || path.getBaseName() === '.localized' ? null :
                            <div 
                                key={idx} 
                                role="button" 
                                className="group py-[0.7px] pl-1 transition-all items-center hover:text-muted-foreground flex flex-row gap-x-1"
                                onClick={() => open(path.getAbsolute())}
                            >
                                <FileText className="h-4 w-4 text-muted-foreground" /><span>{path.getBaseName()}</span>
                            </div>
                        )
                    })
                }
            </div>
        </>
     );
}
 
export default DocumentList;