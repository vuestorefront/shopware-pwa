interface ErrorTrace {
  file: string;
  line: number;
  function: string;
  class: string;
  type: string;
  args: any[];
}

interface Error {
  status: string;
  code: string;
  title: string;
  detail: string;
  meta: any;
  trace?: ErrorTrace[];
}

export interface ErrorResponse {
  errors: Error[];
}
