
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://jaykpwptfxsejvrmrojv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpheWtwd3B0ZnhzZWp2cm1yb2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNTk2MDcsImV4cCI6MjA1OTgzNTYwN30.QuINBMcuA6bAEK4faMOLUoyGMHYT8JIXkgPpgxX6ThI")

export default function mediaUpload(file) {

  const promise = new Promise((resolve,reject) => {

    if(file == null){
      reject("No file selected")
    }
    const timeStamp = new Date().getTime()
    const newFileName = timeStamp+file.name

    supabase.storage.from("images").upload(newFileName, file, {
      cacheControl: '3600',
      upsert: false,

    }).then(() => {

      const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
      resolve(url)

    }).catch((e) => {

      reject("Error uploading file")
      console.log(e)

    })
  })

  return promise

}
