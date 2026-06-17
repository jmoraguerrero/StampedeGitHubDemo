interface HDLSConnectionStatusProps {
  isLoading: boolean;
  error: string | null;
}

export function HDLSConnectionStatus({
  isLoading,
  error
}: HDLSConnectionStatusProps) {
  if (isLoading) {
    return <div className="hdls-status hdls-status-loading">Agent is thinking...</div>;
  }

  if (error) {
    return <div className="hdls-status hdls-status-error">{error}</div>;
  }

  return <div className="hdls-status hdls-status-ready">Connected</div>;
}
