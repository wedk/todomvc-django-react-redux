// js/components/List.jsx
import React from 'react';


const List = ({concern='', children}) => (
  <ul className={`todo-list ${concern}`}>
    {children}
  </ul>
);


export default List;