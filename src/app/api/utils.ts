export function isValidObjectId(str: string) {
	const pattern = /^[0-9a-fA-F]{24}$/;
	return pattern.test(str);
}
