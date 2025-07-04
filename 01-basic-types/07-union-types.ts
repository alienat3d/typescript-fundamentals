// * 5.0 Иногда нам нужно, чтобы переменные имели возможность быть разными типами данных без использования типа "any". Нам всего лишь нужно указать разные типы, разделённые "|".
let booleanOrString: string | boolean = 'I could be changed to boolean.';
booleanOrString = true;

// 5.1 Также можно поступать и с функциями для типов ввода данных и результата.
// 5.2 Если же мы начнём что-то делать внутри функции, что подходит только для одного типа данных, например применим метод "toUpperCase", то TS сразу же сигнализирует об этом. И тогда мы вынуждены будем сделать проверку на тип данных, чтобы устранить ошибку.
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
