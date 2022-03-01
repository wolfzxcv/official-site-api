import { IContactInput } from '../../@types';

export const checkContactInput = (input: IContactInput) => {
  return (
    input.name &&
    input.surname &&
    input.mobile &&
    input.email &&
    input.area &&
    input.type &&
    input.iScustomer
  );
};
