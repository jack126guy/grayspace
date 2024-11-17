export function getObjectKeys<T>(keysEnum: {
	[K in keyof Required<T>]: true;
}): (keyof T)[] {
	return Object.keys(keysEnum) as (keyof T)[];
}
