const _sum = (values, i) => i >= 0 ? values[i] + _sum(values, i - 1) : 0;
const sum = values => _sum(values, values.length - 1);
console.log('sum: ', sum([5, 4, 3, 2, 1])) // 15