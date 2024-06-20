import PropTypes from "prop-types";
import "./LinkBtn.scss";

function LinkBtn({
  bgColor,
  textColor,
  rightPos,
  link,
  textBtn,
  bottomPos,
  padding,
  onClickFunction,
  fontSize,
  image,
  imgHeight,
}) {
  return (
    <a
      className="linkBtn"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        right: rightPos,
        bottom: bottomPos,
        padding: padding,
        fontSize: fontSize,
      }}
      href={link}
      onClick={onClickFunction}
    >
      {image ? (
        <div className="linkBtn__imgDiv">
          <img style={{ height: imgHeight }} src={image} alt={image} />
          {textBtn}
        </div>
      ) : (
        textBtn // Render textBtn directly
      )}
    </a>
  );
}
LinkBtn.propTypes = {
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
export default LinkBtn;