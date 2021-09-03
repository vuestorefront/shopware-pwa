import { AxiosResponse, AxiosError } from "axios";

/**
 * API error structure for incoming errors
 *
 * @public
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
 * API Error response from Shopware backend
 *
 * @public
 */
export interface ShopwareApiError extends AxiosError {
  response: AxiosResponse<{
    errors: ShopwareError[];
  }>;
}

/**
 * API client error structure
 *
 * @public
 */
export type ClientApiError = {
  messages: ShopwareError[];
  statusCode: number;
};
