interface StatusMessagesProps {
  loading: boolean
  message: string
}

export function StatusMessages({ loading, message }: StatusMessagesProps) {
  return (
    <>
      {message && <p className="status-message">{message}</p>}
      {loading && <p className="status-message">Carregando...</p>}
    </>
  )
}
