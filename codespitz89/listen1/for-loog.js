const _sum = values => {
  let acc = 0
  for (let i = values.length - 1; i >= 0; i--) {
    acc += values[i]
  }
  return acc;
}
const sum = values => _sum(values);
console.log('sum: ', sum([5, 4, 3, 2, 1])) // 15