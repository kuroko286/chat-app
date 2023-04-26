import React from "react";

function FriendItem({ username, online, onchat, handleClick }) {
  return (
    <div
      className={`${
        onchat ? "bg-blue-300" : ""
      } flex justify-start gap-2 items-center cursor-pointer`}
      onClick={handleClick}
    >
      <img src="/user.svg" alt="user" className="w-8 h-8"></img>
      <div>
        <p>{username}</p>
        <div>
          {online ? (
            <>
              <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
              <label>Online</label>
            </>
          ) : (
            <>
              <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
              <label>Offline</label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendItem;
