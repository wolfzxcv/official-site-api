export const formatXForwardedFor = (value: string | undefined) => {
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
