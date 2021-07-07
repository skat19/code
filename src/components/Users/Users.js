import React from "react";
import s from "./Users.module.css";
import garf from "../../assets/images/garf.jpg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import UsersPaginator from "./UsersPaginator";

const Users = (props) => {
  let countPages = Math.ceil(props.totalCount / props.pageSize);
  let arr = [];
  for (let i = 1; i <= countPages; i++) {
    arr.push(i);
  }

  let portionCount = Math.ceil(countPages / 10);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortion = (portionNumber - 1) * 10 + 1;
  let rightPortion = portionNumber * 10;

  return (
    <div>
      <UsersPaginator
        portionCount={portionCount}
        portionNumber={portionNumber}
        setPortionNumber={setPortionNumber}
        leftPortion={leftPortion}
        rightPortion={rightPortion}
        arr={arr}
        {...props}
      />
      {props.users.map((el) => (
        <div className="">
          <div className={s.userItem}>
            <div className={s.userPhoto}>
              <NavLink to={`/profile/${el.id}`}>
                <img src={el.photos.small ? el.photos.small : garf} alt="" />
              </NavLink>
            </div>
            <div className={s.userInfo}>
              <div className="">id: {el.id}</div>
              <div className="">name: {el.name}</div>
              <div className="">status: {el.status ? el.status : "---"}</div>
            </div>
            <div className={s.usesrBtn}>
              {el.followed ? (
                <button
                  disabled={props.isFetchingBtn.some((item) => item === el.id)}
                  onClick={() => {
                    props.unfollow(el.id);
                  }}
                >
                  unfollow
                </button>
              ) : (
                <button
                  disabled={props.isFetchingBtn.some((item) => item === el.id)}
                  onClick={() => {
                    props.follow(el.id);
                  }}
                >
                  follow
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
