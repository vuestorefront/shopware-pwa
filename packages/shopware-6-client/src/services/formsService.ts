import {
  getContactFormEndpoint,
  getStoreNewsletterSubscribeEndpoint,
  getStoreNewsletterUnsubscribeEndpoint,
} from "../endpoints";
import { defaultInstance, ShopwareApiInstance } from "../apiService";

/**
 * @public
 */
export interface ContactFormData {
  salutationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  comment: string;
  navigationId?: string;
}

/**
 * @public
 */
export async function sendContactForm(
  params: ContactFormData,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(getContactFormEndpoint(), params);
}

/**
 * @public
 */
export interface NewsletterSubscribeData {
  email: string;
  salutationId?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  option: "direct" | "subscribe" | "confirmSubscribe" | "unsubscribe";
  storefrontUrl: string;
}
/**
 * @public
 */
export async function newsletterSubscribe(
  params: NewsletterSubscribeData,
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(
    getStoreNewsletterSubscribeEndpoint(),
    Object.assign({}, { option: "subscribe" }, params)
  );
}

/**
 * @public
 */
export async function newsletterUnsubscribe(
  params: {
    email: string;
  },
  contextInstance: ShopwareApiInstance = defaultInstance
): Promise<void> {
  await contextInstance.invoke.post(
    getStoreNewsletterUnsubscribeEndpoint(),
    params
  );
}
