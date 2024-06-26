import { fileURLToPath } from 'node:url';

export function resolveRelativePath(
	path: string,
	fileUrlBase: URL | string
): string {
	return fileURLToPath(new URL(path, fileUrlBase));
}
