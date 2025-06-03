import React from 'react';
import styles from './Control.module.css';

export default function Control() {
  const moveMotor = (direction) => {
    console.log(`Moving DC Motor: ${direction}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controlContainer}>
        <h2 className='text-white'>Control your car</h2>
        <div className={styles.motorControls}>
          <button className={styles.button} onClick={() => moveMotor('forward')}>⬆</button>
          <div className={styles.sideButtons}>
            <button className={styles.button} onClick={() => moveMotor('left')}>⬅</button>
            <button className={styles.button} onClick={() => moveMotor('right')}>➡</button>
          </div>
          <button className={styles.button} onClick={() => moveMotor('backward')}>⬇</button>
        </div>
      </div>
    </div>
  );
}
