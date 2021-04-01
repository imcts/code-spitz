const _sum = (values, i, acc) => i >= 0 ? _sum(values, i - 1, acc + values[i]) : acc;
const sum = values => _sum(values, values.length - 1, 0);
console.log('sum: ', sum([5, 4, 3, 2, 1])) // 15