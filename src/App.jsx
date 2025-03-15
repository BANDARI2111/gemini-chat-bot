import {GoogleGenerativeAI} from "@google/generative-ai";
import { useState } from "react";
function App ()
{ 
  const [input,setInput] = useState('')
  const [chat,setChat] = useState([])
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
  const handleInput = async () =>
  {
    try
    { 
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = input;
      const result = await model.generateContent(prompt);
      const aiResponse = await result.response.text();
      console.log(aiResponse);  
      setChat([
        ...chat,
        {
          userText: input,
          aiText: result.response.text(),
        },
      ])
      setInput('')
    }
    catch(err){
      console.error("Error in handleInput:", err);
    }    
  }

  return(
    <div className="relative-h-screen flex flex-col justify-center items-center">
    <div className="absolute inset-0">
     <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
    </div>
      <div className="chat h-3/4">
        {
          chat.map((val,i) => (
            <div key={i}>
              <h2 className=" text-3xl text-gray-500">{val.userText}</h2>
              <p className=" text-4xl text-blue-500 text-justify">{val.aiText}</p>
            </div>
          ))
        }
      </div>
      <div className="input my-5 fixed bottom-0">
        <input 
          type="text" 
          placeholder="Ask me something" 
          className="text-3xl rounded-2xl py-5"
          value = {input}
          onChange={(e)=>setInput(e.target.value)}
        />
        <button className="bg-black text-white p-5 text-center text-2xl rounded-4xl"
          onClick={handleInput}>
          send
        </button>
        <button className="bg-black text-white p-5 text-center text-2xl rounded-4xl"
          onClick={()=>setChat([])}>
          clear chat
        </button>
      </div>
    </div>
  )
}
export default App;