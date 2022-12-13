/**
 * Truncate title and description
 * @param {*} string = characters
 * @param {*} n = limited number of characters
 * @returns
 */

export const truncate = (string, n) => {
	return string?.length > n ? string.substr(0, n - 1) + "..." : string;
};
