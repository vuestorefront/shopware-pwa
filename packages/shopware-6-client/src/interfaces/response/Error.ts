interface Error {
  status: string;
  code: string;
  title: string;
  detail: string;
  meta: any;
  trace?: Array<{
    file: string;
    line: number;
    function: string;
    class: string;
    type: string;
    args: any[];
  }>;
}

export interface ErrorResponse {
  errors: Error[];
}
