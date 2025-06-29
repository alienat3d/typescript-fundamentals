enum Sizes2 {
  small,
  medium = 'medium',
  large = 'large',
}

// * 14.0 Иногда необходимо удостовериться, что классы придерживаются определённой формы, что они поддерживают конкретные свойства и\или методы. Ну, и как мы использовали interface для объектов, мы можем сделать тоже и для классов.
// 14.1 Создадим новый интерфейс Emailable, где укажем, чтобы объект считался пригодным для отсылки по Email он должен содержать тело и-мейла "emailBody", а также заголовок "emailSubject" as strings. Мы можем также описать методы в interface, т.ч. сделаем их методами. Теперь этот interface говорит следующие: "каждая сущность, что будет использовать меня как тип должен содержать в себе методы `emailBody` & `emailSubject`, которые возвращают результатом строковый тип данных". ↓

interface Emailable {
  emailBody(): string;
  emailSubject(): string;
}

class InventoryItem2 {
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

class Product2 extends InventoryItem2 {
  color: string = 'gray';
  size?: Sizes2;
}

// 14.2 Теперь, если мы хотим сделать сервисы Emailable, то мы допишем также "implements Emailable". Теперь мы будем обязаны добавить в этот класс всё описанное в interface Emailable и пока это условие не будет выполнено мы будем видеть ошибку TS. Также, если навести на подчёркнутое красным слово, то мы увидим подробное описание, что именно нам нужно добавить, что весьма удобно.

class Service2 extends InventoryItem2 implements Emailable {
  startTime: Date;
  endTime: Date;

  constructor(name: string, price: number, startTime: Date, endTime: Date) {
    super(name, price);
    this.startTime = startTime;
    this.endTime = endTime;
  }

  emailBody() {
    return `Thank you for the purchasing ${this.name}. Your appointment starts at ${this.startTime} and ends at ${this.endTime}.`;
  }
  emailSubject() {
    return `${this.name} | Zaplin Company`;
  }
}

// 14.3 Но чем это на самом деле полезно? Представим, что у нас есть функция отправки email, которая первым аргументом получит "emailable" с интерфейсом "Emailable", а "to" (адрес email строкой) вторым. Теперь TS проверяет, чтобы внутри функции обязательно присутствовали описанные в interface методы и были названы именно так, как они названы там. ↓

function sendEmail(emailable: Emailable, to: string) {
  console.log('Body:', emailable.emailBody());
  console.log('Subject:', emailable.emailSubject());
  console.log('To:', to);
}

const tShirt2 = new Product2('T-Shirt Anime Design', 12);

tShirt2.size = Sizes2.medium;
tShirt2.color = 'white';

tShirt2.buy();

const laundry2 = new Service2(
  'Cleaning T-Shirt',
  3,
  new Date('July 1, 2025 12:00:00'),
  new Date('July 2, 2025 12:00:00')
);

laundry2.buy();

// 14.4 Теперь, если мы попытаемся в эту функцию аргументом засунуть например "tShirt2", TS сразу сигнализирует, что что-то происходит не то. Однако, если подставить сюда laundry2, то ошибок не будет и всё сработает, как ожидалось.

sendEmail(laundry2, 'webdev@zapl.in');
