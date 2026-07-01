import React, { useState, useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { Plus, Minus, Copy } from 'lucide-react'
import toast from 'react-hot-toast';

const Home = () => {

    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchparams, setSearchparams] = useSearchParams();
    const pasteId = searchparams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);
    const [minimized, setMinimized] = useState(false);
    const [isMax, setIsMax] = useState(false);

    const handleClose = () => {
        if(title.trim() === "" && value.trim() === ""){
            toast.error("Nothing to clear");
            return;
        }

        setTitle("");
        setValue("");
        toast.success("Content Cleared Successfully");
    }

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])

    function createPaste() {

        if(title.trim() === "" || value.trim() ===""){
            toast.error("Title and Content are Required");
            return;
        }

        const paste = {
            title: title,
            content: value,
            _id: pasteId ||
                Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if (pasteId) {
            //update
            dispatch(updateToPastes(paste));
        }
        else {
            //create
            dispatch(addToPastes(paste));
        }

        //after creation and updation 
        setTitle("");
        setValue("");
        setSearchparams({});
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen min-w-screen bg-gray-900 text-white p-6 pt-12">

            <div className="w-full max-w-2xl flex flex-col gap-5">

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <input
                        className="flex-1 p-3 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        onClick={createPaste}
                        className="p-3 px-6 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                    >
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>

                    {pasteId && (
                        <button onClick={() => {
                            setTitle("");
                            setValue("");
                            setSearchparams({});
                            Navigate("/");
                        }} className='p-2 rounded-2xl cursor-pointer bg-blue-600 text-white'>
                            <Plus size={20} />
                        </button>
                    )}
                </div>

                <div className={`w-full flex flex-col ${isMax ? 'fixed inset-0 z-50 bg-gray-900 p-4 overflow-y-auto' : ''}`}>
                    <div className='w-full bg-black p-2 border border-slate-600 rounded-t-xl flex justify-between items-center'>
                        <div className='flex gap-2 ml-4'>
                            <button onClick={handleClose} className='w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-all'></button>
                            <button onClick={() => setMinimized(!minimized)} className='w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all'></button>
                            <button onClick={() => setIsMax(!isMax)} className='w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-all'>
                                {isMax ? <Minus size={8} strokeWidth={4} /> : <Plus size={8} strokeWidth={4} />}
                            </button>
                        </div>

                        <button onClick={() => {
                            if(value.trim() === ""){
                                toast.error("Nothing to Copy, Content is Empty");
                                return;
                            }

                            navigator.clipboard.writeText(value)
                            toast.success("copied to clipboard")
                        }} title='Copy' className='mr-4 p-2 border border-slate-600 bg-slate-600 hover:bg-slate-700 text-gray-300 hover:text-white rounded-md transition-all flex items-center justify-center cursor-pointer'>
                            <Copy size={18} />
                        </button>
                    </div>

                    <div className="w-full">
                        {!minimized && (
                            <textarea
                                className="w-full p-4 bg-black border border-slate-700 rounded-b-xl  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-both flex-1"
                                value={value}
                                placeholder="Write Your Content Here...."
                                onChange={(e) => setValue(e.target.value)}
                                rows={isMax ? 20 : 15}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home
