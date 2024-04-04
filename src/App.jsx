import './App.css'
import ImageGenerator from './components/ImageGenerator'
import GrammarCorrector from './components/GrammarCorrector'
import SynonymGenerator from './components/SynonymGenerator'
import ItineraryGenerator from './components/ItineraryGenerator'
import { NextUIProvider } from '@nextui-org/react'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useState } from "react"



function App() {

  const [activeTabContent, setActiveTabContent] = useState("");
  
  let tabs = [
    {
      key: "imageGenerator",
      title: "Generate an Image",
      content: <ImageGenerator/>
    },
    {
      key: "synonymGenerator",
      title: "Generate 10 synonyms",
      content: <SynonymGenerator/>
    },
    {
      key:"grammarCorrector",
      title:"Check your grammar!",
      content: <GrammarCorrector/>
    },
    {
      key:"itineraryGenerator",
      title:"Generate your itinerary",
      content: <ItineraryGenerator/>
    }
  ]
  const handleTabClick = (item) => {
    setActiveTabContent(item.content);
  };

  return (
    <NextUIProvider>
      <div className='App'>

      <h2 className="space-mono-regular">AIbotterfly Beta v1.0</h2>
        
      <Tabs aria-label="Dynamic tabs" items={tabs} color="primary" className="space-mono-regular">

        {(item)=> (
          <Tab key={item.id} title={item.title}color="purple-dark" onClick={handleTabClick}>
          <Card>
            <CardBody>
              <h1 className="space-mono-regular">{activeTabContent}</h1>
              {item.content}
            </CardBody>
          </Card> 
        </Tab>
        )
        }

      </Tabs>
      </div>
    </NextUIProvider>
  )
}

export default App
