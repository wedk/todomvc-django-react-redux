// js/utils/PropTypesUtils.js

export function xor(otherProp, propType) {
  return (props, propName, componentName) => {
    if (props[propName] != null && props[otherProp] != null) {
      return new Error(`In ${componentName} expected either prop ${propName} or ${otherProp} to exist.`);
    }
    return propType(props, propName, componentName);
  }
}