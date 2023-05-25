//const log = require('./Logger/Logger.js');
const EventResponse = require('../BO/EventResponse.js');
const EventStatus = require('../BO/EventStatus.js');

const EventBOClass = class EventBO
{
    QueueEvent = null;
    msg = null;
    deliveryTag = null;
    siteDetails = null;
    escMatrixDetails = null;
    EscalationType = null;
    EscalationTag = null;
    Extras = null;
    EventNotes = null;
    EventResponse = new EventResponse.EventResponseClass(); //EventResponse
    evntStatus = new EventStatus.EventStatusClass();
    EventStatus = function GetEventStatus()
    {
        try
        {
            //console.log(this.evntStatus);
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            this.evntStatus.actionTime = datetime.toString();
            this.evntStatus.escalationType = this.EscalationType;
            if(this.EscalationTag !== null)
            this.evntStatus.escalationTag = this.EscalationTag;
            if(this.Extras !== null)
                this.evntStatus.extras = this.Extras;
            if(this.EventNotes !== null)
                this.evntStatus.eventNotes = this.EventNotes;

            if(this.QueueEvent !== null)
            {
                this.evntStatus.sessionId = this.QueueEvent.sessionId;
                this.evntStatus.eventId = this.QueueEvent.eventId;
                this.evntStatus.userLevel = this.QueueEvent.userLevel;
                this.evntStatus.queueName = this.QueueEvent.queueName;
            }

            // this.evntStatus.userId = User.userId;
            this.evntStatus.userId = "Akash";

            if (EventResponse !== null)
            {
                this.evntStatus.eventReceivedTime = EventResponse.EventReceivedTime;
                this.evntStatus.eventReviewTime = EventResponse.EventReviewTime;
                this.evntStatus.eventEscalatedTime = EventResponse.EventEscalatedTime;
                this.evntStatus.eventReviewStartTime = EventResponse.EventReviewStartTime;
                this.evntStatus.eventResponseTime = EventResponse.EventResponseTime;
                this.evntStatus.eventDuration = EventResponse.EventDuration;

                this.evntStatus.TwoWayAudioCall = EventResponse.TwoWayAudioCall;
                this.evntStatus.TriggerStrobes = EventResponse.TriggerStrobes;
                this.evntStatus.AudioCall = EventResponse.AudioCall;
                this.evntStatus.LiveView = EventResponse.LiveView;
                //this.evntStatus.AuditList = EventResponse.AuditList;
            }

            return this.evntStatus;
        }
        catch (error)
        {
            var logtext = "Exception In EventBO --> GetEventStatus.. " + error;
            console.log(logtext)
            return null;
        }
    }
}

module.exports = {EventBOClass};