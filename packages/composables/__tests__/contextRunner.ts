import { effectScope, reactive } from "vue-demi";
import { extendScopeContext } from "../src/getVueContext";

export function prepareRootContextMock(extendContextMock?: any) {
  const rootContextMock: any = Object.assign(
    {
      apiInstance: jest.fn(), // $shopwareApiInstance
      shopwareDefaults: jest.fn(),
      i18n: {
        t: (text: string) => text,
      },
      $routing: jest.fn(),
      sharedStore: reactive({}),
      interceptors: {},
    },
    extendContextMock || {}
  );
  return rootContextMock;
}

export async function runInVueContext(
  extendContextMock: any,
  method: Function
) {
  const rootContextMock = prepareRootContextMock(extendContextMock);

  const scope = effectScope();
  extendScopeContext(scope, rootContextMock);

  await scope.run(async () => {
    await method(rootContextMock);
  });
  scope.stop();
}
