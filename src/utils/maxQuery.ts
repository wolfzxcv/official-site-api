export const MAX_QUERY = () => {
  const validSetting =
    process.env.MAX_QUERY && Number(process.env.MAX_QUERY) > 0;

  const defaultMaxAmount = 10;

  if (validSetting) {
    return Number(process.env.MAX_QUERY);
  } else {
    return defaultMaxAmount;
  }
};
