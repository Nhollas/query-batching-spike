export async function POST() {
  const delay = Math.floor(Math.random() * 5000)
  await new Promise((resolve) => setTimeout(resolve, delay))

  // Simulate 30% error rate
  if (Math.random() < 0.3) {
    return Response.json({ id: crypto.randomUUID() }, { status: 400 })
  }

  return Response.json({ id: crypto.randomUUID() })
}
