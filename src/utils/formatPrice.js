/**
 *
 * @param {*} number
 * @returns format price with rupiah currency
 */

export const formatPrice = (number) => {
	return `Rp ${new Intl.NumberFormat("ID").format(number)}`;
};
