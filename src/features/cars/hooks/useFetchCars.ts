import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { setCars } from "../../../store/slices/carsSlice";

export const useFetchCars = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://task.tspb.su/test-task/vehicles");
        if (!res.ok || res.status === 404) {
          setError("Произошла неизвестная ошибка. Пожалуйста, повторите позже");
          return;
        }
        const data = await res.json();
        dispatch(setCars(data));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [dispatch]);

  return { error, loading };
};
