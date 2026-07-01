import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import '../paste.css'
import { Calendar, Pencil, Eye, Trash2, Copy, Share2 } from 'lucide-react'

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filterData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  async function handleShare(paste) {
    console.log("Paste Object:" ,paste);
    const shareUrl = `${window.location.origin}/pastes/${paste?._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: paste?.title || "My Paste",
          text: "Check out this code snipped",
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error Sharing: ", error);
      }
    }
    else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied to clipboard");
    }

  }

  return (
    // <div className='min-h-screen bg-slate-900'>
    <div className='w-full max-w-4xl mx-auto mt-5 px-4 py-8 min-h-screen bg-slate-900'>
      <input className='w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 shadow-sm transition-all'
        type="search"
        placeholder='Search paste here....'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='w-full flex flex-col gap-y-3'>
        {
          filterData.length > 0 ? (
            <>
            <h2 className='text-4xl font-bold text-white mt-4'>All Pastes</h2>

        <div className='flex flex-col gap-6'>
          {
            filterData.length > 0 && filterData.map(
              (paste) => {
                return (
                  <div className='bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start gap-4' key={paste?._id}>

                    <div className='flex flex-col gap-2 w-full sm:w-[60%]'>
                      <h2 className='text-2xl font-bold text-white'>
                        {paste.title}
                      </h2>
                      <p className='text-sm text-gray-300 line-clamp-3'>
                        {paste.content}
                      </p>
                    </div>

                    <div className='flex flex-col items-end gap-2'>
                      <div className='flex flex-row gap-2'>
                        <button>
                          <a href={`/?pasteId=${paste?._id}`} title='Edit' className='p-2 border border-slate-600 bg-slate-600 hover:bg-slate-700 text-gray-300 hover:text-white rounded-md transition-all flex items-center justify-center '>
                            <Pencil size={18} />
                          </a>
                        </button>
                        <button>
                          <a href={`/pastes/${paste?._id}`} title='View' className='p-2 border border-slate-600 bg-slate-600 hover:bg-slate-700 text-gray-300 hover:text-white rounded-md transition-all flex items-center justify-center'>
                            <Eye size={18} />
                          </a>
                        </button>
                        <button onClick={() => handleDelete(paste?._id)} title='Delete' className='p-2 border border-slate-600 bg-slate-600 hover:bg-slate-700 text-gray-300 hover:text-white rounded-md transition-all flex items-center justify-center cursor-pointer'>
                          <Trash2 size={18} />
                        </button>
                        <button onClick={() => {
                          navigator.clipboard.writeText(paste?.content)
                          toast.success("copied to clipboard")
                        }} title='Copy' className='p-2 border border-slate-600 bg-slate-600 hover:bg-slate-700 text-gray-300 hover:text-white rounded-md transition-all flex items-center justify-center cursor-pointer'>
                          <Copy size={18} />
                        </button>
                        <button onClick={() => handleShare(paste)} title='Share' className='p-2 border border-slate-600 bg-slate-600 hover:bg-slate-700 text-gray-300 hover:text-white rounded-md transition-all flex items-center justify-center cursor-pointer'>
                          <Share2 size={18} />
                        </button>
                      </div>

                      <div className='w-full flex justify-end mt-2'>
                        <div className='flex items-center gap-2 text-sm'>
                          <Calendar size={16} className='text-gray-500' />
                          <span className='text-sm text-gray-500 font-medium'>
                            {new Date(paste.createdAt).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            )
          }
        </div>
        </>
          ) : (
            <div className='w-full text-center py-10 text-gray-400 text-lg font-medium'>
              No Data Found
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Paste
