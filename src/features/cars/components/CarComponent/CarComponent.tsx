import type { CarType } from "../../types";
import c from "./CarComponent.module.css";
import { Card, DropdownMenu } from "@gravity-ui/uikit";

interface CarComponentProps {
  car: CarType;
  onEdit: () => void;
  onDelete: () => void;
  onShowOnMap: () => void;
}

export const CarComponent = ({
  car,
  onEdit,
  onDelete,
  onShowOnMap,
}: CarComponentProps) => {
  const { id, name, model, year, price } = car;

  return (
    <Card className={c.card}>
      <div className={c.info}>
        <h2>
          {id}: {name}
        </h2>
        <div>Model: {model}</div>
        <div>Year: {year}</div>
        <div>Price: {price}</div>
      </div>
      <div className={c.dropdown}>
        <DropdownMenu
          items={[
            {
              action: onShowOnMap,
              text: "Показать на карте",
            },
            {
              action: onEdit,
              text: "Редактировать",
            },
            {
              action: onDelete,
              text: "Удалить",
              theme: "danger",
            },
          ]}
        />
      </div>
    </Card>
  );
};
