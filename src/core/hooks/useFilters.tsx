"use client";
import { useContext } from "react";
import { FilterContext } from "@/core/context/filters";
import { Operation } from "@/core/layouts/domain/Operation";

const useFilters = () => {
  const { filters, setFilters } = useContext(FilterContext);
  // console.log("filters USEFILTERS", filters);

  const filtersOperations = (operations: Operation[]) => {
    return operations.filter((operation) => {
      // console.log("operation FILTERS", operation);
      const operationCategory =
        operation.operationtypeId === 1 ? "Ingreso" : "Gasto";

      // console.log("createdAt", operation.createdAt?.toString());
      // console.log("date 1", filters.date?.toLocaleDateString());
      // console.log("date 2", filters.date?.toISOString());
      // console.log("date 3", filters.date?.toLocaleTimeString());
      // console.log("date 4", filters.date?.toUTCString());

      // Obtener la fehca actual y de peru
      const datePeru = new Date().toLocaleString("en-US", {
        timeZone: "America/Lima",
      });

      return (
        operation.mount >= filters.minPrice &&
        (filters.category === "All" ||
          filters.category === operationCategory) &&
        operation.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (filters.date.toLocaleString() === datePeru ||
          operation.createdAt?.toString().split("T")[0] ===
            filters.date?.toISOString().split("T")[0])
      );
    });
  };

  // const filterChartOperations = (operations: Operation[]) => {
  //   // Filtramos por mes y año
  //   return operations.filter((operation) => {
  //     return (
  //       Number(operation.createdAt?.toString().split("T")[0].split("-")[1]) ===
  //         Number(filters.date.getMonth()) &&
  //       Number(operation.createdAt?.toString().split("T")[0].split("-")[0]) ===
  //         Number(filters.date.getFullYear())
  //     );
  //   });
  // };

  // console.log("filtersOperations001", filtersOperations);

  return { filters, setFilters, filtersOperations };
};

export default useFilters;
