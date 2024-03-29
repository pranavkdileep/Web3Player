"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { finalizeEvent, generateSecretKey, getEventHash, getPublicKey, verifyEvent } from "nostr-tools/pure";
import { Relay } from 'nostr-tools/relay'
import * as nip19 from 'nostr-tools/nip19'
import { Uploader } from "@/components/uploader";


export default function Home() {
  
  const [sk, setSk] = useState(nip19.decode('nsec1n8wfmn4xcdhmrgr8vyes5fsh2ruseq0a58727exd2vdkfjvm87yqunkxud'));
  const [pk, setPk] = useState(nip19.decode('nprofile1qqs0sw4nlzu79e7hugpptgwmfhrcuv6t0slt2t6qyhusfy0zae0n73s8cuxgz'));
  const [relay, setRelay] = useState(Relay.connect('wss://relay.damus.io'));
  const connectrealy = async () => {
    const relay = await Relay.connect('wss://relay.damus.io')
    if (relay.connected) {
      console.log('connected')
      setRelay(relay as any);
    }
  }
  
  

  
  const publish = async (data:string) => {
    let event = finalizeEvent({
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: data,
    }, sk.data);
    const eventHash = getEventHash(event)
    console.log('publishing')
    console.log(eventHash)
    console.log(event)
    await (await relay).publish(event)
    return eventHash
  }
  const get = async (id:string) => {
    const sub = (await relay).subscribe([
      {
        ids: [id],
      },
    ], {
      onevent(event) {
        console.log('we got the event we wanted:', event.content);
      },
      oneose() {
        sub.close()
      }
    })
  }
  
  useEffect(() => {
    connectrealy();
    //publish("my kk");
    //get('c0247ae5c53053947aa575ff8446aecf6f58ab3c0e2c0d14e24ad89c9746e01a');
  }, [])
  
  
  const content_to_json_to_text_and_publish = async (title:string,description:string,videourl:string) => {
    const content = JSON.stringify({
      title: title,
      description: description,
      video: videourl
    })
    const eventHash = await publish(content)
    return eventHash  
  }
  return (
    <main >
      <Uploader videopublisher={content_to_json_to_text_and_publish} />
    </main>
  );
}
