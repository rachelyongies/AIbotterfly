import { useState } from 'react'
import {Button} from "@nextui-org/react";
function SynonymGenerator() {

    const [synonym, setSynonym] = useState("");
    const [word, setWord] = useState("");
    const API_KEY = import.meta.env.VITE_APP_ENV;
  
    async function synonymGenerator () {

        const APIbody = {
          
            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": "You will be provided with one word, generate 10 other synonyms for this word." + word,
              },
            ],
            "temperature": 0.7,
            "max_tokens": 64,
            "top_p": 1
          
        }
        await fetch("https://api.openai.com/v1/chat/completions",{
          method: "POST",
          headers: {
            // -H "Content-Type: application/json" \
            // -H "Authorization: Bearer $OPENAI_API_KEY"
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY,
          },
          body: JSON.stringify(APIbody)
        }).then((data)=>{
          return data.json();
        }).then((data) => {
          console.log(data);
          setSynonym(data.choices[0].message.content.trim());
        });
      }


    return(
        <>
        <div>
          <textarea className="space-mono-regular"
            onChange={(e) => setWord(e.target.value)}
            placeholder='Enter a word to generate synonyms'
            cols={50}
            rows={3}
          />
        </div>
        <div>
          <Button className="space-mono-regular" color='primary' variant='faded' onClick={synonymGenerator}>Find me a better word!</Button>
          {synonym !== "" ? <h3 className="space-mono-regular">You may also consider using these words: {synonym}</h3>
          : 
          null
          }
        </div>
        </>
    )


}

export default SynonymGenerator