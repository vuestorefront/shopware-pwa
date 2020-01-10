/**
 * Changes deeply specific property. Can be used in snapshot tests to mock changing value.
 */
export function deepChangeProperty(
  obj: any,
  property: string,
  value: any = "mockedValue"
) {
  for (var prop in obj) {
    if (obj[prop] === Object(obj[prop]))
      deepChangeProperty(obj[prop], property, value);
    else if (prop === property) obj[prop] = value;
  }
}
