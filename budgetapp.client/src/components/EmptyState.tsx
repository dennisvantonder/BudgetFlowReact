import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type EmptyStateProps = {
    title: string;
    message: string;
    icon?: IconProp;
};

export default function EmptyState({ title, message, icon = "tags" }: EmptyStateProps) {
  return (
    <div className="empty-state" style={{gridColumn: "1 / -1"}}>
      <FontAwesomeIcon icon={icon} />
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}