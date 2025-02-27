import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from '../../assets/images/arrow-left.png';
import youtubeV from '../../assets/images/youtubeV.svg';
import { MdAccessTime } from 'react-icons/md';
import Blockchain from "./blockChain";

const ModuleOne = () => {

  const navigate = useNavigate();
  
  return (
    <React.Fragment>
       <section className="bg-[#f5f5f5] p-5 xl:p-10">
        <div className="flex items-start justify-between gap-5 w-full">
          <button
            className="flex gap-4 items-center text-black/50 xl:ml-5"
            onClick={() => navigate('/educational-center')}
            type="button"
          >
            <div className="w-[20px]">
              <img src={arrow} alt="arrow_icon" />
            </div>
            Back
          </button>

          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="font-DM Sans font-bold text-[18px] leading-[32px] text-[#121826] text-center md:text-[32px] md:leading-[48px]">
              Blockchain Basics
            </h2>
            <button className="px-4 py-2 bg-white text-[#121826] rounded-[30px] transition-colors duration-200 font-inter font-medium text-[10px] leading-[18px] md:text-[14px] md:leading-[21px]">
              Module 1
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center mt-5">
          <img src={youtubeV} alt="youtubeV" />
        </div>

        <div className="mt-5">
          <p className="flex items-center gap-2">
            <MdAccessTime />
            <span>4 Minutes Read</span>
          </p>
          <p className="w-full border-t-2 border-gray-300 shadow-[0px_4px_6px_rgba(0,0,0,0.1)]"></p>
        </div>
        <div> < Blockchain />  </div>

       
      </section>
    </React.Fragment>
  );
};

export default ModuleOne;
