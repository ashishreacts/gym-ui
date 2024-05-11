// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAPIErrorText = (isError: boolean): any => {
  return isError
    ? {
        color: "error",
        children: "Error loading data",
      }
    : undefined;
};
