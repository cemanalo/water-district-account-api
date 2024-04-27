export const validateNumber = (value: unknown) => {
  if (!value) {
    throw new Error("Id is required");
  }

  if (!Number.isInteger(Number(value))) {
    throw new Error("Id must be a number");
  }
}