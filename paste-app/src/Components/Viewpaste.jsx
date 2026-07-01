import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import '../paste.css'

const Viewpaste = () => {


  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];

  console.log("Final paste", paste);



  return (
    <div className="flex flex-col items-center justify-start min-h-screen min-w-screen bg-gray-900 text-white p-6 pt-12">

      <div className="w-full max-w-2xl flex flex-col gap-5">

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <input
            className="flex-1 p-3 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
            type="text"
            placeholder="Enter title here"
            value={paste.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
          />
          
          {/* <button
            onClick={createPaste}
            className="p-3 px-6 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button> */}
        </div>

        <div className="w-full">
          <textarea
            className="w-full p-4 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-both cursor-not-allowed"
            value={paste.content}
            placeholder="Enter content here"
            disabled
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          />
        </div>

      </div>
    </div>
  )
}

export default Viewpaste
