/**
 * Changes deeply specific property. Can be used in snapshot tests to mock changing value.
 */
export function deepChangeProperty(
  obj: any,
  property: string,
  value: any = "mockedValue"
) {
  deepChangeProperties(obj, [property, value]);
}

export function deepChangeProperties(
  obj: any,
  properties: string[],
  value: any = "mockedValue"
) {
  for (var prop in obj) {
    if (properties.includes(prop) && Array.isArray(obj[prop])) {
      obj[prop] = [value];
    } else if (properties.includes(prop)) {
      obj[prop] = value;
    } else if (obj[prop] && obj[prop] === Object(obj[prop])) {
      deepChangeProperties(obj[prop], properties, value);
    }
  }
}
