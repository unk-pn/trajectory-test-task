import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useEffect, useMemo, useRef } from "react";
import { setSelectedCarId } from "../../../../store/slices/carsSlice";
import { Alert } from "@gravity-ui/uikit";
import c from "./CarsMap.module.css";

export const CarsMap = () => {
  const cars = useAppSelector((state) => state.cars.cars);
  const selectedCarId = useAppSelector((state) => state.cars.selectedCarId);
  const dispatch = useAppDispatch();
  const mapRef = useRef<ymaps.Map | null>(null);

  const error = useMemo(() => {
    if (!selectedCarId) return false;
    const car = cars.find((c) => c.id === selectedCarId);
    return car ? car.latitude === 0 || car.longitude === 0 : false;
  }, [cars, selectedCarId]);

  useEffect(() => {
    if (!selectedCarId || !mapRef.current) return;

    const car = cars.find((c) => c.id === selectedCarId);
    if (car && car.latitude !== 0 && car.longitude !== 0) {
      mapRef.current
        .panTo([car.latitude, car.longitude], { duration: 300 })
        .then(() => mapRef.current?.setZoom(14));
    }
  }, [cars, selectedCarId]);

  const handleCarSelect = (id: number) => {
    const car = cars.find((c) => c.id === id);
    if (car && mapRef.current) {
      if (car.latitude !== 0 && car.longitude !== 0) {
        mapRef.current.setCenter([car.latitude, car.longitude], 14, {
          duration: 300,
        });
      }
    }
    dispatch(setSelectedCarId(id));
  };

  return (
    <YMaps query={{ lang: "ru_RU" }}>
      <h2>Карта машин</h2>
      {error && (
        <Alert
          className={c.error}
          theme="danger"
          title="Ошибка!"
          message={"У этого автомобиля нет координат для отображения на карте"}
        />
      )}
      <Map
        defaultState={{
          center: [59.9384841, 30.312485],
          zoom: 9,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        modules={["control.ZoomControl", "control.FullscreenControl"]}
        width="100%"
        height="500px"
        instanceRef={(ref) => {
          mapRef.current = ref;
        }}
      >
        {cars.map((car) => {
          if (!car.latitude || !car.longitude) return null;
          return (
            <Placemark
              key={car.id}
              geometry={[car.latitude, car.longitude]}
              onClick={() => handleCarSelect(car.id)}
              properties={{
                iconCaption: car.name,
                hintContent: `ID: ${car.id}`,
              }}
              options={{
                preset: "islands#icon",
                iconColor: selectedCarId === car.id ? "#ff0000" : "#4995f8",
              }}
            />
          );
        })}
      </Map>
    </YMaps>
  );
};
