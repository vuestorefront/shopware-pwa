import { addCartItems } from "../../../src";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CartService - addCartItems", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("should call valid endpoint and return a cart", async () => {
    mockedPost.mockResolvedValueOnce({
      data: {},
    });

    await addCartItems([
      {
        type: "product",
      },
      {
        type: "credit",
      },
    ]);
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/checkout/cart/line-item", {
      items: [
        {
          type: "product",
        },
        {
          type: "credit",
        },
      ],
    });
  });
});
