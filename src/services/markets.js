const url = 'https://api.coincap.io/v2'

export const getMarkets = coin =>
  fetch(`${url}/assets/${coin}/markets?limit=5`)
    .then(res => res.json())
    .then(res => res.data)

export const getExchange = id =>
  fetch(`${url}/exchanges/${id}`)
    .then(res => res.json())
    .then(res => res.data)
