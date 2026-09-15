let fallbackCounter = 0

function fallbackId(): string {
  const time = Date.now().toString(16).padStart(10, '0').slice(-10)
  fallbackCounter = (fallbackCounter + 1) % 0xffff
  const counter = fallbackCounter.toString(16).padStart(2, '0')
  return `00000000-0000-4000-8000-${time}${counter}`
}

export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return fallbackId()
}
