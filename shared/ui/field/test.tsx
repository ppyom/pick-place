import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { Field } from './field';
import { FieldDescription } from './field-description';
import { FieldError } from './field-error';

describe('Field', () => {
  it('children을 그대로 렌더링한다', () => {
    render(
      <Field>
        <Label htmlFor="username">아이디</Label>
        <Input id="username" />
      </Field>,
    );

    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
  });
});

describe('FieldDescription', () => {
  it('children을 렌더링한다', () => {
    render(<FieldDescription>도움말 텍스트</FieldDescription>);

    expect(screen.getByText('도움말 텍스트')).toBeInTheDocument();
  });
});

describe('FieldError', () => {
  it('children이 있으면 role="alert"로 렌더링한다', () => {
    render(<FieldError>에러 메시지</FieldError>);

    expect(screen.getByRole('alert')).toHaveTextContent('에러 메시지');
  });

  it('children이 없으면 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<FieldError />);

    expect(container).toBeEmptyDOMElement();
  });
});

describe('Field + Input 접근성 연결', () => {
  it('status="error"일 때 Input에 aria-invalid가 설정된다', () => {
    render(
      <Field>
        <Label htmlFor="password">비밀번호</Label>
        <Input id="password" status="error" />
        <FieldError>비밀번호는 8자 이상이어야 해요.</FieldError>
      </Field>,
    );

    expect(screen.getByLabelText('비밀번호')).toHaveAttribute('aria-invalid', 'true');
  });

  it('status="default"일 때 Input에 aria-invalid가 없다', () => {
    render(
      <Field>
        <Label htmlFor="nickname">닉네임</Label>
        <Input id="nickname" status="default" />
      </Field>,
    );

    expect(screen.getByLabelText('닉네임')).not.toHaveAttribute('aria-invalid');
  });

  it('aria-describedby로 에러 메시지와 Input을 직접 연결할 수 있다', () => {
    render(
      <Field>
        <Label htmlFor="email">이메일</Label>
        <Input id="email" status="error" aria-describedby="email-error" />
        <FieldError id="email-error">이메일 형식이 아니에요</FieldError>
      </Field>,
    );

    const input = screen.getByLabelText('이메일');
    const error = screen.getByRole('alert');

    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(input.getAttribute('aria-describedby')).toBe(error.id);
  });
});
