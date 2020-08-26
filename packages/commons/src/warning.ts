export function warning({
  packageName,
  methodName,
  notes,
}: {
  packageName: string;
  methodName: string;
  notes?: string;
}) {
  process.env.NODE_ENV !== "production" &&
    console.warn(
      `[WARNING][@shopware-pwa/${packageName}][${methodName}]: ${notes}`
    );
}
