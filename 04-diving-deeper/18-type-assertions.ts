// * 16.0 Бывают случаи, когда мы знаем больше о типе чего-то, чем сам TypeScript, тогда мы можем дать ему подсказку, чтобы лучше понять. Эти подсказки называют «утверждение типа» («type assertions»).
// 16.1 Итак мы находим в DOM элемент canvas и если мы наведём на переменную, куда мы его кладём, то TypeScript определил его как HTMLElement, но мы то знаем его более специфичное определение, как HTMLCanvasElement и можем передать эту информацию TypeScript, чтобы он определил его более точно, добавив "as HTMLCanvasElement" в конец строки.
// ? 16.8 Также стоит знать, что т.к. «утверждение типа» удаляется во время компиляции, то во время исполнения кода нет проверок на утверждения типа и не будет ошибок или сгенерированного null, если утверждение типа было где-то неправильным.

const theCanvas = document.getElementById('the-canvas') as HTMLCanvasElement;

// 16.2 Или, например, у нас есть функция "getNetPrice", которая возвращает результатом либо число, либо строку, в зависимости от булево значения в параметре "format".

function getNetPrice(
  price: number,
  discount: number,
  format: boolean
): number | string {
  let netPrice = price * (1 - discount);
  return format ? `$${netPrice}` : netPrice;
}

// 16.6 Если мы наведём на "netPrice", то увидим, что TS знает лишь о том, что данные могут быть либо строкой, либо числом. Но т.к. мы поставили аргументом "true", то мы знаем, что это строка, поэтому мы можем уточнить, записав в конце строки "as string":

const netPrice = getNetPrice(20, 10, true) as string;

// 16.7 Но также есть и другой вид записи «утверждения типа» в угловых скобках перед выражением:

const netPriceAsANumber = <number>getNetPrice(20, 10, false);
