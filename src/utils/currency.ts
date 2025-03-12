
const currencyFormatter = (value: number | null) => value !== null ? `$${value}` : "N/A";

export default currencyFormatter;