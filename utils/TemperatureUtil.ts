export const getTemperature = async () => {
  const geoRes = await fetch("http://ip-api.com/json/")

  const geo = await geoRes.json()

  const latitude = geo?.lat
  const longitude = geo?.lon

  if (typeof latitude !== "number" || typeof longitude !== "number") {
    throw new Error("No coords from IP API")
  }

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
  )

  const data = await res.json()

  return data?.current?.temperature_2m ?? null
}