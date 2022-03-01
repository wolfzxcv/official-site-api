export const formatXForwardedFor = (value: unknown) => {
  if (value) {
    if (typeof value === 'string') {
      const output = value.split(',');
      return output[0];
    } else {
      return value;
    }
  } else {
    return undefined;
  }
};

export const formatExpressIp = (rawIp: string) => rawIp.split(':').pop();
