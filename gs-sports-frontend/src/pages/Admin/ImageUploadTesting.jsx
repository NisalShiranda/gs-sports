
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import MediaUpload from "../../../utils/MediaUpload"

function ImageUploadTesting() {
    const [file, setFile] = useState(null);

    //Supbase password : KBFLpOBVl52dzIJq
    // https://jaykpwptfxsejvrmrojv.supabase.co
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpheWtwd3B0ZnhzZWp2cm1yb2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNTk2MDcsImV4cCI6MjA1OTgzNTYwN30.QuINBMcuA6bAEK4faMOLUoyGMHYT8JIXkgPpgxX6ThI

   
    function handleUpload() {

       MediaUpload(file).then((url) => {
        console.log(url)
        toast.success("File uploaded successfully")
       }).catch((e) => {
        console.log(e)
        toast.error("File upload failed")
       })

    }


  return (
    <>
       <div className="flex justify-center items-center w-full h-screen bg-gray-200">
            <input type="file" onChange={
                (e) => {
                    setFile(e.target.files[0]);
                }
            }></input>
            <button className="w-[150px] h-[40px] bg-green-600 text-white rounded-lg hover:bg-green-700 text-center flex justify-center items-center" onClick={handleUpload}>Upload</button>
       </div>
    </>
  )
}

export default ImageUploadTesting
