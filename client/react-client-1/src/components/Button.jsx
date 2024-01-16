import React from 'react'

const Button = ({onCategoryChange}) => {
    const categories = ['ALL', 'MAN', 'WOMEN', 'BAG', 'SHOES'];

  return (
    <div className="musthave__nav flex justify-center mb-6">
    {categories.map(category => (
      <a
        key={category}
        href="#"
        onClick={() => onCategoryChange(category)}
        className="mr-4 text-gray-500 hover:text-black transition font-bold"
      >
        {category}
      </a>
    ))}
  </div>
  )
}

export default Button