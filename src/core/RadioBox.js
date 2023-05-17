import React, { useState } from "react";
const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleToggle = (event) => {
    setValue(event.target.value);
    handleFilters(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleToggle}
        value={p._id}
        name={p}
        type="radio"
        className="mr-2 ml-4"
      ></input>
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
};

export default RadioBox;
