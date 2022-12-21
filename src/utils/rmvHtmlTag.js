/**
 *
 * @param {*} e for value there are blocker from inputed
 */

export const handleKeyDown = (e) => {
	if (e.key === "<" || e.key === ">") {
		e.preventDefault();
	}
};
