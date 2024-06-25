import { v4 as uuidv4 } from "uuid";
import "./SelectInput.scss";
import PropTypes from "prop-types";
import { useState } from "react";

function SelectInput({
  dropDownInfo,
  labelName,
  onChangeFunction,
  name,
  objArray,
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
            // generated on demand using uuidv4, could be converted to json id
            <option key={uuidv4()} value={x}>
              {x}
            </option>
          ))}
        {objArray &&
          objArray.map((x) => (
            // generated on demand using uuidv4, could be converted to json id
            <option key={uuidv4()} value={x.name}>
              {x.name}
            </option>
          ))}
      </select>
    </div>
  );
}
SelectInput.propTypes = {
  dropDownInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  labelName: PropTypes.string,
  onChangeFunction: PropTypes.func,
  name: PropTypes.string,
  objArray: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.string,
};
export default SelectInput;
