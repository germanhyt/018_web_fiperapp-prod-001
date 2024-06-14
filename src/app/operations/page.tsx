"use client";
import Filters from "@/components/Filters";
import Operations from "@/components/Operations";
import useFilters from "@/core/hooks/useFilters";
import { Operation } from "@/core/layouts/domain";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const OperationsPage = () => {
  const { filtersOperations } = useFilters();
  const [operations, setOperations] = useState<Operation[]>([]);
  // Session
  const { data: session, status } = useSession();

  useEffect(() => {
    const loadOperations = async (): Promise<Operation[]> => {
      const response = await fetch("/api/operations", {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${session?.user?.token}`,
        },
      });
      const operations = await response.json();
      return operations;
    };

    loadOperations().then((operations) => {
      setOperations(operations);
    });
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // useEffect(() => {
  //   let filteredOperations: Operation[] = []; // Initialize filteredOperations as an empty array
  //   if (operations.length > 0) {
  //     console.log("operations2", operations);
  //     operations.forEach(
  //       (operation: Operation) =>
  //         filteredOperations.push(...filtersOperations([operation])) // Wrap operation inside an array
  //     );
  //     console.log("filteredOperations", filteredOperations);
  //   }
  // }, [filtersOperations, operations]);

  return (
    <AnimatePresence>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="container mx-auto">
          {/* <div>
            <code>{JSON.stringify(session, null, 2)}</code>
          </div> */}
          <Filters />
          <Operations operations={filtersOperations(operations)} />
        </div>
      </Suspense>
    </AnimatePresence>
  );
};

export default OperationsPage;
