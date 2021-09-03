export function getContextProperty<RETURN_TYPE>(
  object: { [key: string]: unknown },
  name: string
) {
  return (object?.[`$${name}`] || object?.[name]) as RETURN_TYPE;
}
