import { type OAuthProvider, oauthProviders } from '../config/providers';

interface Props {
  provider: OAuthProvider;
  onClick: () => void;
  disabled?: boolean;
}

export function OAuthButton({ provider, onClick, disabled = false }: Props) {
  const { label, Icon, background, textColor, iconOffset, border } = oauthProviders[provider];

  return (
    <button
      type="button"
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className="relative flex h-13 w-full items-center rounded-md"
      style={{
        backgroundColor: background,
        color: textColor,
        border: border ? `1px solid ${border}` : undefined,
      }}
    >
      <span className="absolute" style={{ left: iconOffset }}>
        <Icon />
      </span>
      <span className="typo-label-l absolute inset-0 flex items-center justify-center">
        {label}
      </span>
    </button>
  );
}
