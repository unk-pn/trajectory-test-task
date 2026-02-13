import { Button, Modal, TextInput } from "@gravity-ui/uikit";
import c from "./EditCarModal.module.css";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { editCar } from "../../../../store/slices/carsSlice";
import { useCarForm } from "../../hooks";
import type { CarType } from "../../types";

interface EditCarModalProps {
  carId: number;
  onClose: () => void;
}

export const EditCarModal = ({ carId, onClose }: EditCarModalProps) => {
  const dispatch = useAppDispatch();
  const car = useAppSelector((state) =>
    state.cars.cars.find((c) => c.id === carId),
  );

  const initialCarState = {
    id: carId,
    name: car?.name || "",
    price: car?.price || 0,
  };

  const handleSave = (carData: Partial<CarType>) => {
    if (!car) return;
    dispatch(editCar({ ...car, ...carData }));
    onClose();
  };

  const { errors, carData, setCarData, handleSubmit } = useCarForm(
    initialCarState,
    handleSave,
    ["name", "price"],
  );

  return (
    <Modal open onClose={onClose}>
      <div className={c.content}>
        <h3>Редактирование автомобиля (ID: {carId})</h3>
        <form onSubmit={handleSubmit} className={c.form}>
          <label>
            Название
            <TextInput
              type="text"
              value={carData.name}
              onChange={(e) => setCarData({ ...carData, name: e.target.value })}
              placeholder="Введите название"
              validationState={errors.name ? "invalid" : undefined}
              errorMessage={errors.name}
            />
          </label>
          <label>
            Цена
            <TextInput
              type="number"
              value={String(carData.price)}
              onChange={(e) =>
                setCarData({ ...carData, price: Number(e.target.value) })
              }
              placeholder="Введите цену"
              validationState={errors.price ? "invalid" : undefined}
              errorMessage={errors.price}
            />
          </label>
          <div className={c.buttons}>
            <Button type="submit" view="action" width="max">
              Сохранить
            </Button>
            <Button type="button" onClick={onClose} width="max">
              Отмена
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
