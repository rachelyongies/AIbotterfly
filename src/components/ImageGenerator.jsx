import { useState } from 'react'

function ImageGenerator() {
    const [image, setImage] = useState("");
    const [item, setItem] = useState("");
    const API_KEY = import.meta.env.VITE_APP_ENV;
    
    function handleAPI(API_KEY) {
      if (API_KEY === "" || API_KEY == undefined) {
        console.log("API KEY IS NULL / UNDEFINED")
      }
    }

    async function imageGenerator (){
        handleAPI(API_KEY);
        // curl https://api.openai.com/v1/images/generations \
        const APIbody = {
          "model": "dall-e-3",
          "prompt": "Generate an image of " + item,
          "n": 1,
          "size": "1024x1024"
        }
    
        await fetch("https://api.openai.com/v1/images/generations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY,
          },
          body: JSON.stringify(APIbody)
          
        }).then((res)=>{
          return res.json()
        }).then((res)=>{
          console.log("response: " + res.data[0].url);
          setImage(res.data[0].url);
        });
      }

      return (
        <div>
        <textarea
            onChange={(e) => setItem(e.target.value)}
            placeholder='What image do you want to generate? Be as specific as possible (i.e. Realistic, Animated...?)'
            cols={50}
            rows={3}
          />
          <div>
          <button className="space-mono-regular" onClick={imageGenerator}>Generate Image</button>
          { image ? (
          <>
            <h3 className="space-mono-regular">Here you go! HI SS</h3>
            <img src={image}></img>
          </>
          ) : null}
          </div>
        </div>
    )

}

export default ImageGenerator