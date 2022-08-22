import { ErrorResponse } from '@/types/utils/response';

export const useCatchError = (err: any) => {
  console.error(err);

  const code: number = +err?.response?.status || 500;
  const data: ErrorResponse = err?.response?._data;

  let summary: string;
  let detail: string;
  let severity = 'warn';

  if (data) {
    summary = data['hydra:title'] || data.title;
    detail = data['hydra:description'] || data.detail;
    severity = 'error';
  }

  if (code > 499) {
    summary = 'Oops!';
    detail = 'Something went wrong!';
    severity = 'error';
  }

  return {
    summary,
    detail,
    severity,
    code,
  };
};
