interface HDLSAgentLauncherButtonProps {
  onClick: () => void;
}

export function HDLSAgentLauncherButton({
  onClick
}: HDLSAgentLauncherButtonProps) {
  return (
    <button className="hdls-launcher-button" onClick={onClick} type="button">
      Chat with HDLS Agent
    </button>
  );
}
