import React from 'react'

const ProductCategories = ({img, text,borderColor}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-2 min-w-[62px] min-h-[84px] max-w-[62px] max-h-[84px]  gap-y-2 border border-[${borderColor}] rounded-[30px]`}
    >
      <img src={img} alt={text} className="w-[42px] h-[42px]" />
      <p className="text-[#303030] text-[10px] md:text-xs">{text}</p>
    </div>
  );
}

export default ProductCategories