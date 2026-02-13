import { useState } from "react";
import type { CarType } from "../types";

type ValidationErrors = Partial<Record<keyof CarType, string>>;
export type ValidationFields = (keyof CarType)[];

export const useCarFormsValidation = (
  carData: Partial<CarType>,
  validationFields?: ValidationFields,
) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    const fields = validationFields || [
      "name",
      "model",
      "year",
      "color",
      "price",
    ];

    if (fields.includes("name") && !carData.name?.trim())
      newErrors.name = "Название обязательно";
    if (fields.includes("model") && !carData.model?.trim())
      newErrors.model = "Модель обязательна";
    if (fields.includes("year") && !carData.year)
      newErrors.year = "Год обязателен";
    if (fields.includes("color") && !carData.color?.trim())
      newErrors.color = "Цвет обязателен";
    if (fields.includes("price") && (!carData.price || carData.price <= 0))
      newErrors.price = "Цена должна быть больше нуля";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => setErrors({});

  return { errors, validate, resetErrors };
};
