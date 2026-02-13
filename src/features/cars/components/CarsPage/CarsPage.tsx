import { useCallback, useRef, useState } from "react";
import { CarComponent } from "../CarComponent/CarComponent";
import { EditCarModal } from "../EditCarModal/EditCarModal";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  deleteCar,
  setSelectedCarId,
} from "../../../../store/slices/carsSlice";
import { CreateCarModal } from "../CreateCarModal/CreateCarModal";
import { Alert, Button, Checkbox, HelpMark, Select } from "@gravity-ui/uikit";
import c from "./CarsPage.module.css";
import { Loader } from "../../../../components/Loader";
import {
  useCarsSorting,
  type SortField,
  type SortOrder,
} from "../../hooks/useCarsSorting";
import { useFetchCars } from "../../hooks/useFetchCars";
import { CarsMap } from "../../../map/components";

export const CarsPage = () => {
  const [editingCarId, setEditingCarId] = useState<number | null>(null);
  const [creatingCar, setCreatingCar] = useState(false);
  const [prefersGrid, setPrefersGrid] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.cars.cars);

  const { loading, error } = useFetchCars();
  const {
    sortedCars,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    fieldOptions,
    orderOptions,
  } = useCarsSorting(cars);

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteCar(id));
    },
    [dispatch],
  );

  const handleShowOnMap = useCallback(
    (id: number) => {
      dispatch(setSelectedCarId(id));
      mapRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [dispatch],
  );

  return (
    <div>
      <h1>Список машин</h1>
      <Button
        onClick={() => setCreatingCar(true)}
        style={{ marginBottom: "20px" }}
      >
        Создать машину
      </Button>

      <div className={c.sorting}>
        <h2 className={c.sorting_title}>Сортировка</h2>
        <div className={c.sorting_select}>
          <Select
            value={[sortField]}
            options={fieldOptions}
            onUpdate={(value) => setSortField(value[0] as SortField)}
          />
          <Select
            value={[sortOrder]}
            options={orderOptions}
            onUpdate={(value) => setSortOrder(value[0] as SortOrder)}
          />
        </div>
        <div className={c.gridToggle}>
          <Checkbox
            className={c.gridToggle_checkbox}
            content="Использовать Grid"
            checked={prefersGrid}
            onUpdate={setPrefersGrid}
          />
          <HelpMark className={c.gridToggle_helpMark}>
            На телефонах не поддерживается :(
          </HelpMark>
        </div>
      </div>

      {loading && <Loader />}
      {error && <Alert theme="danger" title="Ошибка!" message={error} />}

      <div className={prefersGrid ? c.carsGrid : undefined}>
        {sortedCars.map((car) => (
          <CarComponent
            key={car.id}
            car={car}
            onEdit={() => setEditingCarId(car.id)}
            onDelete={() => handleDelete(car.id)}
            onShowOnMap={() => handleShowOnMap(car.id)}
          />
        ))}
      </div>

      <div ref={mapRef}>
        <CarsMap />
      </div>

      {editingCarId && (
        <EditCarModal
          carId={editingCarId}
          onClose={() => setEditingCarId(null)}
        />
      )}

      {creatingCar && <CreateCarModal onClose={() => setCreatingCar(false)} />}
    </div>
  );
};
