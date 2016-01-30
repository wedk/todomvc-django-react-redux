// js/utils/ComponentUtils.js

export function bindHandlers(self, ...list) {
  list.forEach(func => self[func] = self[func].bind(self));
}