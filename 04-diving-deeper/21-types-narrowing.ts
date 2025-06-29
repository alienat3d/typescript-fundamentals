// * 19.0 Бывают моменты, когда нам нужно отходить от более либерального перечисления типов вроде "union types", созданных из строк и массивов строк: "string | string[]" к более строгому определению типа, как например только массив строк "string[]". Чтобы это делать прибегнем к тому, что называется «ограничение типов».
// 19.1 Для демонстрации создадим функцию "reverse", которая результатом вернёт строку, в которой порядок символов будет изменён на противоположный или в массиве строк порядок элементов массива будет изменён на противоположный.
// 19.2 Итак, само ограничение типов происходит за счёт простых условий, знакомых по JS, но в TS у них особое имя "хранители типов". Итак, мы используем внутри тела функции хранитель типов "typeof", чтобы проверить, что тип данных строчный, иначе мы будем обрабатывать их, как массив строк.
// 19.3 Для начала мы разделим строку на отдельные символы в массив, в котором они будут отдельным элементом. Затем используем на получившемся массиве метод массивов "reverse", который поменяет порядок следования элементов в массиве на противоположный. А с помощью метода "join" соединим снова их все в единую строку.
// 19.4 Нам также нужно обработать и массив. Для начала клонируем массив спред-оператором (т.к. массив это ссылочный тип) и используем "reverse" на уже новой копии массива.

const reverse = (value: string | string[]) => {
  if (typeof value === 'string') {
    return value.split('').reverse().join('');
  } else {
    return [...value].reverse();
  }
};

console.log(reverse('123')); // result: '321'
console.log(reverse(['1', '2', '3'])); // result: ['3', '2', '1']

// 19.5 Хорошо, хранители типов "typeof" работают замечательно для примитивов, но есть и другие случаи, где значения могут быть более сложными. Попробуем проделать что-то подобное уже с классами. Итак, у нас есть класс человека и компании. В то время как у компании только одно название, то у человека есть имя и фамилия. И мы создадим функцию "greet", которая будет приветствовать либо человека, называя его Имя и Фамилию, либо называть компанию.

class Person {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Company {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// 19.5 Но как нам теперь отличить человека от компании? Здесь мы можем использовать хранитель типов "instanceof".

function greet(entity: Person | Company) {
  if (entity instanceof Person) {
    console.log(`Hello ${entity.firstName} ${entity.lastName}`);
  } else {
    console.log(`Hello ${entity.name}`);
  }
}

greet(new Person('Al', 'Zaplin'));
greet(new Company('Zaplin Studio'));

// 19.6 А что, если бы у нас были не классы, а interface, как тогда проверять?

interface Person2 {
  firstName: string;
  lastName: string;
}

interface Company {
  name: string;
}

// 19.7 Проверка меняется на следующую:

function greet2(entity: Person2 | Company) {
  if ('firstName' in entity) {
    console.log(`Hello ${entity.firstName} ${entity.lastName}`);
  } else {
    console.log(`Hello ${entity.name}`);
  }
}

// 19.8 Также и вызов функции изменится на, чтобы использовать объекты, подходящие для interface:

greet2({ firstName: 'Al', lastName: 'Zaplin' });
greet2({ name: 'Zaplin Studio' });
