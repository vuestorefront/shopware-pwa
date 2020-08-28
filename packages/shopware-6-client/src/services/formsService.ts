import {
  getContactFormEndpoint,
  getStoreNewsletterSubscribeEndpoint,
  getStoreNewsletterUnsubscribeEndpoint,
} from "../endpoints";
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

/**
 * @beta
 */
export interface NewsletterSubscribeData {
  email: string;
  salutationId?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  option: string;
  storefrontUrl: string;
}
/**
 * @beta
 */
export async function newsletterSubscribe(
  params: NewsletterSubscribeData,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(
    getStoreNewsletterSubscribeEndpoint(),
    params
  );
}

/**
 * @beta
 */
export async function newsletterUnsubscribe(
  {
    email,
  }: {
    email: string;
  },
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(
    getStoreNewsletterUnsubscribeEndpoint(),
    email
  );
}
