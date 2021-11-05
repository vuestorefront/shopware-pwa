import { getCustomerAccountConfirmEndpoint } from "../../../src/endpoints";
import { defaultInstance } from "../../../src/apiService";
import { internet } from "faker";
import { confirmAccountRegistration } from "../../../src/services/customerService";

const exampleHash = internet.mac();
const exampleEm = internet.mac();

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("CustomerService - confirmAccountRegistration", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });

  it("rejects the promise if provided hash or em does not match", async () => {
    mockedPost.mockRejectedValueOnce(new Error("400 - invalid hash or em"));
    expect(
      confirmAccountRegistration({
        hash: exampleHash,
        em: exampleEm,
      })
    ).rejects.toThrow("400 - invalid hash or em");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerAccountConfirmEndpoint(), {
      hash: exampleHash,
      em: exampleEm,
    });
  });

  it("returns customer data if successfully confirmed", async () => {
    mockedPost.mockResolvedValueOnce({
      data: {
        id: "customer-id",
      },
    });

    const result = await confirmAccountRegistration({
      hash: exampleHash,
      em: exampleEm,
    });
    expect(result).toStrictEqual({
      id: "customer-id",
    });
  });

  it("should invoke post method with given parameters", async () => {
    mockedPost.mockResolvedValueOnce({
      data: {
        id: "customer-id",
      },
    });

    await confirmAccountRegistration({
      hash: exampleHash,
      em: exampleEm,
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith(getCustomerAccountConfirmEndpoint(), {
      em: exampleEm,
      hash: exampleHash,
    });
  });
});
