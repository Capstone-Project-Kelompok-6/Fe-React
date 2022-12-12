export const formatPrice = (number) => {
	return `Rp ${new Intl.NumberFormat("ID").format(number)}`;
};
