import React from "react";
import './ImageViewer.scss';
import { useRef } from "react";

export default function ImageViewer(props: {src: string}) { 
    return (                
        <div>               
          <img src={props.src} className="displayPhoto" /> 
        </div>
    );
}