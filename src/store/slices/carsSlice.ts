import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CarType } from "../../features/cars/types/CarType";

const initialState = {
  cars: [] as CarType[],
  selectedCarId: null as number | null,
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<CarType[]>) => {
      state.cars = action.payload;
    },
    addCar: (state, action: PayloadAction<CarType>) => {
      state.cars.push(action.payload);
    },
    editCar: (state, action: PayloadAction<CarType>) => {
      const editedCar = action.payload;
      const idx = state.cars.findIndex((car) => car.id === editedCar.id);
      if (idx !== -1) {
        state.cars[idx] = editedCar;
      }
    },
    deleteCar: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.cars = state.cars.filter((car) => car.id !== id);
    },
    setSelectedCarId: (state, action: PayloadAction<number | null>) => {
      state.selectedCarId = action.payload;
    },
  },
});

export const { setCars, addCar, editCar, deleteCar, setSelectedCarId } = carsSlice.actions;
export default carsSlice.reducer;
