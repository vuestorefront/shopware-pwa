import { name, random } from "faker";
import { apiService } from "../../../src/apiService";
import { updateProfile } from "../../../src";
import { getCustomerEndpoint } from "../../../src/endpoints";

const customerData = {
  salutationId: random.uuid(),
  firstName: name.firstName(),
  lastName: name.lastName(),
  title: "Mr."
};

jest.mock("../../../src/apiService");
const mockedAxios = apiService as jest.Mocked<typeof apiService>;

describe("CustomerService - updateProfile", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns no data if successfully updated", async () => {
    mockedAxios.patch.mockResolvedValueOnce(null);
    const result = await updateProfile(customerData);

    expect(result).toBeFalsy();
    expect(mockedAxios.patch).toBeCalledTimes(1);
    expect(mockedAxios.patch).toBeCalledWith(
      getCustomerEndpoint(),
      customerData
    );
  });
});
