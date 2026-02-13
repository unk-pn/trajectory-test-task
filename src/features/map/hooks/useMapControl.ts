import { useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";

export const useMapControl = () => {
  const cars = useAppSelector((state) => state.cars.cars);
  const mapRef = useRef<ymaps.Map | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

  const handleCarSelect = (carId: number) => {
    const car = cars.find((c) => c.id === carId);
    if (car && mapRef.current) {
      mapRef.current.setCenter([car.latitude, car.longitude], 14, {
        duration: 300,
      });
      setSelectedCarId(carId);
    }
  };
  
  return { cars, mapRef, selectedCarId, handleCarSelect };
};
