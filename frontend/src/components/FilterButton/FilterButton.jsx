import React, { useState } from 'react';
import { IoFilter } from "react-icons/io5";
import styles from './FilterButton.module.css';

const FilterButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={styles.filterContainer}>
      <div className="filter-icon" onClick={toggleOptions}>
        <IoFilter className= {styles.filterIcon}/>
      </div>
      {showOptions && (
        <div className={styles.filterOptions}>
            <p>Distância</p>
          <label>
            <input className={styles.inputRadio} type="radio" name="filter" value="option1" />
            5
          </label>
          <label>
            <input className={styles.inputRadio} type="radio" name="filter" value="option2" />
            10
          </label>
          {/* Adicione mais opções conforme necessário */}
        </div>
      )}
    </div>
  );
};

export default FilterButton;