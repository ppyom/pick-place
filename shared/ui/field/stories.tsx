import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { Field } from './field';
import { FieldDescription } from './field-description';
import { FieldError } from './field-error';

const meta = {
  title: 'UI/Field',
  component: Field,
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field className="w-72">
      <Label htmlFor="username">아이디</Label>
      <Input id="username" placeholder="예: pickplace_user" />
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field className="w-72">
      <Label htmlFor="email">이메일</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
      <FieldDescription>인증에 사용할 이메일 주소예요.</FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field className="w-72">
      <Label htmlFor="password">비밀번호</Label>
      <Input id="password" type="password" status="error" />
      <FieldError>비밀번호는 8자 이상이어야 해요.</FieldError>
    </Field>
  ),
};

export const DescriptionThenErrorOnSubmit: Story = {
  name: '설명 → 제출 후 에러로 전환',
  render: () => {
    const hasError = true;

    return (
      <Field className="w-72">
        <Label htmlFor="nickname">닉네임</Label>
        <Input id="nickname" status="error" defaultValue="a" />
        {hasError ? (
          <FieldError>닉네임은 2자 이상이어야 해요.</FieldError>
        ) : (
          <FieldDescription>다른 유저에게 보여지는 이름이에요.</FieldDescription>
        )}
      </Field>
    );
  },
};
