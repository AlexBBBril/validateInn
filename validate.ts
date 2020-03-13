const validateInn = (value: string, callback: any): void => {
  const coefficient10 = [2, 4, 10, 3, 5, 9, 4, 6, 8];
  const coefficient11 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
  const coefficient12 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

  let result = false;
  const radix = 10;

  if (/[^0-9]/.test(value)) {
    // TODO Нужен совет, что лучше делать с мессаджами
    callback(new Error('ИНН может состоять только из цифр'));
    return;
  }

  if ([10, 12].indexOf(value.length) === -1) {
    callback(new Error('ИНН должен содержать 10 или 12 цифр'));
    return;
  }

  const checkCoefficient = (inn: string, coefficients: number[]): number => {
    let n = 0;
    coefficients.forEach((item, index) => {
      n += coefficients[index] * parseInt(inn.charAt(index), radix);
    });
    return parseInt((n % 11 % 10).toString(), radix);
  };

  if (value.length === 10) {
    const n10 = checkCoefficient(value, coefficient10);
    if (n10 === parseInt(value[9], radix)) {
      result = true;
    }
  } else if (value.length === 12) {
    const n11 = checkCoefficient(value, coefficient11);
    const n12 = checkCoefficient(value, coefficient12);
    if ((n11 === parseInt(value[10], radix)) && (n12 === parseInt(value[11], radix))) {
      result = true;
    }
  }

  if (!result) {
    callback(new Error('Передан неправильный ИНН'));
  }
};
