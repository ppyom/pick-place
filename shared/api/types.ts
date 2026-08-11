export interface ErrorResponseBody {
  message?: string;
  code?: string;
}

export type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};
