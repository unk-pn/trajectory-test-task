import { Button, Modal, TextInput } from "@gravity-ui/uikit";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { addCar } from "../../../../store/slices/carsSlice";
import type { CarType } from "../../types/CarType";
import c from "./CreateCarModal.module.css";
import { useCarForm } from "../../hooks";

interface CreateCarModalProps {
  onClose: () => void;
}

const initialCarState: CarType = {
  id: 0,
  name: "",
  model: "",
  year: 0,
  color: "",
  price: 0,
  latitude: 0,
  longitude: 0,
};

export const CreateCarModal = ({ onClose }: CreateCarModalProps) => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.cars.cars);

  const handleSave = (carData: Partial<CarType>) => {
    const newId =
      cars.length === 0 ? 1 : Math.max(...cars.map((c) => c.id)) + 1;
    dispatch(addCar({ ...carData, id: newId } as CarType));
    onClose();
  };

  const { errors, carData, setCarData, handleSubmit } = useCarForm(
    initialCarState,
    handleSave,
  );

  return (
    <Modal open onClose={onClose} className={c.modal}>
      <div className={c.content}>
        <h2>Создать машину</h2>
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
            Модель
            <TextInput
              type="text"
              value={carData.model}
              onChange={(e) =>
                setCarData({ ...carData, model: e.target.value })
              }
              placeholder="Введите модель"
              validationState={errors.model ? "invalid" : undefined}
              errorMessage={errors.model}
            />
          </label>
          <label>
            Год
            <TextInput
              type="number"
              value={String(carData.year)}
              onChange={(e) =>
                setCarData({ ...carData, year: Number(e.target.value) })
              }
              placeholder="Введите год"
              validationState={errors.year ? "invalid" : undefined}
              errorMessage={errors.year}
            />
          </label>
          <label>
            Цвет
            <TextInput
              type="text"
              value={carData.color}
              onChange={(e) =>
                setCarData({ ...carData, color: e.target.value })
              }
              placeholder="Введите цвет"
              validationState={errors.color ? "invalid" : undefined}
              errorMessage={errors.color}
            />
          </label>
          <label>
            Цена
            <TextInput
              type="number"
              value={String(carData.price)}
              onChange={(e) =>
                setCarData({
                  ...carData,
                  price: Number(e.target.value),
                })
              }
              placeholder="Введите цену"
              validationState={errors.price ? "invalid" : undefined}
              errorMessage={errors.price}
            />
          </label>
          <div className={c.buttons}>
            <Button type="submit" view="action" width="max">
              Создать
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
