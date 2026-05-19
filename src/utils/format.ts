export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function today() {
  return new Date().toISOString().slice(0, 10)
}
