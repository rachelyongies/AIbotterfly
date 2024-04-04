import { useState } from 'react'

 function ItineraryGenerator() {

    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState({
      country: "",
      adjective: "",
      period: ""
    });

    const [country, setCountry] = useState("");
    const [period, setPeriod] = useState("");
    const [adjective, setAdjective] = useState("");


    const [generatedItinerary, setGeneratedItinerary] = useState("");
    
    const API_KEY = import.meta.env.APP_ENV;

    function getNextStepQuestion () {
      switch (step) {
        case 1:
          return "Which country are you planning to visit? Include any specific cities";
        case 2:
          return "What kind of trip is it? (Solo, Adventurous, Sea activity, Family etc.)?";
        case 3:
          return "How long will you be staying? Please indicate measurement of time (weeks, months, days..?) ";
        default:
          return null;
      }
    };

    const handleChange = (event) => {
      const newValue = event.target.value;
      if (step===1) {
        setCountry(newValue)
      } else if (step===2) {
        setAdjective(newValue)
      } else {
        setPeriod(newValue)
      }
    };

    const handleUpdateUserData = () => {
      setUserData({
        country: country,
        adjective: adjective,
        period: period
      })
      setStep(prevStep => prevStep+1)
    }

    async function itineraryGenerator () {

        // const { country, adjective, period } = userData;

        const APIbody = {

            "model": "gpt-3.5-turbo",
            "messages": [
              {
                "role": "system",
                "content": "Generate an itinerary for " + country + " suited for a " + adjective + " trip for a period of " + period,
              },
            ],
            "temperature": 0.7,
            "max_tokens": 2000,
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
          setGeneratedItinerary(data.choices[0].message.content.trim());
        });

        //add point form for response, clear cache when new qn comes up TODO 
      }
    


   return ( 
   <> 
    {step <=3 ? (
      <>
        <h4 className="space-mono-regular" color="primary">{getNextStepQuestion()}</h4>
        <textarea
        value={userData[step-1]}
        onChange={(e)=>handleChange(e)}
        cols={50}
        rows={10}
        />
        <button className="space-mono-regular" onClick={handleUpdateUserData}>Next</button>
      </>
    ):(
      <div>
      <button className="space-mono-regular" onClick={itineraryGenerator}>Generate Itinerary</button>
      <p>{generatedItinerary}</p>
    </div>
    )}
    </>
    
    )

}

export default ItineraryGenerator