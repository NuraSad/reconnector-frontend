import PropTypes from "prop-types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./SelectInput.scss";

function SelectInput({
  dropDownInfo,
  labelName,
  onChangeFunction,
  name,
  value,
}) {
  //state for updated value
  const [updateValue, setUpdateValue] = useState("");
  // Handle change event to update the displayValue state
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedName = e.target.name;
    setUpdateValue(selectedValue);
    onChangeFunction(selectedName, selectedValue);
  };

  return (
    <div className="selectInput">
      <label className="selectInput__label" htmlFor="labelName">
        {labelName}
      </label>
      <select
        className="selectInput__input"
        onChange={handleChange}
        value={value && value ? value : updateValue}
        name={name}
        required
      >
        {dropDownInfo &&
          dropDownInfo.map((x) => (
            <option key={uuidv4()} value={x.id}>
              {x.name}
            </option>
          ))}
      </select>
    </div>
  );
}

SelectInput.propTypes = {
  dropDownInfo: PropTypes.array,
  labelName: PropTypes.string,
  onChangeFunction: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
};

export default SelectInput;