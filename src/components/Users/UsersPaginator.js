import React from "react";
import s from "./Users.module.css";

const UsersPaginator = ({
  portionCount,
  portionNumber,
  setPortionNumber,
  leftPortion,
  rightPortion,
  arr,
  ...props
}) => {
  // debugger;
  return (
    <div
      className={portionNumber > 1 ? s.btnBlock : s.btnBlock + " " + s.helper}
    >
      {portionNumber > 1 && (
        <button
          className={`${s.btnPaginator} ${s.left}`}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          prev
        </button>
      )}
      {arr
        .filter((el) => el >= leftPortion && el <= rightPortion)
        .map((el) => (
          <button
            onClick={() => {
              props.onPageChanges(el);
            }}
            className={
              props.currentPage === el
                ? `${s.btnPages} ${s.active}`
                : s.btnPages
            }
          >
            {el}
          </button>
        ))}
      {portionNumber < portionCount && (
        <button
          className={`${s.btnPaginator} ${s.right}`}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          prev
        </button>
      )}
    </div>
  );
};

export default UsersPaginator;
