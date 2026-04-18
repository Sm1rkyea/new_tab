import { createServerFn } from "@tanstack/react-start"

let cached: { value: number; at: number } | null = null

export const getTemperature = createServerFn().handler(async () => {
  if (cached && Date.now() - cached.at < 10 * 60 * 1000) {
    return cached.value
  }

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
  const value = data?.current?.temperature_2m ?? null

  cached = { value, at: Date.now() }

  return value
})
