import SearchBar from "../Components/SearchBar";
import Swan from "../Components/Swan";
import SwanResult from "../Components/SwanResult";
import "../styles/Main.scss";
import React, { useEffect, useState } from "react";
import Service from "../Service";
import { useForm } from "react-hook-form";
import axios from "axios";
import info from 'database.json';

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
  const [multipleImages, setMultipleImages] = useState([]);

  function handleClick(id_) {
    setChosenId(Number(id_));
    swansUpdate()
  }

  function updateJson(){
    axios.get('database.json').then((res)=>{setSwans(res)})
  }

  function fileToBase64(file) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onloadend(()=>{
        resolve(reader.result)
      })
      reader.onerror((error)=>{
        _(error)
      })
    });
  }

  // Functions to preview multiple images
  const handleFileChange = (e) => {
    if (e.target.files) {
      let files = e.target.files
      let index_ = Object.keys(swans).reduce((a, b) => swans[a] > swans[b] ? a : b)+1
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        service.sendImage(index_ + index, fileToBase64(element)).onloadend(()=>{updateJson()})
      }
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
  const [swans, setSwans] = useState(info);

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
