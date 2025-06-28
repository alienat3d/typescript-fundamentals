enum productSize {
  small,
  medium = 'medium',
  large = 'large',
}

// * 13.0 Также, как мы раньше расширяли interface мы можем сделать и с классами. Создадим ещё один класс "InventoryItm", у которого будут обязательные свойства "name" & "price", и которые должны быть помещены в constructor.
// ? Это позволяет держать каждый из классов в лаконичном виде без повторений и делать изменения только в одном месте, что крайне необходимо для соблюдения чистоты кода.

class InventoryItm {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  buy(): this {
    console.log(this.price);
    return this;
  }
}

// 13.1 И теперь этот класс мы унаследуем от "InventoryItm" и тогда можно избавиться в нём от свойств "name" & "price", которые будут унаследованы автоматически. Однако тут важно помнить, что расширяя класс нужно обязательно вызывать функцию "super" в constructor, чтобы constructor родительского класса также вызывался.

class someProduct extends InventoryItm {
  /* name: string;
  price: number; */
  color: string = 'gray';
  size?: productSize;

  // Но, т.к. нам особенно нечего добавить в constructor дочернего класса, то можно и просто его удалить за ненадобностью.
  /* constructor(name: string, price: number) {
    super(name, price);
		this.name = name;
    this.price = price;
    ...other stuff for someProduct class...
  } */

  /* buy(): void {
    console.log(this.price);
  } */
  // 13.3 Но теперь, чтобы можно было купить не только товары, но и сервис, нам нужно переместить метод "buy" в родительский класс "InventoryItm". ↑
  /* buy(): this {
    console.log(this.price);
    return this;
  } */
}

// 13.2 А теперь опишем ещё один класс "Service". ↑

class Service extends InventoryItm {
  startTime: Date;
  endTime: Date;

  constructor(name: string, price: number, startTime: Date, endTime: Date) {
    super(name, price);
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

const someTShirt = new someProduct('T-Shirt Anime Design', 12);

someTShirt.size = productSize.medium;
someTShirt.color = 'white';

someTShirt.buy();

// 13.4.0 Создадим сервис, например прачечной.
const laundry = new Service(
  'Cleaning T-Shirt',
  3,
  new Date('July 1, 2025 12:00:00'),
  new Date('July 2, 2025 12:00:00')
);

// 13.4.1 А также покупку этого сервиса.
laundry.buy(); // получим цену этого сервиса в консоль
