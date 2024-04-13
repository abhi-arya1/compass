export class Path {
    private path: string;
    private isDir: boolean;

    constructor(path: string, isDirectory?: boolean) {
        this.path = path;
        this.isDir = isDirectory || false;
    }

    getParent(): string {
        const segments = this.path.split('/');
        segments.pop();
        return segments.join('/') || '/';
    }

    getSegments(): Path[] { 
        const segments = this.path.split('/').filter(Boolean); 
        const pathSegments = segments.map((_, index, array) => 
        new Path('/' + array.slice(0, index + 1).join('/'))
        );

        return pathSegments;
    }

    getBaseName(): string {
        const segments = this.path.split('/');
        return segments.pop() || '';
    }

    getAbsolute(): string { 
        return this.path;
    }

    isAbsolute(): boolean {
        return this.path.startsWith('/');
    }

    isDirectory(): boolean {
        return this.isDir;
    }

    isEqual(other: Path): boolean { 
        return this.path === other.getAbsolute();
    }

    getChild(): Path {
        const segments = this.path.split('/').filter(Boolean);

        if (segments.length <= 1) {
            return this;
        }

        const childPath = '/' + segments.slice(0, 2).join('/');

        if (childPath === this.path) {
            return this;
        }
        
        return new Path(childPath, segments.length > 2);
    }

    static join(...paths: string[]): string {
        return paths.join('/').replace(/\/+/g, '/');
    }
}