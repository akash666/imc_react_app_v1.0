import logo from './logo.svg';
import './App.css';
import { React,useState, useEffect, Component } from 'react';
import { render } from "react-dom"; 
import { camelCase, debounce } from "lodash";
import {w3cwebsocket} from 'websocket';
import {MonitoringClientControl} from './MonitoringClientControl.js';  
import EventPlayer from './EventPlayer';
import AcknowledgementControl from './AcknowledgementControl';
import { tab } from '@testing-library/user-event/dist/tab';
// const client = new w3cwebsocket('ws://localhost:8000');
const EventBO = require('../src/BO/EventBO');
const EventStateManager = require('../src/EventStateManager');
let SlotEventDictionary = null;
var CheckRabbitMQConnTimer = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client : props.client ? props.client : undefined ,
      dataFromServer : {},
      recievedEvent : {},
      prefetchCount : 0
    };
  }

  SendMsgToServer = (value) => {
    this.state.client.send(JSON.stringify(
      {
        type: "sendmsgtoserver",
        msg: value
      }
    ));
  }
  
  ReconnectToRabbitMQ = (value) => {
    console.log("ReconnectToRabbitMQ is hitted...")
    this.state.client.send(JSON.stringify(
      {
        type: "reconnectrabbitmq",
        msg: value
      }
    ));
  }

  CheckRabbitMQConnection = (value) => {
    console.log("CheckRabbitMQConnection is hitted....")
    // after every 1 minute 
    CheckRabbitMQConnTimer = setInterval((value) =>{
      this.state.client.send(JSON.stringify(
        {
          type: "checkrabbitmqconnection",
          msg: value
        }
      ));
    },5*60*1000);
    
  }

  ConnectToRabbitMQ = (value) => {
    //console.log("ConnectToRabbitMQ is hitted...")
    this.state.client.send(JSON.stringify(
      {
        type: "rabbitmqconnection",
        msg: value
      }
    ));
  }

  onButtonStartConsumingClicked = (value) => {
    //console.log("onButtonStartConsumingClicked is hitted...")
    this.state.client.send(JSON.stringify(
      {
        type: "startconsuming",
        msg: 4
      }
    ));
  }

  onButtonAckMessageClicked = (value) => {
    //console.log("onButtonAckMessageClicked is hitted...")
    this.state.client.send(JSON.stringify(
      {
        type: "ackmessage",
        msg: value
      }
    ));
  }

  CreateSlots = debounce(
    (rows,columns,target) => {
      console.log("CreateSlots is hitted....and target is:",target);
      try {
        const tbl = document.createElement("table");
        tbl.setAttribute("class", "SlotTable");
        tbl.setAttribute("border", "1");
        target.appendChild(tbl);
        
        const tblBody = document.createElement("tbody");
        tblBody.setAttribute("class", "SlotTableBody");
        tblBody.setAttribute("id", "_tableSlots");
        var count = 0;
        for (let i = 0; i < rows; i++) {
            // creates a table row
            const row = document.createElement("tr");
            row.setAttribute("class", "SlotTableRows");
            // var rowHeight = 100 / rows;
            // row.setAttribute("height", rowHeight + "%");
            for (let j = 0; j < columns; j++) {
              const cell = document.createElement("td");
              cell.setAttribute("class", "Cells");
              var _id = "slot_" + count++;
              cell.setAttribute("id", _id);
              var img = document.createElement("img");
              img.setAttribute("class", "ImageLoading");
              img.setAttribute("id", _id + "_imgloading");
              img.src = require("../src/Images/loading2.gif");
              img.setAttribute("height", "150px")
              cell.appendChild(img);
              var cellWidth = 100 / columns;
              //w = w ;
              // h = 100 / rows;
              // h = h - 5;
              //cell.setAttribute("width", cellWidth +"%");
              
              row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        console.log("CreateSlots is completed....");
      //tblBody.setAttribute('width', '100%');
      } catch (error) {
        //logtext = "CreateSlots---> " , error;
        //log(logtext);
      }
    }
    ,500) 

  CreateGridSlots = debounce((rows,columns,target)=>{
    console.log("CreateGridSlots is hitted....and target is:",target);
    var count = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        var divSlot = document.createElement('div');
        divSlot.setAttribute('class', "DivSlot")
        var _id = "slot_" + count++;
        divSlot.setAttribute('id', _id);
        // divSlot.setAttribute("height", "250px")

        var img = document.createElement("img");
        img.setAttribute("class", "ImageLoading");
        img.setAttribute("id", _id + "_imgloading");
        img.src = require("../src/Images/loading2.gif");
        //img.setAttribute("height", "150px")
        divSlot.appendChild(img);
        target.appendChild(divSlot);
      }
      console.log("CreateGridSlots is completed....");
    }
    
  },500)

  EventAcknowledging = (client,currentSlotID,ackTag) => {
    //console.log("SlotEventDictionary size", SlotEventDictionary.size);
    try 
    {
      //console.log("CameraEventOfSlotToDelete :" ,SlotEventDictionary.get(currentSlotID));
      if(SlotEventDictionary.has(currentSlotID))
      {
        const CameraEventOfSlotToDelete = SlotEventDictionary.get(currentSlotID);
        if(CameraEventOfSlotToDelete !== null){
          var deliveryTagToAck = CameraEventOfSlotToDelete.deliveryTag;
          console.log("Event to ack :",CameraEventOfSlotToDelete.QueueEvent ," \n deliveryTag of msg to ack : ", CameraEventOfSlotToDelete.deliveryTag);  
          console.log("Selected Tags is: ", ackTag.innerHTML);
          return new Promise(function(resolve,reject)
          {
            if(deliveryTagToAck != null)
            {
              try 
              {
                var cameraEvent = CameraEventOfSlotToDelete;
                var currentdate = new Date(); 
                var datetime = currentdate.getDate() + "-"
                                + (currentdate.getMonth()+1)  + "-" 
                                + currentdate.getFullYear() + "-"  
                                + currentdate.getHours() + "-"  
                                + currentdate.getMinutes() + "-" 
                                + currentdate.getSeconds();
                cameraEvent.EventResponse.EventEscalatedTime = datetime;
                //cameraEvent.EscalationType = UsageConstants.ACK_TYPE_EVENT_TERMINATE;
                cameraEvent.EscalationTag = ackTag.innerHTML;
                var str = ackTag.id;
                if(str.includes("TerTag")){
                  console.log("Event Termination is selected....")
                  //EventStateManager.sendEventState(cameraEvent,"TERMINATED");
  
                }
                else if(str.includes("EscTag")){
                  console.log("Event Escalation is selected....")
                  //EventStateManager.sendEventState(cameraEvent,"ESCALATED");
  
                }
                //Sending command to server for acknowledgement
                client.send(JSON.stringify({type: "ackmessage", msg: deliveryTagToAck}));
                resolve(true);

                //consumer.channel.ack(msgToAck);
              } catch (error) {
                console.log("Error during acknowledgement: ", error);
                reject(error);
              }
            }
            else{
              reject(false);
            }
          });
        }
        
      }
    } catch (error) {
      console.log(error);
    }
    
  }
  
  SlotClearing = (currentSlotID) => {
    //console.log("currentSlot Elenment'id is: ", currentSlotID);
    try {
      console.log("currentSlot before delete: ", currentSlotID);
      var divEventPlayer = document.getElementById(currentSlotID +"_divEventPlayer");
      if(divEventPlayer){
        console.log("divEventPlayer is clearing...divEventPlayer : " ,divEventPlayer);
        divEventPlayer.parentNode.removeChild(divEventPlayer);
      }

      var acktags = document.getElementById(currentSlotID +"_acktags");
      if(acktags){
        console.log("acktags is clearing...acktags : " ,acktags);
        acktags.parentNode.removeChild(acktags);
      }
        
      
      //console.log("currentSlot after delete: ", currentSlot);
      } 
    catch (error) 
    {
      //var logtext = "SlotClearing---> " , error;
      console.log(error);
    }
  }
  
  eventAcknowledge = (event) => {
    try {
      const _id = event.target.id;
      //console.log(_id);
      console.log("eventAcknowledge is hitted....and selected tag button id:", _id);
      const ackTag = document.getElementById(_id);
      
      const currentSlot = ackTag.parentNode.parentNode.parentNode.parentNode.parentNode;
      const slotClearing = this.SlotClearing;
      const eventAcknowlwdgedPromise = this.EventAcknowledging(this.state.client, currentSlot.id, ackTag);
      if(eventAcknowlwdgedPromise){
        eventAcknowlwdgedPromise.then(function(status){
          if(status){
            slotClearing(currentSlot.id);
            var img = document.createElement("img");
            img.setAttribute("class", "ImageLoading");
            img.setAttribute("id", currentSlot.id + "_imgloading");
            img.src = require("../src/Images/loading2.gif");
            SlotEventDictionary.delete(currentSlot.id);   ///my_map.delete(key)
            currentSlot.appendChild(img);
            //console.log("Event is acknowledged...:",currentSlot);
          }
        })
        .catch(
          function(errorMessage) {
            console.log(errorMessage)
          }
        )
      }
    } catch (error) {
      //var logtext = "eventAcknowledge---> " , error;
      console.log(error);
    }
  }

  CreateButton = (_className, _id, _value) => {
    return (
      <button className={_className} id={_id} onClick={this.eventAcknowledge}>{_value}</button>
    )
  }

  CreateAckTags = (availableSlotID) => 
  {
    console.log("CreateAckTags is hitted...");
    try 
    {
      const tbl = document.createElement("table");
      tbl.setAttribute("class", "AckTable")
      tbl.id = availableSlotID + "_acktags";
      tbl.setAttribute('background-color', 'white')
      const element = document.getElementById(availableSlotID);
      element.appendChild(tbl);
      //tbl.setAttribute("border", "1");
      const tblBody = document.createElement("tbody");
      var count = 1;

      for (let i = 0; i < 2; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 2; j++) {
          const cell = document.createElement("td");
          var id = availableSlotID + "_" +  "EscTag" + count++;
          var btn = this.CreateButton('EscTags', id, "Suspicious Activity"); // <EventPlayer QueueEvent={QueueEvent} />
          render(btn, cell);
          row.appendChild(cell);
        }
        tblBody.appendChild(row);
      }
      setTimeout(()=>{
        document.getElementById(availableSlotID + "_" +  "EscTag1").innerHTML = "Crowd Observed";
        document.getElementById(availableSlotID + "_" +  "EscTag2").innerHTML = "Camera Temparing";
        document.getElementById(availableSlotID + "_" +  "EscTag3").innerHTML = "Suspicious Activity";
        document.getElementById(availableSlotID + "_" +  "EscTag4").innerHTML = "Camera Not Working";
      },100);

      count = 1;
      for (let i = 0; i < 2; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 2; j++) {
          const cell = document.createElement("td");
          var id = availableSlotID + "_" +  "TerTag" + count++;
          var btn = this.CreateButton('TerTags', id, "False Activity"); // <EventPlayer QueueEvent={QueueEvent} />
          render(btn, cell);
          row.appendChild(cell);
        }
        tblBody.appendChild(row);
      }
      setTimeout(()=>{
        document.getElementById(availableSlotID + "_" +  "TerTag1").innerHTML = "Person Seen No Threat";
        document.getElementById(availableSlotID + "_" +  "TerTag2").innerHTML = "House Keeping";
        document.getElementById(availableSlotID + "_" +  "TerTag3").innerHTML = "Employees";
        document.getElementById(availableSlotID + "_" +  "TerTag4").innerHTML = "False Activity";
      },100);
      
      tbl.appendChild(tblBody);

      console.log("AckTags is created...");
    } 
    catch (error) {
      console.log(error);
    }
  }
  
  GetAvailableSlot = () => {
    // console.log(tableSlots.children[0]);
    try {
      var tableSlots = document.getElementById('_tableSlots');
      if(tableSlots !== null || tableSlots !== undefined){
        for (var r = 0; r <= tableSlots.rows.length - 1; r++) 
        {
          for (var c = 0; c <= tableSlots.rows[r].cells.length - 1; c++) 
          {      
            var loadingImage = document.getElementById(tableSlots.rows[r].cells[c].id +"_imgloading");
            if(loadingImage != null){
              loadingImage.parentNode.removeChild(loadingImage);
            }
            //console.log(tableSlots.rows[r].cells[c].children);
            if(tableSlots.rows[r].cells[c].children.length == 0){
              return tableSlots.rows[r].cells[c].id;
            }
          }
        }
      }
      else{
        console.log("Unable to get element: 'document.getElementById('_tableSlots')'");
      }
    } catch (error) {
      //var logtext = "GetAvailableSlot---> " , error;
      console.log(error);
      return null;
    }
  }

  PlaceEvent(CameraEvent){
    //console.log("PlaceEvent is hitted....");
    //console.log("cameraEvent : ", CameraEvent);
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "-"
                  + (currentdate.getMonth()+1)  + "-" 
                  + currentdate.getFullYear() + " "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
    //console.log("Current Date and Time :", datetime);
    CameraEvent.EventResponse.EventReceivedTime = datetime.toString();
    CameraEvent.EventResponse.EventReviewTime = datetime.toString();
    //console.log("CameraEvent.EventResponse :", CameraEvent.EventResponse);
    //EventStateManager.sendEventState(CameraEvent, "RECEIVED");
    //EventStateManager.sendEventState(CameraEvent, "REVIEWED");
    try {
      if(SlotEventDictionary == null){
        SlotEventDictionary = new Map();
      }
      //setTimeout(() => {
        var availableSlotID = this.GetAvailableSlot();
        console.log("available slot id to place occurred event : ", availableSlotID);
        var element = document.getElementById(availableSlotID); 
        SlotEventDictionary.set(availableSlotID, CameraEvent);
        var QueueEvent = CameraEvent.QueueEvent;
        console.log("Going to create EventPlayer with new recieved event");
        render(<EventPlayer props={{'QueueEvent':QueueEvent, 'id':availableSlotID}} />, element);
        //element.render(<EventPlayer props={QueueEvent} />);
        this.CreateAckTags(availableSlotID);
    } catch (error) {
      //logtext = "PlaceEvent---> " , error;
      console.log(error);
    }
  }

  componentDidMount() 
  {
    var target = document.getElementById("_DivSlotContainer");
    var Rows = 2;
    var Columns = 4;
    this.state.prefetchCount = Rows * Columns;
    console.log("prefetchcount : ", this.state.prefetchCount);
    target.setAttribute('grid-template-columns' , '1fr 1fr')  //grid-template-columns: repeat(2, 1fr);
    this.CreateSlots(Rows,Columns,target);
    //this.CreateGridSlots(Rows,Columns,target);
    //this.onButtonStartConsumingClicked("Start Consuming");
    this.state.client.onopen = () => {
      console.log('Websocket client connected to the server');
      this.ConnectToRabbitMQ('Connect To RaabitMQ');
      this.CheckRabbitMQConnection("Check RabbitMQ Connection");
      
    }
      
    this.state.client.onmessage = (event) => {
      //console.log("client.onmessage is hitted...");
      //console.log("message : ", message);
      this.state.dataFromServer = JSON.parse(event.data);
      if(this.state.dataFromServer.type === "assignedClientId"){
        console.log('got reply --> { type : ',this.state.dataFromServer.type, ', message' ,':' , this.state.dataFromServer.message, '}');
        var uniqueClientId = this.state.dataFromServer.message;
        console.log("UniqueClientId for the session :", uniqueClientId);
      }
      else if(this.state.dataFromServer.type === "startconsuming"){
        console.log('recieved event : ', this.state.dataFromServer.message);
        if(this.state.dataFromServer.message.event){
          this.state.recievedEvent = this.state.dataFromServer.message.event;
          var CameraEvent = new EventBO.EventBOClass();
          CameraEvent.QueueEvent = this.state.recievedEvent;
          CameraEvent.deliveryTag = this.state.dataFromServer.message.deliveryTag;
          // if(SlotEventDictionary == null){
          //   SlotEventDictionary = new Map();
          // }
          // SlotEventDictionary.set(CameraEvent.deliveryTag, CameraEvent);
          //ackMsgDeliveryTag = CameraEvent.deliveryTag;
          setTimeout(() => {
            this.PlaceEvent(CameraEvent);
          }, 200);
          
        }
      }
      else if(this.state.dataFromServer.type === "checkrabbitmqconnection"){
        console.log('got reply --> { type : ',this.state.dataFromServer.type, ', message' ,':' , this.state.dataFromServer.message, '}');
        if(this.state.dataFromServer.message === 'false'){
          console.log('Reconnecting the rabbitMQ...')
          this.ReconnectToRabbitMQ();
        }
      }
      else{
        console.log('got reply --> { type : ', this.state.dataFromServer.type, ', message' ,':' , this.state.dataFromServer.message, '}');
      }
    }

    this.state.client.onclose = (event) =>
    {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log("Stoping the CheckRabbitMQConnTimer");
        clearInterval(CheckRabbitMQConnTimer);
        console.log(`[close]` ,'Connection died');
      }
    };

    this.state.client.onerror = function(error) {
      console.log("Stoping the CheckRabbitMQConnTimer");
      console.log(`[error] `, error);
      clearInterval(CheckRabbitMQConnTimer);
    };

  const handleTabClose = (event) => 
  {
    event.preventDefault();
    console.log('beforeunload event triggered from App window');
    this.state.client.onclose = function () {}; // disable onclose handler first
    this.state.client.close();
  };
  
    window.addEventListener('beforeunload', handleTabClose);
  };
  
  render(){
    return (
      <div className="App">
        <button onClick={() => this.SendMsgToServer("testing")}>testing</button>
        <button onClick={() => this.onButtonStartConsumingClicked("Start Consuming")}>Start Consuming</button>
        <button onClick={() => this.onButtonAckMessageClicked(this.state.prefetchCount)}>Ack Message</button>
        
        <div className='DivSlotsWrapper' id='_DivSlotContainer'>

        </div>
        
      </div>
    );
  }
}

export default App;
