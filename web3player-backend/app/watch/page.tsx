"use client";
import React, { use } from 'react'
import  {Relay} from 'nostr-tools/relay'
import { useState,useEffect } from 'react'
import { useSearchParams } from 'next/navigation'


function Page() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log(id)
    const connectrealy = async () => {
        const relay = await Relay.connect('wss://relay.damus.io')
        if (relay.connected) {
            console.log('connected')
            return relay;
        }
    }
    const [relay, setRelay] = useState(connectrealy());
    const [content, setContent] = useState('');
    const [contentJson, setContentJson] = useState({} as any);
    
    const get = async (id:string) => {
      const relayInstance = await relay;
      if (relayInstance) {
        const sub = relayInstance.subscribe([
          {
            ids: [id],
          },
        ], {
          onevent(event) {
            console.log('we got the event we wanted:', event.content);
            setContent(event.content)
          },
          oneose() {
            sub.close()
          }
        })
      }
    }
    useEffect(() => {
      if (id) {
        get(id);
      }
    }, [id])

    useEffect(() => {
      if (content) {
        setContentJson(JSON.parse(content))
      }
    }, [content])

    

    
       
  return (
    <div> 
      <p>Title : {contentJson.title}</p>
      <p>Descrption  : {contentJson.description} </p>
      <p>Video  :  {contentJson.video}</p>
      </div>
  )
}

export default Page