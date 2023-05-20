import SearchBar from "../Components/SearchBar";
import Swan from "../Components/Swan";
import SwanResult from "../Components/SwanResult";
import "../styles/Main.scss";
import React, { useEffect, useState } from "react";
import Service from "../Service";
import { useForm } from "react-hook-form";
import axios from "axios";

function Main() {

  const service = new Service()

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const [chosenId, setChosenId] = useState(1);

  function handleClick(id_) {
    setChosenId(Number(id_));
    swansUpdate()
  }

  function updateJson(){
    axios.get('database.json').then((res)=>{setSwans(res)})
  }

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const [multipleImages, setMultipleImages] = useState([]);
  // Functions to preview multiple images
  const handleFileChange = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      let index_ = Object.keys(imageArray).reduce((a, b) => imageArray[a] > imageArray[b] ? a : b)+1
      for (let index = 0; index < imageArray.length; index++) {
        const element = imageArray[index];
        service.sendImage(index_+index, blobToBase64(element)).onloadend(()=>{updateJson()})
      }
      setMultipleImages((prevImages) => prevImages.concat(imageArray));
    }
  };
  const render = (data) => {
    return data.map((image) => {
      return (
        <img
          className="image"
          style={{ width: "10px", height: "10px" }}
          src={image}
          alt=""
          key={image}
        />
      );
    });
  };
  const [swans, setSwans] = useState({
    1: {
      title: "leb1",
      total: 10,
      ship: 1,
      klik: 1,
      small: 3,
      process: 1,
      feat: false,
      date: "20.04.2001  12:00",
    },
    2: {
      title: "leb2",
      ship: 1,
      total: 10,
      klik: 1,
      small: 3,
      process: 2,
      feat: false,
      date: "20.04.2001  12:00",
    },
    3: {
      title: "leb3",
      ship: 1,
      total: 10,
      klik: 1,
      small: 3,
      process: 0,
      feat: false,
      date: "20.04.2001  12:00",
    },
    4: {
      title: "leb4",
      ship: 1,
      total: 10,
      klik: 1,
      small: 3,
      process: 2,
      feat: false,
      date: "20.04.2001  12:00",
    },
    5: {
      title: "leb5",
      ship: 1,
      total: 10,
      klik: 1,
      small: 3,
      process: 0,
      feat: false,
      date: "20.04.2001  12:00",
    },
  });

  function swansUpdate() {
    let b = [];
    Object.entries(swans).forEach(([key, value]) => {
      b.push(
        <Swan
          chosen={chosenId}
          data={value}
          setChosen={handleClick}
          id_={key}
        />
      );
    });
    return <div className="swanDataset">{b}</div>;
  }
  const [swansUI, setSwansUI] = useState(swansUpdate());


  useEffect(
    () => {
      swansUpdate();
    },
    swans,
    chosenId, 
  );
  return (
    <div className="app">
      <div className="bar">
        {/* <p className="putoshka">Putoshka: Swan Scanner</p> */}
        <p className="putoshka">Обработанные фото</p>
      </div>
      <div className="main">
        <div className="left">
          {/* <p className='title'>Обработанные фото</p> */}
          <SearchBar />
          {swansUI}
        </div>
        <div className="right">
          <SwanResult data={swans[Number(chosenId)]}/>
          <input
            className="addSwans"
            type="file"
            name="file1"
            accept="image/*"
            multiple
            {...register("file", { required: true })}
            onChange={handleFileChange}
            placeholder="Добавить фотографии"
          />
          {/* error handling with React Hook Form */}
          {errors.file && <p className="error">Please select an image</p>}

          {/* The render function with the multiple image state */}
          {render(multipleImages)}
        </div>
      </div>
    </div>
  );
}

export default Main;
