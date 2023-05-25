
const EventStatusClass = class EventStatus
{
    eventId = null;
    sessionId = null;
    userId = null;
    systemName = null;
    action = null;
    actionTime = null;
    userLevel = null;
    queueName = null;
    escalationType = null;
    escalationTag = null;
    eventReceivedTime = null;
    eventReviewTime = null;
    eventEscalatedTime = null;
    eventResponseTime = null;
    eventReviewStartTime = null;
    eventNotes = null;
    eventDuration = null;
    TwoWayAudioCall = null;
    TriggerStrobes = null;
    LiveView = null;
    AudioCall = null;
    AuditList = null;
    extras = new Map();
    ToString = function ToString()
    {
        return "Event Status --> " + " SessionId :" + this.sessionId + "\n EventId Id :" + this.eventId + "\n UserId :" + this.userId + " \n UserLevel:" + this.userLevel +" \n QueueName :"+this.queueName+ " \n Action :" + this.action +
            " \n ActionTime :" + this.actionTime + " \n escalationType : " + this.escalationType +
            " \n escalationTag :" + this.escalationTag + " \n eventReceivedTime : " + this.eventReceivedTime + "\n eventReviewTime :" + this.eventReviewTime +
            " \n eventEscalatedTime :" + this.eventEscalatedTime + "\n EventReviewStartTime :" + this.eventReviewStartTime + " \n EventResponseTime :" + this.eventResponseTime + " \n EventNotes :" + this.eventNotes + " \n Event Duration :" + this.eventDuration + " \n TwoWayAudioCall :" + this._TwoWayAudioCall + " \n TriggerStrobes :" + this.TriggerStrobes + " \n LiveView :" + this.LiveView+" \n AudioCall :"+this.AudioCall;
    }
}

module.exports = {EventStatusClass};