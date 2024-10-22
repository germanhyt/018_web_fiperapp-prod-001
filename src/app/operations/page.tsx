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
      const response = await fetch(`/api/operations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({ userId: session?.user?.userId }),
      });

      const operations = await response.json();
      // console.log(operations);
      return operations;
    };

    loadOperations().then((operations) => {
      setOperations(operations);
    });
  }, [session?.user.userId]);

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <AnimatePresence>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="container mx-auto">
          <Filters />
          <Operations operations={filtersOperations(operations)} />
        </div>
      </Suspense>
    </AnimatePresence>
  );
};

export default OperationsPage;
