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
  onClick,
  image,
  imgHeight,
  marginTop,
  marginLeft,
  border,
  hiddenText,
}) {
  return (
    <div className="parent">
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
        ) : (
          textBtn // Render textBtn directly
        )}
      </button>
      {hiddenText && hiddenText ? (
        <div className="btn__showHover">{hiddenText}</div>
      ) : null}
    </div>
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
