import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatchFilterOptions, useFilterOptions } from '../FilterContext/FilterContext';

function valueLabelFormat(value) {
   const mark = marks.find((mark) => mark.value === value);
   return mark ? mark.label : value;
}

function getYearLabels(valueArray) {
   return valueArray.map(value => {
      const mark = marks.find((mark) => mark.value === value);
      return mark ? mark.label : value;
   });
}

function RangeSlider({ sx }) {
   const years = useFilterOptions().years;
   const dispatch = useDispatchFilterOptions();

   // Убедимся, что значения являются числами
   const sliderValue = Array.isArray(years.value)
                       ? years.value.map(val => Number(val))
                       : [20, 50];

   const handleChange = (event, newValue) => {
      // Преобразуем в числа на всякий случай
      const numericValue = newValue.map(val => Number(val));
      const yearLabels = getYearLabels(numericValue);

      dispatch({
         type: 'YEARS_CHANGE',
         value: numericValue,
         years: yearLabels
      });
   };

   return (
       <Box sx={{ width: '95%', alignSelf: 'center' }}>
          <Slider
              sx={sx}
              value={sliderValue}
              onChange={handleChange}
              valueLabelDisplay="on"
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valueLabelFormat}
              step={1}
              marks={filteredMarks}
              min={0}
              max={100}
          />
       </Box>
   );
}

const marks = [
   { value: 0, label: 1925 },
   { value: 1, label: 1926 },
   { value: 2, label: 1927 },
   { value: 3, label: 1928 },
   { value: 4, label: 1929 },
   { value: 5, label: 1930 },
   { value: 6, label: 1931 },
   { value: 7, label: 1932 },
   { value: 8, label: 1933 },
   { value: 9, label: 1934 },
   { value: 10, label: 1935 },
   { value: 11, label: 1936 },
   { value: 12, label: 1937 },
   { value: 13, label: 1938 },
   { value: 14, label: 1939 },
   { value: 15, label: 1940 },
   { value: 16, label: 1941 },
   { value: 17, label: 1942 },
   { value: 18, label: 1943 },
   { value: 19, label: 1944 },
   { value: 20, label: 1945 },
   { value: 21, label: 1946 },
   { value: 22, label: 1947 },
   { value: 23, label: 1948 },
   { value: 24, label: 1949 },
   { value: 25, label: 1950 },
   { value: 26, label: 1951 },
   { value: 27, label: 1952 },
   { value: 28, label: 1953 },
   { value: 29, label: 1954 },
   { value: 30, label: 1955 },
   { value: 31, label: 1956 },
   { value: 32, label: 1957 },
   { value: 33, label: 1958 },
   { value: 34, label: 1959 },
   { value: 35, label: 1960 },
   { value: 36, label: 1961 },
   { value: 37, label: 1962 },
   { value: 38, label: 1963 },
   { value: 39, label: 1964 },
   { value: 40, label: 1965 },
   { value: 41, label: 1966 },
   { value: 42, label: 1967 },
   { value: 43, label: 1968 },
   { value: 44, label: 1969 },
   { value: 45, label: 1970 },
   { value: 46, label: 1971 },
   { value: 47, label: 1972 },
   { value: 48, label: 1973 },
   { value: 49, label: 1974 },
   { value: 50, label: 1975 },
   { value: 51, label: 1976 },
   { value: 52, label: 1977 },
   { value: 53, label: 1978 },
   { value: 54, label: 1979 },
   { value: 55, label: 1980 },
   { value: 56, label: 1981 },
   { value: 57, label: 1982 },
   { value: 58, label: 1983 },
   { value: 59, label: 1984 },
   { value: 60, label: 1985 },
   { value: 61, label: 1986 },
   { value: 62, label: 1987 },
   { value: 63, label: 1988 },
   { value: 64, label: 1989 },
   { value: 65, label: 1990 },
   { value: 66, label: 1991 },
   { value: 67, label: 1992 },
   { value: 68, label: 1993 },
   { value: 69, label: 1994 },
   { value: 70, label: 1995 },
   { value: 71, label: 1996 },
   { value: 72, label: 1997 },
   { value: 73, label: 1998 },
   { value: 74, label: 1999 },
   { value: 75, label: 2000 },
   { value: 76, label: 2001 },
   { value: 77, label: 2002 },
   { value: 78, label: 2003 },
   { value: 79, label: 2004 },
   { value: 80, label: 2005 },
   { value: 81, label: 2006 },
   { value: 82, label: 2007 },
   { value: 83, label: 2008 },
   { value: 84, label: 2009 },
   { value: 85, label: 2010 },
   { value: 86, label: 2011 },
   { value: 87, label: 2012 },
   { value: 88, label: 2013 },
   { value: 89, label: 2014 },
   { value: 90, label: 2015 },
   { value: 91, label: 2016 },
   { value: 92, label: 2017 },
   { value: 93, label: 2018 },
   { value: 94, label: 2019 },
   { value: 95, label: 2020 },
   { value: 96, label: 2021 },
   { value: 97, label: 2022 },
   { value: 98, label: 2023 },
   { value: 99, label: 2024 },
   { value: 100, label: 2025 },
];
const filteredMarks = marks.filter(mark => mark.value % 25 === 0);

export default RangeSlider;