"use client";
import { createContext, useState } from "react";
import { ReactNode } from "react";
import { datePeru } from "../helpers/DateHelper";

interface IProps {
  children: ReactNode;
}

interface Filters {
  minPrice: number;
  category: string;
  title: string;
  date: Date;
}

interface FiltersContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const FilterContext = createContext<FiltersContextType>({
  filters: {
    minPrice: 0,
    category: "",
    title: "",
    // horario de éru
    date: new Date(),
  },
  setFilters: () => {},
});

const FiltersProvider = ({ children }: IProps) => {
  const [filters, setFilters] = useState<Filters>({
    minPrice: 0,
    category: "All",
    title: "",
    date: new Date(),
  });

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FiltersProvider;
