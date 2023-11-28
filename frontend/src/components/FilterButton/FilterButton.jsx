import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import styles from "./FilterButton.module.css";

const FilterButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={styles.filterContainer}>
      <div className="filter-icon" onClick={toggleOptions}>
        <IoFilter className={styles.filterIcon} />
      </div>
      {showOptions && (
        <div className={styles.filterOptions}>
          <p>Distância</p>
          <label>
            <input
              className={styles.inputRadio}
              type="radio"
              name="filter"
              value="5"
            />
            1 km
          </label>
          <label>
            <input
              className={styles.inputRadio}
              type="radio"
              name="filter"
              value="5"
            />
            5 km
          </label>
          <label>
            <input
              className={styles.inputRadio}
              type="radio"
              name="filter"
              value="10"
            />
            10 km
          </label>
          <label>
            <input
              className={styles.inputRadio}
              type="radio"
              name="filter"
              value="15"
            />
            15 km
          </label>
          <label>
            <input
              className={styles.inputRadio}
              type="radio"
              name="filter"
              value="20"
            />
            20 km
          </label>
          <label>
            <input
              className={styles.inputRadio}
              type="radio"
              name="filter"
              value="25"
            />
            25 km
          </label>
          {/* Adicione mais opções conforme necessário */}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
