import { Component } from 'react';
var consumedMessage;

var xhttp = new XMLHttpRequest();
const getMessageFromRabbitMQ = () => {
    console.log("Conumer.js-->getMessageFromRabbitMQ() is hitted...");
    try {
        //var xhttp = new XMLHttpRequest();
        if(!xhttp){
            new XMLHttpRequest();
        }
        xhttp.open("GET", "http://localhost:9000/rabbitMQ/get", false);
        //var xhttp1 = xhttp;

        //console.log("xhttp1.readyState :", xhttp1.readyState);
        var connConfig = {};
        connConfig.url = "amqp://admin:1v1s1nd1a@10.0.1.14:5672";
        connConfig.queueName = "Default_Manual_Wall"
        // {
        //     "url":"amqp://admin:1v1s1nd1a@10.0.1.14:5672",
        //     "queueName":"Default_Manual_Wall"
        // };
        //console.log("connConfig :", connConfig);
        xhttp.send(JSON.stringify(connConfig));
        if(xhttp.status !== 0 && xhttp.responseText !== ""){
            //console.log("xhttp.readyState :", xhttp.readyState);
            //consumedMessage = xhttp.responseText;
            return xhttp.responseText;
        }
        else
            return null;
        
    } catch (error) {
        console.log(error);
        alert("Failed to load API. Check server is up or not.")
        return null;
    }    
}

const ackMessageToRabbitMQ = async (msgToAck) => {
    console.log("Conumer.js-->ackMessageToRabbitMQ() is hitted...");

    try {
        // var xhttp = new XMLHttpRequest();
        if(!xhttp){
            xhttp = new XMLHttpRequest();
        }
        xhttp.open('POST', 'http://localhost:9000/rabbitMQ/post', false);
        //Send the proper header information along with the request
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.onreadystatechange = function() 
        {   //Call a function when the state changes.
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                console.log(xhttp.responseText);
            }
        }
        //console.log("msg to Acknowledge is:", msgToAck);
        xhttp.send(JSON.stringify(msgToAck));
        if(xhttp.status === 200){
            console.log("Acknowledged msg is:", msgToAck);
        }
        // console.log("msg to Acknowledge is:", msgToAck);
        // const response = await fetch("http://localhost:9000/rabbitMQ/post", {
        //     method: "POST",
        //     body: JSON.stringify({msgToAck}),
        // });
        // const data = await response.json();

    } catch (error) {
        console.log(error);
        return false;
    }
    
    
}
export {getMessageFromRabbitMQ, ackMessageToRabbitMQ};