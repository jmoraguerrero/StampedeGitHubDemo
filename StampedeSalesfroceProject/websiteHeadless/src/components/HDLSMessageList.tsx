import type { HDLSChatMessage } from "../types/HDLSChat";

interface HDLSMessageListProps {
  messages: HDLSChatMessage[];
}

export function HDLSMessageList({ messages }: HDLSMessageListProps) {
  return (
    <div className="hdls-message-list">
      {messages.map((message) => (
        <div key={message.id} className={`hdls-message hdls-message-${message.role}`}>
          <div className="hdls-message-role">{message.role}</div>
          <div>{message.text}</div>
        </div>
      ))}
    </div>
  );
}
