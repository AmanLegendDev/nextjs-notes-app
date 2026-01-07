"use client"
import {useEffect,useState} from "react";
export default function MainPage(){
  const [note,setnote] = useState([]);
  const [title,settitle] = useState("")
  const [content,setcontent] = useState("")

  useEffect(()=>{
    fetchNotes()
  },[])

  async function fetchNotes(){
    const res = await fetch("/api/notes")
    const data = await res.json()
    setnote(data)
  }

  async function addNotes(){
    await fetch("/api/notes",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({title,content})
    })
    settitle("")
    setcontent("")
    fetchNotes()
  }

  async function deleteNotes(id){
    await fetch("api/notes",{
      method: "DELETE",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({id})
    })
    fetchNotes()
  }

return (
  <div className="p-6">
    
    <div className="">
      
      <h1 className="text-red">
        Notes App
      </h1>

     
      <div className="">
        <input
          className=""
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        <input
          className=""
          placeholder="Content"
          value={content}
          onChange={(e) => setcontent(e.target.value)}
        />
      </div>

      <button
        onClick={addNotes}
        className=""
      >
        Add Note
      </button>


      <div className="">
        {note.map((notes) => (
          <div
            key={notes._id}
            className=""
          >
            <div>
              <h2 className="">
                {notes.title}
              </h2>
              <p className="note">
                {notes.content}
              </p>
            </div>

            <button
              onClick={() => deleteNotes(notes._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}