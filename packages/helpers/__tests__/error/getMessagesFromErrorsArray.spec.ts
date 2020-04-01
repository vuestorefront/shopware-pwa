import { getMessagesFromErrorsArray } from "@shopware-pwa/helpers";

describe("Shopware helpers - getMessagesFromErrorsArray", () => {
  it("should return an undefined (falsy) if no errors provided", () => {
    const result = getMessagesFromErrorsArray(undefined as any);
    expect(result).toEqual([]);
  });
  it("should return an undefined (falsy) if no errors provided - empty array", () => {
    const result = getMessagesFromErrorsArray([] as any);
    expect(result).toEqual([]);
  });
  it("should return the array of strings based on ShopawreError detail property.", () => {
    const result = getMessagesFromErrorsArray([
      {
        detail: 'The email address "user@divante.com" is already in use.',
        source: {
          pointer: "/email",
        },
      },
      {
        detail: "This value is too short. It should have 8 character or more.",
        source: {
          pointer: "/password",
        },
      },
    ] as any);
    expect(result).toEqual([
      'email: The email address "user@divante.com" is already in use.',
      "password: This value is too short. It should have 8 character or more.",
    ]);
  });
  it("should return the array of converted messages if object has all necessary data", () => {
    const result = getMessagesFromErrorsArray([
      {
        detail: 'The email address "user@divante.com" is already in use.',
        source: {
          // lack of pointer
        },
      },
      {
        detail: "This value is too short. It should have 8 character or more.",
        source: {
          pointer: "/password",
        },
      },
    ] as any);
    expect(result).toEqual([
      "password: This value is too short. It should have 8 character or more.",
    ]);
  });
});
