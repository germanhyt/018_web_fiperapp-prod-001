import { Operation } from "@/core/layouts/domain/Operation";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IProps {
  operations: Operation[];
}

const Operations = ({ operations }: IProps) => {
  // Hooks
  const router = useRouter();
  //   const [operations, setOperations] = useState<Operation[]>([]);

  //   useEffect(() => {
  //     const loadOperations = async (): Promise<Operation[]> => {
  //       const response = await fetch("/api/operations");
  //       const operations = await response.json();
  //       return operations;
  //     };

  //     loadOperations().then((operations) => {
  //       setOperations(operations);
  //     });
  //   }, []);

  return (
    <div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
      >
        <h3 className="font-bold py-2">Lista de Operaciones o Movimientos </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {operations.map((operation) => (
            <div
              key={operation.id}
              onClick={() => {
                router.refresh();
                router.push("/operations/edit/" + operation.id);
              }}
              className="bg-white shadow-lg rounded-lg p-4 hover:border-2 hover:border-black hover:scale-[1.05] transition duration-200 ease-out cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{operation.title}</h3>
              <p>Apunte: {operation.description}</p>
              <p>Monto: s/.{operation.mount}</p>
              <p>Fecha: {operation.createdAt?.toString().split("T")[0]}</p>
              <p>
                Tipo de Operacion:{" "}
                {operation.operationtypeId === 1 ? "Ingreso" : "Gasto"}
              </p>
            </div>
          ))}
        </div>
        {/* <table className="table-auto">
          <thead>
            <tr>W
              <th>Id</th>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Tipo de Operacion</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((operation) => (
              <tr key={operation.id}>
                <td>{operation.id}</td>
                <td>{operation.title}</td>
                <td>{operation.description}</td>
                <td>{operation.mount}</td>
                <td>{operation.createdAt?.toLocaleString()}</td>
                <td>{operation.operationtypeId}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </motion.section>
    </div>
  );
};

export default Operations;
