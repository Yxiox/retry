"use client";

// components/ParkingLot.tsx
import React, { useState } from 'react';
import styles from './ParkingLot.module.css';

interface Car {
  id: string;
  plate: string;
}

const ParkingLot: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const addCar = () => {
    const newCar: Car = {
      id: `car-${cars.length + 1}`,
      plate: `ABC${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setCars([...cars, newCar]);
  };

  const removeCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  return (
    <div className={styles.parkingLot}>
      <div className={styles.spots}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.spot}>
            {cars[index] && (
              <div className={styles.car}>
                <span className={styles.plate}>{cars[index].plate}</span>
                <div className={styles.actions}>
                <button className={styles.actionButton} onClick={() => alert(`Editing ${cars[index].plate}`)}>Edit</button>
                <button className={styles.actionButton} onClick={() => removeCar(cars[index].id)}>Finalize</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button className={styles.addButton} onClick={addCar}>+</button>
    </div>
  );
};

export default ParkingLot;
