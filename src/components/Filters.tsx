"use client";

import useFilters from "@/core/hooks/useFilters";
import React, { useId } from "react";
import { FiSearch } from "react-icons/fi";
import "./components.css";

const Filters = () => {
  const { filters, setFilters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setFilters({ ...filters, minPrice: Number(e.target.value) });
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.value);
    setFilters({ ...filters, category: e.target.value });
  };

  return (
    <section className="my-12">
      <h3 className="font-bold">Filtros </h3>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 ">
        <div className="flex gap-2 items-center justify-center">
          <span className="p-2.5 shadow-lg rounded-lg cursor-pointer">
            <FiSearch className="w-5 h-5 text-green-700 font-bold" />
          </span>
          <input
            type="text"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            className="border border-green-800 py-1 px-2 rounded-lg w-full sm-w-fit  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-500 ease-in-out"
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          {/* // 1. */}
          {/* <label htmlFor={minPriceFilterId}>Fecha</label>
          <input
            type="date"
            value={filters.date.toISOString().split("T")[0]}
            onChange={(e) => {
              // console.log("original", e.target.value);
              // console.log("copy", e.target.value.split("T")[0]);

              // validar si se borra la fecha
              if (e.target.value === "") {
                setFilters({ ...filters, date: new Date() });
                return;
              }

              setFilters({ ...filters, date: new Date(e.target.value) });
            }}
            className="border border-green-800 py-1 px-2 rounded-lg w-full sm-w-fit  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-500 ease-in-out"
          /> */}

          {/* // 2. */}
          {/* Filtrar por Mes  */}
          <label htmlFor={minPriceFilterId}>Mes</label>
          <input
            type="month"
            value={filters.date.toISOString().split("T")[0].slice(0, 7)}
            onChange={(e) => {
              console.log("original", e.target.value);
              if (e.target.value === "") {
                setFilters({ ...filters, date: new Date() });
                return;
              }

              setFilters({ ...filters, date: new Date(e.target.value) });
            }}
            className="border border-green-800 py-1 px-2 rounded-lg w-full sm-w-fit  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-500 ease-in-out"
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <label htmlFor={minPriceFilterId}>Precio Min. (s/.50)</label>
          <input
            id={minPriceFilterId}
            type="range"
            min={0}
            max={100}
            value={filters.minPrice}
            onChange={handleChangeMinPrice}
            className="text-green-800 "
          />
          <span>s./{filters.minPrice}</span>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <label htmlFor={categoryFilterId}>Categoria</label>
          <select
            id={categoryFilterId}
            value={filters.category}
            onChange={handleChangeCategory}
            className="px-4 py-2 border shadow-lg border-green-800 rounded-lg "
          >
            <option value="All">All</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Gasto">Gasto</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Filters;
