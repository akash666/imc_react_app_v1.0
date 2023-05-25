import { useState, useRef, useLayoutEffect } from 'react';
import {getMessageFromRabbitMQ, ackMessageToRabbitMQ} from './Consumer';
import EventPlayer from './EventPlayer';
import AcknowledgementControl from './AcknowledgementControl';


var eventObj = null;
var consumedMessage = null;
const handleConsumeClick = () => {
    console.log("Consuming is Statrted.");
    consumedMessage = getMessageFromRabbitMQ();
    console.log("consumedMessage :" , consumedMessage);
    if(consumedMessage){
        eventObj = JSON.parse(consumedMessage); 
        if(eventObj){
            console.log("eventObj : ", eventObj);
            console.log("eventObj deliveryTag : ", eventObj.deliveryTag);
            console.log("eventObj event : ", eventObj.event);
        }
        else
            console.log("eventObj :", eventObj);
    }
    else
        console.log("consumedMessage :" , consumedMessage);
}

const handleAcknowledgeClick = () => {
    //setTimeout(()=>{
        console.log("Event Ack is Statrted.");
        if(eventObj){
            if(eventObj)
            {
                console.log("delivery tag of the message to ack : ", eventObj.deliveryTag);
                ackMessageToRabbitMQ(eventObj);
            }
            else
                console.log("eventObj : ", eventObj);
        }
        else
            console.log("eventObj : ", eventObj);
        
        
    //},100);
}

const InitRabbitMQConsuming = () => {

}
const MonitoringClientControl = (props) => {
    const [event , setEvent] = useState({});

   

      
    //console.log("props :", props);
    // const ref = useRef(null);
    // const [eventObj, seteventObj] = useState("");
    // var consumedMessage = null;
    // useLayoutEffect(() => {
    //     //
    //     console.log("MonitoringClientControl-->getMessageFromRabbitMQ() is Called...");
    //     consumedMessage = getMessageFromRabbitMQ();
    //     console.log("consumedMeassage : " , consumedMessage);
    //     seteventObj(consumedMessage);
    //     console.log("eventObj :", eventObj);
    //   }, []);

    return(
        
        <div className='divMonitoringCtrl' >
            {/* <button onClick={handleConsumeClick}>Consume</button>
            <button onClick={handleAcknowledgeClick}>Acknowledge</button> */}
            
            <EventPlayer event={event}/>
            {/* <AcknowledgementControl event={eventObj.msg}/> */}
        </div>
    );
}

    
// }
export {MonitoringClientControl}  ;
//export default MonitoringClientControl;