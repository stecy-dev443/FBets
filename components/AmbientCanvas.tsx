"use client";
import { useEffect, useState } from "react";
import { Sun, Sunset, Crosshair } from "lucide-react";

export default function AmbientCanvas(){
 const [mood,setMood]=useState<"morning"|"sunset">("morning");
 useEffect(()=>{
  const hour=new Date().getHours();
  setMood(hour>=16||hour<6?"sunset":"morning");
  const move=(event:PointerEvent)=>{
   document.documentElement.style.setProperty("--cursor-x",event.clientX+"px");
   document.documentElement.style.setProperty("--cursor-y",event.clientY+"px");
  };
  window.addEventListener("pointermove",move,{passive:true});
  return()=>window.removeEventListener("pointermove",move);
 },[]);
 return <><div className="ambient-canvas" data-mood={mood} aria-hidden="true"><span className="ambient-fang fang-a"/><span className="ambient-fang fang-b"/><span className="ambient-fang fang-c"/><span className="ambient-fang fang-d"/></div><div className="ambient-switch" role="group" aria-label="Atmosphere lighting"><span><Crosshair size={12}/> ATMOSPHERE</span><button onClick={()=>setMood("morning")} className={mood==="morning"?"chosen":""} aria-pressed={mood==="morning"}><Sun size={13}/> Morning</button><button onClick={()=>setMood("sunset")} className={mood==="sunset"?"chosen":""} aria-pressed={mood==="sunset"}><Sunset size={13}/> Sunset</button></div></>;
}