import "./Btn.scss";
import PropTypes from "prop-types";

function Btn({
  textBtn,
  bgColor,
  textColor,
  width,
  padding,
  height,
  fontSize,
  fontWeight,
  onClick,
  image,
  imgHeight,
  marginTop,
  marginLeft,
  border,
  hiddenText,
  inputType = "button",
  checked,
  onChange,
}) {
  return (
    <>
      <button
        className="btn"
        onClick={onClick} //this is bringing in a string somewhere and that is where the error in console log is coming from
        style={{
          backgroundColor: bgColor,
          color: textColor,
          width: width,
          padding: padding,
          height: height,
          fontSize: fontSize,
          fontWeight:fontWeight,
          marginTop: marginTop,
          marginLeft: marginLeft,
          border: border,
        }}
      >
        {image ? (
          <div className="btn__imgDiv">
            <img style={{ height: imgHeight }} src={image} alt={image} />
            {textBtn}
          </div>
        ) : inputType === "checkbox" ? (
          <div className="btn__checkbox">
            <p>{textBtn}</p>
            <input type="checkbox" checked={checked} onChange={onChange} />
          </div>
        ) : (
          textBtn // Render textBtn directly
        )}
      </button>
      {hiddenText && hiddenText ? (
        <div className="btn__showHover">{hiddenText}</div>
      ) : null}
    </>
  );
}
Btn.propTypes = {
  textBtn: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string,
  onClick: PropTypes.func,
  image: PropTypes.string,
  imgHeight: PropTypes.string,
  marginTop: PropTypes.string,
  marginLeft: PropTypes.string,
  border: PropTypes.string,
  hiddenText: PropTypes.string,
};
export default Btn;
