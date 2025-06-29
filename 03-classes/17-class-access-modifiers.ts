// * 15.0 Похожим образом на другие ООП-языки TypeScript позволяет нам определять области виденья свойств и методов класса. Они называются «модификаторы видимости» или «модификаторы доступа» (visibility modifiers | access modifiers). Видимость по умолчанию "public", т.е. значит, что мы можем получать доступ к и изменять свойства с таким модификатором снаружи класса.
// 15.1 Однако, если поменять модификатор на "protected", то доступ к этим свойства снаружи будет закрыт, однако дочерние элементы будут всё ещё иметь доступ.
// 15.3 Есть ещё "readonly" модификатор, это значит, что можно получить доступ для считывания информации в любое время откуда угодно, но нельзя изменить откуда либо, кроме конструктора внутри самого класса.

class Employee {
  readonly age: number;
  public name: string; /* То же самое, что и без ключ. слова перед названием, т.к. "public" ставится всем по умолчанию. */
  protected company: string = 'Zaplin Studio';

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Housecleaner extends Employee {
  constructor(name: string, age: number) {
    super(name, age);
    this.company = 'Zauber Sauber GmbH';
  }
}

// 15.2 "private" же закроет доступ отовсюду, кроме внутри самого класса. Даже из дочерних доступ к нему будет закрыт. ↑

class CEO extends Employee {
  private adminPassword: string = "I'm the coolest CEO of the world!";

  constructor(name: string, age: number, adminPassword: string) {
    super(name, age);
    this.adminPassword = adminPassword;
  }
}

const jenny = new Employee('Jenny Jameson', 40);
const al = new CEO('Al Zaplin', 38, "I'm CEO, guys!");

jenny.age = 41;
jenny.name = 'Jacky';
jenny.company = 'IBM';
al.adminPassword = '1234';
console.log(al.adminPassword);
console.log(jenny.age);
