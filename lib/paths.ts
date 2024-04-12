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
    getBaseName(): string {
        const segments = this.path.split('/');
        return segments.pop() || '';
    }

    isAbsolute(): boolean {
        return this.path.startsWith('/');
    }

    isDirectory(): boolean {
        return this.isDir;
    }

    static join(...paths: string[]): string {
        return paths.join('/').replace(/\/+/g, '/');
    }
}