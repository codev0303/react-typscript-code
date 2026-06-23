
export interface QueryParamShape<T>{
  route: string;
  params?: T;
  customIdentifier?: string
}


export const updateQueryParams = (data: QueryParamShape<object>): QueryParamShape<object> => {
  let identifier = ['?', '&'];
  if(data.customIdentifier && !identifier.includes(data.customIdentifier)) {
    identifier = identifier.concat(data.customIdentifier);
  }
  Object.keys(data.params || {})?.forEach(key => {
    const value = (data?.params||[])[key as keyof typeof data.params];
    const re = new RegExp(`([${identifier.join('')}])` + key + '=.*?(&|$)', 'i');
    if(!(value === undefined || value === null)) {
      const separator = data.customIdentifier || (data.route.toString().indexOf('?') !== -1 ? '&' : '?');
      if (data.route.toString().match(re)) {
        data.route = data.route.toString().replace(re, '$1' + key + '=' + value + '$2');
      } else {
        data.route = data.route + separator + key + '=' + value;
      }
    } else {
      data.route = '';
    }
  });
  return data;
};

export const replaceDynamics = (route: string, dynamic_obj = {}): string => {
  const m = Object.keys(dynamic_obj).reduce((prev, key) => {
    const reg = new RegExp(`@${key}`);
    return prev.replace(reg, dynamic_obj[key as keyof typeof dynamic_obj] || '');
  }, route) || route;
  return m.toString().trim();
};

