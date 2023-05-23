class Animal {
  speak() {
    return "I'm an animal.";
  }
}

class Dog extends Animal {
  speak() {
    return "Woof!";
  }

  bark () {
    return 'bark';
  }
}

class Cat extends Animal {
  speak() {
    return "Meow!";
  }
}

type AnimalHandler = (animal: Animal) => void;
type DogHandler = (dog: Dog) => void;

const myDogHandler: DogHandler = (dog: Dog) => {
  console.log(dog.bark());
};

const myAnimalHandler: AnimalHandler = (animal: Animal) => {
  console.log(animal.speak());
};

function handleAnimals(handler: AnimalHandler, animal: Animal) {
  handler(animal);
}

handleAnimals(myAnimalHandler, new Dog());

/**
 * TODO
 *  - 제네릭의 공변성과 반 공변성
 *  - 제네릭의 공변성과 반 공변성은 함수나 메서드 레벨에서 이루어지는 개념이다.
 *  - Dog 객체는 Animal객체의 하위 타입이다.
 *  - 함수나 메서드의 타입은 반 공변성을 따른다.
 *  - 따라서 함수의 인자 타입에서는 공변성이 뒤집혀서 Animal은 Dog의 하위타입이 된다.
 *  - 모든 타입 시스템에서, 하위 타입은 상위 타입을 대체할 수 있다.
 *  - 하지만 이 경우, Animal은 Dog의 하위 타입이 되므로 상위 타입인 Dog는 하위 타입인 Animal을 대체할 수 없다.
 *  - 만약 지금 IDE에서처럼 대체할 수 있게 허용하게 된다면, handleAnimals 내부의 handler가 실행될때 Cat 객체가 전달되어 오류가 발생되게 된다.
 *  - https://stackoverflow.com/questions/4343202/difference-between-super-t-and-extends-t-in-java 이건 자바 예제
 */
handleAnimals(myDogHandler, new Cat()); // Error // Stric type 옵션이 꺼져 있어서 에러가 안나는 것 뿐. 플레이 그라운드에서는 에러
