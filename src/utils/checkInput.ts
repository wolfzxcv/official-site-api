export const checkInput = (
  value: unknown,
  type = 'string'
): 'required' | 'invalid' | 'valid' => {
  if (!value) {
    return 'required';
  } else if (typeof value !== type) {
    return 'invalid';
  } else if (value === type) {
    return 'invalid';
  } else {
    return 'valid';
  }
};
