import { object } from 'prop-types';

export const routerPropTypes = {
  history: object.isRequired,
  location: object.isRequired,
  match: object.isRequired,
  staticContext: object
};
