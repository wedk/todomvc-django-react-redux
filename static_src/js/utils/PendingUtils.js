// js/utils/PendingUtils.js
const hasOwnProperty = {}.hasOwnProperty;


function keyById(ary) {
  return ary.reduce((memo, el) => {
    memo[el.id] = el;
    return memo;
  }, {});
}


export function integratePendings(objects, pendingItems) {

  if (objects == null) {
    return [];
  }

  if (!pendingItems || pendingItems.length === 0) {
    return objects;
  }

  const pendingItemsMap = keyById(pendingItems);

  return objects.map((obj) => {

    if (hasOwnProperty.call(pendingItemsMap, obj.id)) {

      const nextAttrs = pendingItemsMap[obj.id];

      let prevAttrs = {};
      for (var key in nextAttrs) {
        if (key != 'id' && key.charAt(0) != '$' && hasOwnProperty.call(nextAttrs, key)) {
          prevAttrs['_' + key] = obj[key];
        }
      }

      return { ...obj, ...nextAttrs, ...prevAttrs, $pending: true };
    }

    return obj;

  });
}