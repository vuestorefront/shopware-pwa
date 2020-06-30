export function deprecationWarning({
  methodName,
  newMethodName,
  packageName,
}: {
  methodName: string;
  newMethodName: string;
  packageName: string;
}) {
  process.env.NODE_ENV !== "production" &&
    console.warn(
      `[DEPRECATED][@shopware-pwa/${packageName}][${methodName}] This method has been deprecated. Use "${newMethodName}" instead.`
    );
}
