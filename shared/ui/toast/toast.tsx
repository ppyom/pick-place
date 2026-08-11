interface Props {
  message: string;
}

export function Toast({ message }: Props) {
  return (
    <div className="bg-surface-inverse/50 shadow-elevation-m rounded-full px-4 py-3">
      <p className="typo-label-m text-text-inverse">{message}</p>
    </div>
  );
}
