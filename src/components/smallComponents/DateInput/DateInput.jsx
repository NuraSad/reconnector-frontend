import { useState } from "react";
import "./DateInput.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

function DateInput({ labelName, onChangeFunction }) {
  // Destructuring props here
  //datepicker state
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date, e) => {
    const selectedValue = date;
    const selectedName = e.target;
    onChangeFunction(selectedName, selectedValue);
    setStartDate(date);
  };

  return (
    <div className="dateInput">
      <label className="dateInput__label" htmlFor="labelName">
        {labelName}
      </label>
      <div>
        {" "}
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          className="dateInput__input"
          value={startDate}
        />
      </div>
    </div>
  );
}
DateInput.propTypes = {
  labelName: PropTypes.string,
  onChangeFunction: PropTypes.func,
};
export default DateInput;
