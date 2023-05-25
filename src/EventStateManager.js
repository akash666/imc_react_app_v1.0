const ServiceCallsConstants = require('../src/ServiceCallsConstants');
// const log = require('./Logger/Logger.js');
// const Settings = require('./config.js');
let NetworkUtility = require('../src/NetworkUtility.js');
const sendEventState = function SendEventState(evnt, state){
    console.log("SendEventState is hitted...");
    try
    {
        switch (state)
        {
            case 'RECEIVED':
            {
                console.log("RECEIVED state is sending to the server...");
                PostEventStatus(evnt, 'RECEIVED', ServiceCallsConstants.ServiceCallsConstantsClass.eventRecvAckUrl,"received");
                break;
            }
            case 'REVIEWED':
            {
                console.log("REVIEWED state is sending to the server...");
                PostEventStatus(evnt, 'REVIEWED', ServiceCallsConstants.ServiceCallsConstantsClass.eventReviewAckUrl,"review");
                break;
            }
            case 'TERMINATED':
            {
                console.log("TERMINATED state is sending to the server...");
                PostEventStatus(evnt, 'TERMINATED', ServiceCallsConstants.ServiceCallsConstantsClass.eventTerminateUrl,"terminate");
                break;
            }
            case 'ESCALATED':
            {
                console.log("ESCALATED state is sending to the server...");
                PostEventStatus(evnt, 'ESCALATED', ServiceCallsConstants.ServiceCallsConstantsClass.eventEscalateUrl,"escalate");
                break;
            }
            case 'PASS':
            {
                console.log("PASS state is sending to the server...");
                PostEventStatus(evnt, 'PASS', ServiceCallsConstants.ServiceCallsConstantsClass.eventPassAckUrl,"eventpass");
                break;
            }
        }
    }
    catch (error)
    {
        var logtxt = "Exception In EventStateManager --> SendEventState.." + error.Message;
        console.log(logtxt);
        //log(logtxt);
    }
}

function PostEventStatus(evnt, ackStatus, actionUrl, actionType){
    console.log("PostEventStatus is hitted... and actionUrl is :", actionUrl);
    try
    {
        if (evnt != null)
        {
            var iVISMonitoringPlatFormUrl = null;
            if (evnt.QueueEvent.mpServer != null){
                iVISMonitoringPlatFormUrl = "http://" + evnt.QueueEvent.mpServer + ":8888" ;
                console.log("iVISMonitoringPlatFormUrl is set using mpserver :", iVISMonitoringPlatFormUrl);
            }
            else
            {
                iVISMonitoringPlatFormUrl = "http://monitoring2.iviscloud.net:8888";
                console.log("iVISMonitoringPlatFormUrl is set by default :", iVISMonitoringPlatFormUrl);
            }
            if (iVISMonitoringPlatFormUrl !== null && iVISMonitoringPlatFormUrl !== "")
            {
                var postUrl = iVISMonitoringPlatFormUrl + actionUrl;
                //console.log("posturl :", postUrl);
                //posturl = "http://monitoring2.iviscloud.net:8888/" + ServiceCallsConstantsClass.eventTerminateUrl;
                var parameters = new Map();
                parameters.set("action", actionType);
                parameters.set("sessionId", evnt.QueueEvent.sessionId);
                //console.log("parameters :", parameters);
                var evntStatus = evnt.EventStatus();
                evntStatus.action = ackStatus;
                //console.log("evntStatus :", evntStatus);

                if (ackStatus !== 'RECIVED' && ackStatus !== 'REVIEWED')
                    console.log(evntStatus.ToString());
                else
                    evntStatus.AuditList = null;

                var eventStatusString = JSON.stringify(evntStatus);
                console.log("eventStatusString :", eventStatusString);
                parameters.set("data", eventStatusString);
                /*string HttpUrl = postUrl + eventStatusString;
                PostData(HttpUrl,evnt.QueueEvent.eventId, evnt.SessionId, ackStatus.ToString());*/

                SendEventAcknowledgement(postUrl, evnt.QueueEvent.eventId, evnt.SessionId, parameters, eventStatusString);
            }
            else
                console.log("*****Monitoring Platform Details Not Found*****");
        }
    }
    catch (error)
    {
        var logtxt = "Exception In EventStatusManager --> PostEventStatus.." + error;
        console.log(logtxt);
        //log(logtxt);
    }
}

function SendEventAcknowledgement(uri, eventId, sessionId, parameters,Logstatus){
    if(parameters.size > 0){
        const obj = Object.fromEntries(parameters);
        console.log("obj : ", obj);
        console.log("posturl :", uri);
        var response = NetworkUtility.PostToServer(uri, obj);
        console.log("Monitoring Plateform Response after : ", response);
    }
}

module.exports = {sendEventState};
