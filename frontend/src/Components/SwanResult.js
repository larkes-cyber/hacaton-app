import React, {useState} from "react";
import FilledStar from "./FilledStar";
import NotFilledStar from "./NotFilledStar";

function SwanResult({data}){
    console.log(data)
    const [featured, setFeatured] = useState(data['feat'])


    return <div className="scanner">
    <div className="imgFrame">
      <img className="leb" src="leb.jpg"/>
    </div>
    <div className="scanInformation">
      <div className="row">
        <div className="imgNaming">
          <div className="swansCount">
            <p className="swansCountElement">Шипуны {data['ship']}</p>
            <p className="swansCountElement">Кликуны {data['klik']}</p>
            <p className="swansCountElement">Малые {data['small']}</p>
          </div>
          <p className="swanTitle">{data['title']}</p>
        </div>
        <div className="featured">
            <div className="star" onClick={()=>{setFeatured(!featured)}}>
                {featured ? <FilledStar/> : <NotFilledStar/>}
            </div>
        </div>
      </div>
      <div className="row">
        <div className="date">
          <p>{data['date']}</p>
        </div>
        <div className="result">
          <p>распознано: {data['klik']+data['small']+data['ship']} не распознано: {data['total']-data['klik']-data['small']-data['ship']}</p>
        </div>
      </div>
      <div className="notes">
        <textarea placeholder="Добавить заметку"></textarea>
      </div>
    </div>
  </div>
}

export default SwanResult;