import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";


export default function DayListItem(props) {
  const dayClass = classNames(
    "day-list__item",
    {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--dark">{props.name}</h2>
      <h3 className="text--light">
        {props.spots > 0 ? props.spots + ' spot' +(props.spots > 1 ? 's' : '') + ' remaining' : 'no spots remaining'}
        
      </h3>
    </li>
  );
}