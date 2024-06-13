import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuCard({ menu_name, imageUrl }) {
  return (
    <Link to={`/category/${menu_name}`} className="flex bg-transparent flex-col items-center max-w-xs rounded overflow-hidden shadow-lg m-4">
      <img className="w-32 h-32 rounded-full" src={imageUrl} alt={menu_name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-yellow-500 text-center mb-2">{menu_name}</div>
      </div>
    </Link>
  );
}