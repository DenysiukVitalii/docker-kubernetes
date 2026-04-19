import StatusItem from './StatusItem';

import './SystemStatus.scss';

type SystemStatusProps = {
  database: boolean;
  redis: boolean;
};

export default function SystemStatus({ database, redis }: SystemStatusProps) {
  return (
    <div className="system-status">
      <StatusItem label="Database" isOn={database} />
      <StatusItem label="Redis" isOn={redis} />
    </div>
  );
}
