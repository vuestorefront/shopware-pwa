import { address, name, random } from "faker";
import {
  createCustomerAddress,
  update,
  config
} from "@shopware-pwa/shopware-6-client";
import { getCustomerAddressEndpoint } from "../../../src/endpoints";
import { apiService } from "../../../src/apiService";

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - createCustomerAddress", () => {
  const newAddressData = {
    countryId: random.uuid(),
    salutationId: random.uuid(),
    firstName: name.firstName(),
    lastName: name.lastName(),
    zipcode: address.zipCode(),
    city: address.city(),
    street: address.streetName()
  };
  let contextToken: string;

  beforeEach(() => {
    jest.resetAllMocks();
    contextToken = random.uuid();
    update({ contextToken });
  });
  afterEach(() => {
    expect(config.contextToken).toEqual(contextToken);
  });
  it("should return created address id", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: "2bbb89dfa4664bc581e80b37eaa80fb7"
    });
    const result = await createCustomerAddress(newAddressData);
    expect(result).toEqual("2bbb89dfa4664bc581e80b37eaa80fb7");
    expect(mockedAxios.post).toBeCalledTimes(1);
    expect(mockedAxios.post).toBeCalledWith(
      getCustomerAddressEndpoint(),
      newAddressData
    );
  });
});
