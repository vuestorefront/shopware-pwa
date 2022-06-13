// Mock API client
import * as shopwareClient from "@shopware-pwa/shopware-6-client";
jest.mock("@shopware-pwa/shopware-6-client");
const mockedApiClient = shopwareClient as jest.Mocked<typeof shopwareClient>;

import * as Composables from "@shopware-pwa/composables";
jest.mock("@shopware-pwa/composables");
const mockedComposables = Composables as jest.Mocked<typeof Composables>;

const consoleErrorSpy = jest.spyOn(console, "error");

import { useProductReviews } from "../src/logic/useProductReviews";
import { prepareRootContextMock } from "./contextRunner";
import { ClientApiError } from "@shopware-pwa/commons";

describe("Composables - useProductReviews", () => {
  const rootContextMock = prepareRootContextMock();

  beforeEach(() => {
    jest.resetAllMocks();

    mockedComposables.useVueContext.mockReturnValue({
      isVueComponent: false,
      isVueScope: true,
    });
    mockedComposables.getApplicationContext.mockReturnValue(rootContextMock);

    consoleErrorSpy.mockImplementationOnce(() => {});
  });

  describe("methods", () => {
    describe("loadProductReviews", () => {
      it("should load be empty array when product dont have any review", async () => {
        const product: any = { id: '1' };

        const reviewsResponse = {
          elements: null
        };
        mockedApiClient.getProductReviews.mockResolvedValueOnce(
          reviewsResponse as any
        );
    
        const { productReviews, loadProductReviews } = useProductReviews({ product });
        expect(productReviews.value).toBeNull();
        await loadProductReviews();
        expect(productReviews.value).toEqual([]);
      });

      it("should load product reviews from different endpoint", async () => {
        const product: any = { id: '1' };

        const reviewsResponse = {
          elements: [
            {
              id: "421dd57b2a104837b25c7062b2edc597",
              content: "test content test content test content",
              externalUser: '1',
              customerId: '1',
              title: "test review function",
              createdAt: "2022-06-10T07:04:21.693+00:00",
              points: 5
            },
            {
              id: "421dd57b2a104837b25c7062b2edc597",
              content: "test content test content test content",
              customerId: '1',
              title: "test review function",
              createdAt: "2022-06-10T07:04:21.693+00:00",
              points: 5
            },
          ]
        };
        mockedApiClient.getProductReviews.mockResolvedValueOnce(
          reviewsResponse as any
        );
    
        const { productReviews, loadProductReviews } = useProductReviews({ product });
        expect(productReviews.value).toBeNull();
        await loadProductReviews();
        expect(productReviews.value).toHaveLength(2);
      });

      it("should be show errors when fetching api was failed", async () => {
        const product: any = { id: '1' };
       
        mockedApiClient.getProductReviews.mockRejectedValueOnce({
          messages: [{ detail: "Network Error" }],
        } as ClientApiError);
    
        const { errors, loadProductReviews } = useProductReviews({ product });
        await loadProductReviews();
        expect(errors.loadProductReviews).toEqual([
          { detail: "Network Error" },
        ]);
      });
    });

    describe("addReview", () => {
      it("should be success when calling api successfully", async () => {
        const product: any = { id: '1' };
       
        mockedApiClient.addProductReview.mockResolvedValueOnce({} as any);
    
        const { isSendingReview, wasReviewSent, addReview } = useProductReviews({ product });
        expect(wasReviewSent.value).toBeFalsy();
        expect(isSendingReview.value).toBeFalsy();
        await addReview({
          title: 'title',
          content: 'content',
          points: 5,
        })
        expect(wasReviewSent.value).toBeTruthy();
        expect(isSendingReview.value).toBeFalsy();
      });
      it("should return errors when calling api got trouble", async () => {
        const product: any = { id: '1' };
       
        mockedApiClient.addProductReview.mockRejectedValueOnce({
          messages: [{ detail: "This value is too short" }],
        } as ClientApiError);
    
        const { errors, addReview } = useProductReviews({ product });
        await addReview({
          title: 'title',
          content: 'content',
          points: 5,
        })
        expect(errors.addReview).toEqual([
          { detail: "This value is too short" }
        ]);
      });
    });
  });
});
