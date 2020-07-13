import { getContactFormEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * @alpha
 */
export interface CustomerSendContactFormParam {
  salutationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  comment: string;
}

export async function sendContactForm(
  params: CustomerSendContactFormParam,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getContactFormEndpoint(), params);
}
