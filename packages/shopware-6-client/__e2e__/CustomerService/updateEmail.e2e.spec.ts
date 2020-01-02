import {login, updateEmail} from "@shopware-pwa/shopware-6-client";

describe("shopware-6-client - E2E - CustomerService - updateEmail", () => {
  it('should update customer email', async() => {
    await login({username: "test.e2e@test.pl", password: "password"});
    const result = await updateEmail({
      email: 'test@test.pl',
      emailConfirmation: 'test@test.pl',
      password: "password"
    });
    await updateEmail({
      email: 'test.e2e@test.pl',
      emailConfirmation: 'test.e2e@test.pl',
      password: 'password'
    });
    expect(result).toMatchSnapshot();
  });

  it('should returns error when email address is already in use', async () => {
    await login({username: "test.e2e@test.pl", password: "password"});
    try {
      await updateEmail({
        email: 'test.e2e@test.pl',
        emailConfirmation: 'test.e2e@test.pl',
        password: "password"
      });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });


  it('should returns error when email does not meet minimum requirements', async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    try {
      await updateEmail({
        email: 'test.e2etest.pl',
        emailConfirmation: 'test.e2etest.pl',
        password: "password"
      });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }

  });

  it('should returns error when emailConfirmation does not match', async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    try {
      await updateEmail({
        email: 'test.e2e@test.pl',
        emailConfirmation: 'teste2test.pl',
        password: "password"
      });
      expect("didn't throw an error").toEqual("should throw an error");
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });

  it("should returns error when password does not match to current user password", async () => {
    await login({ username: "test.e2e@test.pl", password: "password" });
    try {
      await updateEmail({
        email: 'test.e2e@test.pl',
        emailConfirmation: 'teste2e@test.pl',
        password: "shop1"
      });
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });

  it('should returns error when updating email without logged user', async () => {
    try {
      await updateEmail({
        email: 'test.e2e@test.pl',
        emailConfirmation: 'teste2etest.pl',
        password: "password"
      });
    } catch(e) {
      expect(e).toMatchSnapshot();
    }
  });
});
