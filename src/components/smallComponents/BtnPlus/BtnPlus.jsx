import PropTypes from "prop-types";
import "./BtnPlus.scss";

function BtnPlus({
  bgColor,
  textColor,
  rightPos,
  textBtn,
  bottomPos,
  padding,
  onClickFunction,
  fontSize,
  image,
  imgHeight,
}) {
  return (
    <>
      {image ? (
        <a
          className="btnPlus"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            right: rightPos,
            bottom: bottomPos,
            padding: padding,
            fontSize: fontSize,
          }}
          onClick={onClickFunction}
        >
          <div className="btnPlus__imgDiv">
            {/* <img style={{ height: imgHeight }} src={image} alt={image} /> */}
            {textBtn} +
            {/* <div
              style={{
                backgroundImage: `url(${image})`,
                height: imgHeight,
                width: imgHeight,
              }}
            /> */}
          </div>
        </a>
      ) : (
        <a
          className="btnPlus"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            right: rightPos,
            bottom: bottomPos,
            padding: padding,
            fontSize: fontSize,
          }}
          onClick={onClickFunction}
        >
          {textBtn}
        </a>
      )}
    </>
  );
}
BtnPlus.propTypes = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  link: PropTypes.string,
  fontSize: PropTypes.string,
  textBtn: PropTypes.string,
  onClickFunction: PropTypes.func,
  rightPos: PropTypes.string,
  bottomPos: PropTypes.string,
  padding: PropTypes.string,
  image: PropTypes.string,
  imgHeight: PropTypes.string,
};
export default BtnPlus;
