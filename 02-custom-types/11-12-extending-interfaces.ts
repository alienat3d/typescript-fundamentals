// * 9.0 Ещё одна фича interface это "extend". Представим, что компания, которая продаёт эти продукты, также предоставляет какие-то сервисы, которые нужно описать похожим, но всё таки другим образом. Мы создадим ещё один interface и скажем, что он будет расширен другим.

interface InventoryItem {
  name: string;
  price: number;
}

// 9.1 Теперь нам больше не нужно указывать "name" & "price" в Article, т.к. они наследуются от "InventoryItem" (похоже на наследование классов в JS).

interface Article extends InventoryItem {
  // name: string;
  // price: number;
  color?: string;
}

// 9.2 Также добавим interface для сервисов, которые также будут содержать поля "name" & "price", а значит логично будет также унаследовать его от "InventoryItem". Но они также будут содержать поля уникальные для сервиса, такие как начало осуществления сервиса и его окончание (они будут в формате времени JS-объекта Date).

interface Service extends InventoryItem {
  startTime: Date;
  endTime: Date;
}

const newTShirt: Product = {
  name: 'T-Shirt (Anime Design)',
  price: 10,
};

// 9.3 Теперь добавим новый объект как тип "Service", где нам нужно указать поля, как из самого Service, так и из interface, из которого он наследуется, т.е. "InventoryItem" ("name" & "price", а также "startTime" & "endTime").

const photoShoot: Service = {
  name: 'Kelly Wedding Photo Shoot',
  price: 50,
  startTime: new Date('July 10, 2025, 10:10:00'),
  endTime: new Date('July 10, 2025, 11:10:00'),
  // color: 'blue' - недопустимое поле, т.к. оно принадлежит только типу Article
};

// * 10.0 interface может быть использован также для определения типов данных параметров функции. Рассмотрим эту возможность на функции "purchaseItem", которая должна принять параметр типа "InventoryItem":
// 10.1 Если мы наберём "item." то нам будет доступен список названий всех полей доступных типу "InventoryItem", что очень удобно.
// 10.4 И конечно мы можем также использовать interface, чтобы определить тип возвращаемого результата.

function purchaseItem(item: InventoryItem): InventoryItem {
  console.log(item.name);

  return item;
}

// 10.2 Также и при вызове этой функции с объектом внутри в качестве аргумента, то TS будет выделять его красным, пока не будут заполнены все поля отвечающие описанию типа "InventoryItem".

purchaseItem({
  price: 7,
  name: 'something',
});

// 10.3 Но мы могли бы также помесить в эту функцию и название переменной, например newTShirt или photoShooting, т.к. содержимое и той и другой отвечает необходимым требованиям типа "InventoryItem".
purchaseItem(newTShirt);

purchaseItem(photoShoot);
