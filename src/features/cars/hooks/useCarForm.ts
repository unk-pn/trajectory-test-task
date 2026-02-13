import { useState } from "react";
import {
  useCarFormsValidation,
  type ValidationFields,
} from "./useCarFormsValidation";
import type { CarType } from "../types";

export const useCarForm = (
  initialData: Partial<CarType>,
  onSave: (carData: Partial<CarType>) => void,
  fieldsToValidate?: ValidationFields,
) => {
  const [carData, setCarData] = useState({ ...initialData });
  const { errors, validate, resetErrors } = useCarFormsValidation(
    carData,
    fieldsToValidate,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(carData);
    resetErrors();
  };

  return { errors, carData, setCarData, handleSubmit };
};
