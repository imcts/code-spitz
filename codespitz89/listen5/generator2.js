let i = 0;
const copy = iter=>{
  iter.filter = (block)=>copy((function*(){
    for(const v of iter){
      i++;
      if(block(v)) yield v;
    }
  })());
  iter.map = (block)=>copy((function*(){
    for(const v of iter){
      i++;
      yield block(v);
    }
  })());
  return iter;
};
const lazyArray = iter=>copy(iter);

const iterator = lazyArray([1,2,3,4,5]);
const filterIterator = iterator.filter(v => v % 2);
// TODO 여기에서 이미 이터레이터를 소진해버렸다!
for (const v of filterIterator) {
  console.log('v: ', v)
}
const mapIterator = filterIterator.map(v => v * 2);
// TODO 그래서 이게 실행이 안돼서 코드가 이해가 안됐던 거였어요 !
for (const v of mapIterator) {
  console.log('v: ', v)
}

//for (const v of iterator.filter(v => v % 2).map(v =>v*2)) {
//  console.log('v: ', v)
//}
//console.log('count: ', i)
//
const f = [...lazyArray([1,2,3,4,5]).filter(v=>v%2).map(v=>v*2)];
console.log(f, i);