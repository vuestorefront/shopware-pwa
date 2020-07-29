import { getContactFormEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * @beta
 */
export interface CustomerSendContactFormParam {
  salutationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  comment: string;
}

/**
 * @beta
 */
export async function sendContactForm(
  params: CustomerSendContactFormParam,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getContactFormEndpoint(), params);
}
