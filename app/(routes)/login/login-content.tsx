'use client';

import { OAuthButton, type OAuthProvider, useOAuthLogin } from '@/features/oauth-button';

import { AppLogo } from '@/shared/assets/logo/app-logo';

const OAUTH_PROVIDERS: OAuthProvider[] = ['kakao', 'naver', 'google', 'apple'];

export function LoginContent() {
  const { login, pendingProvider, error } = useOAuthLogin();
  const isPending = pendingProvider !== null;

  return (
    <div className="container-app flex min-h-dvh flex-col justify-between px-6 py-10">
      <div className="flex flex-col items-center gap-4">
        <AppLogo className="size-32" />
        <div className="text-center">
          <h1 className="typo-heading-xl text-text-primary">
            Pick<span className="text-text-brand">!</span>Place
          </h1>
          <p className="typo-label-l text-text-brand">PICK YOUR PLACE</p>
        </div>
        <p className="typo-label-l text-text-primary">가고 싶은 곳을 모아 함께 나눠요</p>
      </div>

      <div className="flex flex-col gap-3">
        {error && (
          <p role="alert" className="typo-body-s text-status-error-text text-center">
            {error}
          </p>
        )}
        {OAUTH_PROVIDERS.map((provider) => (
          <OAuthButton
            key={provider}
            provider={provider}
            onClick={() => login(provider)}
            disabled={isPending}
          />
        ))}
      </div>
    </div>
  );
}
