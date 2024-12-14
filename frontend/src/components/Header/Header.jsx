import React from "react";

const Header = ({ title, onToggleSidebar }) => {
  return (
    <div className="mobile-menu flex items-center justify-between p-4 bg-gray-900 text-white md:hidden">
      <button onClick={onToggleSidebar}>
        <span className="material-icons">menu</span>
      </button>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
