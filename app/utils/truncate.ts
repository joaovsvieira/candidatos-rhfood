export const truncate = (text: string, limit: number) => {
  if (!text) return ''

  if (text.length <= limit) return text

  return text.substring(0, limit).trimEnd() + '...'
}
