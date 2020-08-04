import { getContactFormEndpoint } from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * @beta
 */
export interface ContactFormData {
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
  params: ContactFormData,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getContactFormEndpoint(), params);
}
