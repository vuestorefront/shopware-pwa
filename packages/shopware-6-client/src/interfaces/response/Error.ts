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
    args: Array<any>;
  }>;
}

export interface ErrorResponse {
  errors: Array<Error>;
}
