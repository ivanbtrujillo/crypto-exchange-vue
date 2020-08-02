export const percentFilter = value => {
  if (!value) return '0%'
  return `${Number(value).toFixed(2)}%`
}
