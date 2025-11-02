import React, { createContext, useContext } from 'react';

export const FilterContext = createContext(null);
export const FilterDispatchContext = createContext(null);

export function FilterProvider ({ children }) {
   const [filterOptions, dispatchFilterOptions] = React.useReducer(filterReducer, initialState);

   return (
       <FilterContext value={filterOptions}>
          <FilterDispatchContext value={dispatchFilterOptions}>
             {children}
          </FilterDispatchContext>
       </FilterContext>
   );
}

export function useFilterOptions () {
   return useContext(FilterContext);
}

export function useDispatchFilterOptions () {
   return useContext(FilterDispatchContext);
}

const initialState = {
   sortBy: 'popular',
   years : {
      value : [75, 90],
      labels: [2000, 2015],
   },
   genres: [],
};

function filterReducer (filterOptions, action) {
   switch (action.type) {
      case 'CLEAR_FILTERS': {
         return initialState;
      }
      case 'SORT_CHANGE': {
         return ({
            ...filterOptions,
            sortBy: action.value.props.value,
         });
      }
      case 'YEARS_CHANGE': {
         return ({
            ...filterOptions,
            years: {
               value : action.value,
               labels: action.years,
            },
         });
      }
      case 'GENRES_CHANGE': {
         return ({
            ...filterOptions,
            genres: action.value,
         });
      }
      default:
         return filterOptions;
   }
}