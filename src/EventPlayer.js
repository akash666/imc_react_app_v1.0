import React  from 'react';
// import ReactDom from 'react-dom/client'
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { camelCase, debounce } from "lodash";
import VideoPlyer from './VideoPlyer'



const EventPlayer = (props) => {
    //console.log("EventPlayer__props:", props); 
    // const [event , setEvent] = useState(null);
    // const [siteName , setSiteName] = useState(null);
    // const [DivEventPlayerID , setDivEventPlayerID] = useState(null);
    // const SetDetails = debounce(
    //     (props) => 
    //     {
    //         console.log("EventPlayer__props : ", props); 
    //         setDivEventPlayerID(props.props.id ? props.props.id+"_divEventPlayer": null)
    //         setEvent(props.props.QueueEvent ? props.props.QueueEvent : null);
    //         setSiteName(props.props.QueueEvent.siteName ? props.props.QueueEvent.siteName : null)        
    //     }
    // ,5)
    // SetDetails(props);

    if(props !== null){
        console.log("EventPlayer__props : ", props);
    }
    const event = props.props.QueueEvent ? props.props.QueueEvent : null;
    const siteName = props.props.QueueEvent.siteName ? props.props.QueueEvent.siteName : null;
    const DivEventPlayerID = props.props.id ? props.props.id+"_divEventPlayer": null;

    // useEffect(() => { 
    //     console.log("props:", props); 
        
    //   });
    return(
        <div className='DivEventPlayer' id= {DivEventPlayerID}>
            <p className='SiteName' >SiteName : {siteName}</p>
            <VideoPlyer event={event}/>
        </div>
    );
    
}


export default EventPlayer;