export function pickBy<T>(
  obj: Record<string, T>, 
  predicate: (value: T, key: string) => boolean
): Record<string, T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => predicate(value as T, key))
  );
}

export function copyError<T extends object>(error: T): T {
  if (!(error instanceof Error)) return error;

  const clone: any = {}
  Object.getOwnPropertyNames(error).forEach((key) => {
      clone[key] = (error as any)[key];
  });

  return clone as T;
}