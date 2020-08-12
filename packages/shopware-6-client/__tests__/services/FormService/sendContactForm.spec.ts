import { sendContactForm } from "@shopware-pwa/shopware-6-client";
import { defaultInstance } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedApiInstance = defaultInstance as jest.Mocked<
  typeof defaultInstance
>;

describe("FormService - sendContactForm", () => {
  const mockedPost = jest.fn();
  beforeEach(() => {
    jest.resetAllMocks();
    mockedApiInstance.invoke = {
      post: mockedPost,
    } as any;
  });
  it("should invoke correct API endpoint with given parameters", async () => {
    await sendContactForm({
      salutationId: "2a69a6c523034b108a3bc292ef4c8891",
      firstName: "John",
      lastName: "Doe",
      email: "John@Doe.com",
      phone: "123456789",
      subject: "Best form test",
      comment: "Please do not reply for this email.",
    });
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/v3/contact-form", {
      salutationId: "2a69a6c523034b108a3bc292ef4c8891",
      firstName: "John",
      lastName: "Doe",
      email: "John@Doe.com",
      phone: "123456789",
      subject: "Best form test",
      comment: "Please do not reply for this email.",
    });
  });

  it("should throw an error when data is incorrect", async () => {
    mockedPost.mockRejectedValueOnce(new Error("400"));
    expect(sendContactForm({} as any)).rejects.toThrowError("400");
    expect(mockedPost).toBeCalledTimes(1);
    expect(mockedPost).toBeCalledWith("/store-api/v3/contact-form", {});
  });
});
