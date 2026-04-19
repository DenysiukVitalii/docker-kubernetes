import './StatusItem.scss';

type StatusItemProps = {
  label: string;
  isOn: boolean;
};

export default function StatusItem({ label, isOn }: StatusItemProps) {
  return (
    <div className="status-item">
      <span
        className={`status-item__indicator ${isOn ? 'status-item__indicator--on' : 'status-item__indicator--off'}`}
        aria-hidden="true"
      />
      <span className="status-item__text">
        {label} is {isOn ? 'on' : 'off'}
      </span>
    </div>
  );
}
