/**
 * - then, catch, finally가 실행될 때마다 새로운 프로미스를 반환한다.
 * - 아래 코드에서 first === second 는 false 이다.
 * - 아래 코드에서 fourth === error 는 false 이다.
 */

// 프로미스를 생성하고 첫 번째 프로미스를 반환.
const first = new Promise((resolve, reject) => {
  // 6. 실행 및 첫 번째 프로미스의 상태를 fulfilled로 변경
  resolve(1);
});

console.log('first'); // 1. 출력

// 첫 번째 프로미스에 then 핸들러를 등록하고 새로운 프로미스를 저장 후 반환.
const second = first.then(firstValue => {
  // 7. 실행
  console.log('firstValue: ', firstValue);
  return firstValue + 1; // first 프로미스의 then 핸들러가 종료되면, then 메서드가 반환했던 Promise에게 이행(fulfill)을 요청.
});

console.log('second'); // 2. 출력

// 두 번째 프로미스에 then 핸들러를 등록하고 새로운 프로미스를 저장 후 반환.
const third = second.then(secondValue => {
  // 8. 실행
  // second 프로미스의 then 메서드에서 에러가 발생.
  // then 메서드에서 반환한 프로미스에게 거부(reject)를 알리고 에러 객체를 전달.
  throw new Error('second error');
});

console.log('third'); // 3. 출력

// 세 번째 프로미스에 then 핸들러를 등록하고 새로운 프로미스를 저장 후 반환.
const fourth = third.then(thirdValue => {
  // second 프로미스의 then이 반환한 프로미스가 third 프로미스에게 거부(reject)를 알렸으므로 실행되지 않음.
  console.log('thirdValue: ', thirdValue);
  return thirdValue;
});

console.log('fourth'); // 4. 출력

// 세 번째 프로미스에 catch 핸들러를 등록하고 새로운 프로미스를 저장 후 반환.
const error = third.catch((error) => {
  // 9. 실행
  // second 프로미스가 third 프로미스에게 거부(reject)를 알렸으므로, catch 핸들러를 실행.
  console.log('error: ', error);

  // catch 핸들러가 정상적으로 종료되면, third 프로미스의 상태는 fulfill로 변경.
  return 100;
});

// error 프로미스에 핸들러를 등록하였으나, 저장하지 않았음.
error.then(value => {
  // 10. 실행
  // error 프로미스가 third 프로미스에 의해 거부(reject)되었으나, error 프로미스에 등록한 catch 핸들러가 처리 하였다.
  // value로 catch 핸들러가 반환한 값 100이 전달되고 출력.
  console.log('final value', value);
});

console.log('error'); // 5. 출력

