import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../data/ItemTypes";
import { ENDPOINT } from "../App";
import { sendMove } from "../events";
import io from "socket.io-client";
const URI = "http://localhost:3000";

export function Circle(props) {
  let [isDown, setIsDown] = useState(false);

  const containerStyle = {
    borderRadius: "50%",
    zIndex: "2",
    display: "inline-block",
    color: "black",
    padding: "12px",
    fontWeight: "600",
    opacity: "1",
  };

  // DROP
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.CONTAINER, ItemTypes.COIN],
    drop: (item, monitor) => {
      let current = props.value;
      return { ...props.item }; // drop
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // DRAG;
  const [collected, drag] = useDrag(() => ({
    type: ItemTypes.CONTAINER,
    item: props.item,
    end: (item, monitor) => {
      if (!monitor.didDrop()) return true;
      let uid = new URLSearchParams(window.location.search).get("user-id");
      // console.log({socket: props.socket})
      props.socket.emit("move", {
        user: uid,
        toItem: item,
        fromItem: monitor.getDropResult(),
      });
    },
  }));
  let backgroundColor = props.value === 0 ? "#c7c4c4" : "white";
  let height = props.isSmall ? "35px" : "50px";
  let width = props.isSmall ? "35px" : "50px";
  let mouseDownHandler = (e) => {
    setIsDown(true);
  };
  let mouseUpHandler = (e) => {
    setIsDown(false);
  };
  return (
    <div className="col">
      <div
        style={{ ...containerStyle, backgroundColor, height, width }}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        ref={isDown ? drag : drop}
        {...collected}
      >
        <div
        // onMouseDown={mouseHandler}
        // onMouseUp={mouseHandler}
        // ref={isDown ? drag : drop}
        // {...collected}
        >
          {props.value}
        </div>
      </div>
    </div>
  );
}
