export const flattenArray = (arr: any[] | any | null | undefined): any[] => Array.from(new Set(arr));

export const flattenKeys = (obj: any) => {
  return Object.keys(obj).reduce<any[]>((acc: any[], key) => {
    const val = obj[key];

    if (typeof val === 'object') {
      acc = flattenArray([...acc, ...flattenKeys(val)]);
    } else {
      acc.push(key);
    }

    return acc;
  }, []);
};

export const flattenValues = (obj: any | null | undefined): any[] => {
  return Object.keys(obj).reduce<any[]>((acc: any[], key: string) => {
    const val = obj[key];

    if (typeof val === 'object') {
      acc = flattenArray([...acc, ...flattenValues(val)]);
    } else {
      acc.push(val);
    }

    return acc;
  }, []);
};

export const hasEntries = (arr: any[] | any | null | undefined) => arr != null && Array.isArray(arr) && arr.length > 0;
