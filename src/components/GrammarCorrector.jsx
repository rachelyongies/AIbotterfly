import { useState } from 'react'

function GrammarCorrector() {

    const [message, setMessage] = useState("");
    const [sentence, setSentence] = useState("");
    const API_KEY = import.meta.env.VITE_APP_ENV;

    async function grammarChecker () {

        const APIbody = {
          
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": "You will be provided with statements, correct these statements to perfect english." + message,
              },
            ],
            "temperature": 0.7,
            "max_tokens": 64,
            "top_p": 1
          
        }
        await fetch("https://api.openai.com/v1/chat/completions",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY,
          },
          body: JSON.stringify(APIbody)
        }).then((data)=>{
          return data.json();
        }).then((data) => {
          console.log(data);
          setSentence(data.choices[0].message.content.trim());
        });
      }
    


   return ( 
   <> 
    <textarea className="space-mono-regular"
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Write a sentence here :)'
        cols={50}
        rows={10}
    />
        <div>
        <button className="space-mono-regular" onClick={grammarChecker}>Check my grammar please!</button>
        {sentence !== "" ? <h3 className="space-mono-regular">The correct way to write this is: {sentence}</h3>
        : null}
        </div>
    </>
    
    )

}

export default GrammarCorrector