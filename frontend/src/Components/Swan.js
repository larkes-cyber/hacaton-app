import React from "react";
import { useState } from "react";
import FilledStar from "./FilledStar";
import NotFilledStar from "./NotFilledStar";
import "../styles/Swan.scss";

function Swan({ data, chosen, setChosen, id_ }) {

  console.log(data, chosen, setChosen, id_)
  const [featured, setFeatured] = useState(data["feat"]);

  return (
    <div
      onClick={()=>{console.log(id_); setChosen(id_)}}
      className={
        "swan " + (chosen.toString() === id_.toString() ? "chosen" : "")
      }
    >
      <div className="swanTop">
        <div className="swanLeft">
          <div className="name">{data['title']}</div>
          {data['process'] === 0 ? (
            <div className="process">
              <p className="processText">Распознано</p>
              <img src="Icons/Ok.svg" />
            </div>
          ) : data['process'] === 1 ? (
            <div className="process">
              <p className="processText">Частично</p>
              <img src="Icons/Normal.svg" />
            </div>
          ) : (
            <div className="process">
              <p className="processText">Не распознано</p>
              <img src="Icons/Not.svg" />
            </div>
          )}
          <div className="date">{data['date']}</div>
        </div>
        <div className="swanRight">
          <div
            className="star"
            onClick={() => {
              setFeatured(!featured);
            }}
          >
            {featured ? <FilledStar /> : <NotFilledStar />}
          </div>
          <div className="bin">
            <img src="Icons/trash.svg" />
          </div>
        </div>
      </div>
      <div className="swanBottom">
        <div className="swanInfo">Лебеди: {data['total']}</div>
        <div className="swanInfo">Шипуны: {data['ship']}</div>
        <div className="swanInfo">Кликуны: {data['klik']}</div>
        <div className="swanInfo">Малые: {data['small']}</div>
        <div className="swanInfo">
          Нераспознанные: {data['total'] - data['ship'] - data['klik'] - data['small']}
        </div>
      </div>
    </div>
  );
}

export default Swan;
