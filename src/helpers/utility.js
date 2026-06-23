

export const isTypeOf = (type, variable) => {
  return variable && {}.toString.call(variable) === `[object ${type}]`;
};
