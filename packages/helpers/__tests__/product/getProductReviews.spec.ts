import { getProductReviews } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductReviews", () => {
  it("should return an array of UiProductReview objects", () => {
    const productWithReviews: any = {
      productReviews: [
        {
          id: "3858d1baf2544a379c92535ea3d2fe53",
          customerId: "4ac7c8a40f6bc49e24d26f0ccb15e5e6",
          externalUser: "Joe Doe",
          points: 4,
          content: "Great quality!",
          createdAt: "2019-10-08T09:42:19+00:00",
        },
        {
          id: "3f06d7747f904336a78bf75e86a64535",
          customerId: "3f06d7747f904336a78bf75e86a6450f",
          externalUser: null,
          points: 5,
          content: "I'm impressed!",
          createdAt: "2019-11-14T10:22:15+00:00",
        },
      ],
    };

    const reviews = getProductReviews({ product: productWithReviews });
    expect(reviews).toHaveLength(2);
    const firstReview = reviews[0];
    const secondReview = reviews[1];
    expect(firstReview.id).toBe("3858d1baf2544a379c92535ea3d2fe53");
    expect(firstReview.date).toBe("2019-10-08T09:42:19+00:00");
    expect(firstReview.message).toBe("Great quality!");
    expect(firstReview.rating).toBe(4);

    expect(secondReview.author).toBe("3f06d7747f904336a78bf75e86a6450f");
  });
  it("should return no reviews if do not exist", () => {
    const productWithoutReviews: any = {};
    const reviews = getProductReviews({ product: productWithoutReviews });
    expect(reviews).toHaveLength(0);
  });

  it("should return default value if argument wasn't provided", () => {
    const reviews = getProductReviews();
    expect(reviews).toHaveLength(0);
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null };
    const reviews = getProductReviews(argument);
    expect(reviews).toHaveLength(0);
  });
});
