export async function handleDownload(
  apiUrl: string,
  filename = 'ficheiro.xlsx'
) {
  const api = useApi()
  const blob = await api<Blob>(apiUrl, {
    responseType: 'blob'
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
