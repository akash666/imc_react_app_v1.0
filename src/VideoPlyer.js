import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { camelCase, debounce } from "lodash";




const VideoPlyer = (props) => {
    var _clipUrl = "https://electroguard.app/clips//21-04-2023/431071/431071_eea56f509223144ea03e_PersonDetected_21-04-2023-04-59-24.mp4";

    // const [clipUrl , setclipUrl] = useState(_clipUrl);
    // const SetDetails = debounce(
    //     (props) => {
    //         console.log("VideoPlyer__props : ", props);
    //         if(props && props.event && props.event.extras && props.event.extras.clipUrl)
    //         {
    //             setclipUrl(props.event.extras.clipUrl);
    //         }
    //     }
    // ,5)
    // SetDetails(props);
    if(props !== null){
        console.log("VideoPlayer__props : ", props);
    }
    const clipUrl = props.event.extras.clipUrl ? props.event.extras.clipUrl : null;

    return (
        <div className="VideoPlayer">
            <video className='Video' loop autoPlay muted> 
                <source src={clipUrl} className="videoSource" id="_videoSource" type="video/mp4"></source>
            </video>
        </div>
        
    )
  }

  export default VideoPlyer;