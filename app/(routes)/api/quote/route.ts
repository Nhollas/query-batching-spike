export async function POST() {
  const delay = Math.floor(Math.random() * 5000) + 1000
  await new Promise((resolve) => setTimeout(resolve, delay))

  return Response.json({ id: crypto.randomUUID() })
}
