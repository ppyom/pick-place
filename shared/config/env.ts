import { z } from 'zod';

const schema = z.object({
  APP_NAME: z.string().default('Pick!Place'),
  API_URL: z.url(),
  SITE_URL: z.url(),
});

const parsed = schema.safeParse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
});

if (!parsed.success) {
  console.error(z.prettifyError(parsed.error));

  throw new Error('환경변수가 올바르지 않습니다.');
}

export const env = parsed.data;
