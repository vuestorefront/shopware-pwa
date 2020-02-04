import { AxiosResponse, AxiosError } from "axios";

/**
 * @alpha
 */
export interface ShopwareError {
  status: string;
  code: string;
  title: string;
  detail: string;
  source: any;
  meta: any;
}

/**
 * @alpha
 */
export interface ShopwareApiError extends AxiosError {
  response: AxiosResponse<{
    errors: ShopwareError[];
  }>;
}

/**
 * @alpha
 */
export interface ClientApiError {
  message: string | ShopwareError[];
  statusCode: number;
}
