"use client";
import { useContext } from "react";
import { FilterContext } from "@/core/context/filters";
import { Operation } from "@/core/layouts/domain/Operation";

const useFilters = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const filtersOperations = (operations: Operation[]) => {
    return operations.filter((operation) => {
      const operationCategory =
        operation.operationtypeId === 1 ? "Ingreso" : "Gasto";

      // Obtener la fecha actual y de peru
      // const datePeru = new Date().toLocaleString("en-US", {
      //   timeZone: "America/Lima",
      // });

      // 1.
      // return (
      //   operation.mount >= filters.minPrice &&
      //   (filters.category === "All" ||
      //     filters.category === operationCategory) &&
      //   operation.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      //   (filters.date.toLocaleString() === datePeru ||
      //     operation.createdAt?.toString().split("T")[0] ===
      //       filters.date?.toISOString().split("T")[0])
      // );

      // 2.
      return (
        operation.mount >= filters.minPrice &&
        (filters.category === "All" ||
          filters.category === operationCategory) &&
        operation.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        (Number(operation.createdAt?.toString().split("T")[0].split("-")[1]) -
          2 ===
          Number(filters.date.getMonth()) ||
          Number(
            operation.createdAt?.toString().split("T")[0].split("-")[1]
          ) === 6) &&
        Number(operation.createdAt?.toString().split("T")[0].split("-")[0]) ===
          Number(filters.date.getFullYear())
      );
    });
  };

  return { filters, setFilters, filtersOperations };
};

export default useFilters;
