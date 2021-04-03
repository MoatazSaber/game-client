import React, { useState, useEffect } from "react";
import { Circle } from "./Circle";
import { getCurrentData, initiateSocket } from "../events";
import { initItems } from "../data/Items";
import io from "socket.io-client";
const URI = "http://localhost:3000";
const socket = io(URI);

export default function Container(props) {
  const [items, setItems] = useState(initItems);
  let [blueItems, setBlueItems] = useState(items.slice(0, 4));
  let [orangeItems, setOrangeItems] = useState(items.slice(4, 6));
  let [group1, setGroup1] = useState(items.slice(6, 8));
  let [group2, setGroup2] = useState(items.slice(8, 10));
  let [group3, setGroup3] = useState(items.slice(10, 11));
  let [group4, setGroup4] = useState(items.slice(11, 12));
  let [group5, setGroup5] = useState(items.slice(12, 13));

  useEffect(() => {
    let uid = new URLSearchParams(window.location.search).get("user-id");
    socket.emit("join", { user: uid });
  }, []); // fix this
  useEffect(() => {
    setBlueItems(items.slice(0, 4));
    setOrangeItems(items.slice(4, 6));
    setGroup1(items.slice(6, 8));
    setGroup2(items.slice(8, 10));
    setGroup3(items.slice(10, 11));
    setGroup4(items.slice(11, 12));
    setGroup5(items.slice(12, 13));
  }, [items]); // fix this

  useEffect(() => {
    socket.on("updateItems", (newItems) => {
      console.log(newItems);
      setItems(newItems);
      console.log({ msg: "newItems", newItems: newItems });
    });
  }, []);
  // console.log(items.slice(0, 4))
  return (
    <div>
      <div className="blue-orange-container text-center">
        <div className="blue-container">
          <p className="">Production</p>
          <div className="row">
            {blueItems.map((i, idx) => (
              <Circle
                socket={socket}
                key={i.id}
                item={i}
                index={idx}
                value={i.value}
                setItems={setBlueItems}
              />
            ))}
          </div>
        </div>

        <div className="orange-container">
          <p>Cash</p>
          <div className="row">
            {orangeItems.map((i, idx) => (
              <Circle
                socket={socket}
                key={i.id}
                item={i}
                index={idx}
                value={i.value}
                setItems={setOrangeItems}
                type={"CONTAINER"}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="vertical-container text-center">
        <div className="goods-sold-container text-left">
          <p>
            Goods
            <br />
            Sold
          </p>
          <div style={{ marginBottom: "20%" }} className="row">
            {group4.map((i, idx) => (
              <Circle
                socket={socket}
                key={i.id}
                item={i}
                index={idx}
                value={i.value}
                setItems={setGroup4}
              />
            ))}
          </div>
        </div>
        <div className="rmp-container">
          <p>RMP</p>
          <div className="row mb-6">
            {group5.map((i, idx) => (
              <Circle
                socket={socket}
                key={i.id}
                item={i}
                index={idx}
                value={i.value}
                setItems={setGroup5}
                isSmall={true}
              />
            ))}
          </div>
        </div>
      </div>
      <div className=" align-baseline magenta-container text-left ">
        <div className="owners-container ">
          <p>OWNERS</p>
          <div className="row">
            {group1.map((i, idx) => (
              <Circle
                socket={socket}
                key={i.id}
                item={i}
                index={idx}
                value={i.value}
                setItems={setGroup1}
                isSmall={true}
              />
            ))}
          </div>
        </div>
        <div className="lenders-container ">
          <p>LENDERS</p>
          <div className="row">
            {group2.map((i, idx) => (
              <Circle
                socket={socket}
                key={i.id}
                item={i}
                index={idx}
                value={i.value}
                setItems={setGroup2}
                isSmall={true}
              />
            ))}
          </div>
        </div>
        <div className="community-container ">
          <p>
            THE
            <br />
            COMMUNITY
          </p>
          <div className="row float-right mb-5">
            {group3.map((i, idx) => (
              <Circle
                socket={socket}
                key={i.id}
                item={i}
                index={idx}
                value={i.value}
                setItems={setGroup3}
                isSmall={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
