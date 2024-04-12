import { useCallback, useState } from "react";
import { IconType } from "react-icons";
import queryString from 'query-string';
import { createSearchParams, useSearchParams } from "react-router-dom";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  description?: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected
}) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [currentQuery , setCurrentQuery] = useState(queryString.parse(searchParams.toString()));
  
  const handleClick = () => {
    
    if(searchParams) {
      setCurrentQuery(queryString.parse(searchParams.toString()));
    }
    
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    };
    console.log('SEARCH PARAM OUTPUT', {test: searchParams.getAll('category')});

    if(searchParams.has('category', label)) {
      delete updatedQuery.category;
    }

    setSearchParams(updatedQuery);
  
  };
  return (
    <>
    <pre>{JSON.stringify({searchParams}, null, 2)}</pre>
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer 
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}`
      }
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
    </>
  );
};

export default CategoryBox;