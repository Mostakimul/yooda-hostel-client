import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="col-md-3">
      <ul className="list-group sticky-top py-2">
        <NavLink as="li" className="list-group-item" to="/">
          Home
        </NavLink>
        <NavLink as="li" className="list-group-item" to="/show-foods">
          Show All Food
        </NavLink>
        <NavLink as="li" className="list-group-item" to="/add-food">
          Add Food
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
