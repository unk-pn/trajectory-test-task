import { useMemo, useState } from "react";
import type { CarType } from "../types/CarType";

export type SortField = "year" | "price" | "none";
export type SortOrder = "asc" | "desc";

export const useCarsSorting = (cars: CarType[]) => {
  const [sortField, setSortField] = useState<SortField>("none");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const sortedCars = useMemo(() => {
    if (sortField === "none") return cars;

    const sorted = [...cars];
    const direction = sortOrder === "asc" ? 1 : -1;

    return sorted.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return (valA - valB) * direction;
    });
  }, [cars, sortField, sortOrder]);

  const fieldOptions = [
    { value: "none", content: "Не сортировать" },
    { value: "year", content: "По году" },
    { value: "price", content: "По цене" },
  ];

  const orderOptions = [
    { value: "asc", content: "По возрастанию" },
    { value: "desc", content: "По убыванию" },
  ];

  return {
    sortedCars,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    fieldOptions,
    orderOptions,
  };
};
