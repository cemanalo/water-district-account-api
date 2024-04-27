export const plainToInstance = <T extends Object>(
  ctor: new () => T,
  plain: object
): T => {
  const instance = new ctor(); // Create a new instance of the given class
  // Copy properties from plain object to the instance
  for (const key of Object.keys(plain)) {
    (instance as any)[key] = (plain as any)[key]; // Type assertion to assign property
  }
  return instance; // Return the new instance
};
