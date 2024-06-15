"use client";

import { useEffect, useState } from "react";
import Chart from "@/components/Chart";
import { Operation } from "@/core/layouts/domain";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const { status } = useSession();

  useEffect(() => {
    const loadOperations = async (): Promise<Operation[]> => {
      const response = await fetch("/api/operations");
      const operations = await response.json();
      // console.log("operations", operations);
      return operations;
    };

    loadOperations().then((operations) => {
      setOperations(operations);
    });
  }, []);

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  // Balance entre ingresos y gastos totales
  const balance = operations.reduce((acc, operation) => {
    if (operation.operationtypeId === 1) {
      return acc + operation.mount;
    } else {
      return acc - operation.mount;
    }
  }, 0);

  // Cantidad total de operaciones realizados
  const totalOperations = operations.length;

  return (
    <section className="bg-slate-100">
      <div className="container mx-auto">
        <h2 className="py-6 text-center">Dashboard General de Operaciones</h2>
        <div className="my-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="py-1 px-2 border-2 border-black rounded-lg flex flex-col">
            <p className="font-bold">Balance Total:</p>
            <p>s/.{balance}</p>
          </div>
          <div className="py-1 px-2 border-2 border-black rounded-lg ">
            <p className="font-bold">Cantidad de Operaciones:</p>
            <p>{totalOperations}</p>
          </div>
        </div>
        <Chart operations={operations} />
      </div>
    </section>
  );
};

export default DashboardPage;
