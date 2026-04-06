const DEFAULT_CURRENCY = "INR";
const DEFAULT_LOCALE = "en-IN";

function formatIndianNumber(value: number): string {
  const absoluteValue = Math.abs(value);
  const [integerPart, decimalPart] = absoluteValue.toFixed(2).split(".");

  if (integerPart.length <= 3) {
    return `${value < 0 ? "-" : ""}${integerPart}.${decimalPart}`;
  }

  const lastThreeDigits = integerPart.slice(-3);
  const remainingDigits = integerPart.slice(0, -3);
  const groupedRemaining = remainingDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

  return `${value < 0 ? "-" : ""}${groupedRemaining},${lastThreeDigits}.${decimalPart}`;
}

export function formatCurrency(value: number, currency: string = DEFAULT_CURRENCY): string {
  const numericValue = Number(value);
  const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
  const safeCurrency = currency?.trim() ? currency.trim().toUpperCase() : DEFAULT_CURRENCY;

  try {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: "currency",
      currency: safeCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safeValue);
  } catch {
    const fallbackSymbol = safeCurrency === DEFAULT_CURRENCY ? "\u20B9" : `${safeCurrency} `;
    return `${fallbackSymbol}${formatIndianNumber(safeValue)}`;
  }
}
