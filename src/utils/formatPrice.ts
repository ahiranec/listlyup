export function formatPrice(
  amount?: number | string | null,
  currency: string = "CLP"
): string {
  if (amount === undefined || amount === null || amount === "") return "";

  const numeric = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numeric)) return "";

  // Usamos siempre 'es-CL' para forzar que el separador de miles siempre sea un punto (ej: 1.000.000)
  // en vez de que cambie a comas si es USD.
  const formattedNumber = new Intl.NumberFormat('es-CL', {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numeric);

  return `$${formattedNumber} ${currency}`;
}
