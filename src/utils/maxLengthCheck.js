/**
 *
 * @param {*} e for value
 */

export const maxLengthCheck = (e) => {
	if (e.target.value.length > e.target.maxLength) {
		e.target.value = e.target.value.slice(0, e.target.maxLength);
	}
};
