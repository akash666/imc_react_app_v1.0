var Ackmsg = null;
const SendAckToRabbitMQ = () => {
    console.log("AcknowledgementControl-->SendAckToRabbitMQ() is hitted...")
    var acktag = document.getElementsByClassName('escTags');
    console.log("Ack Tag : ", acktag )
    setTimeout(()=>{
        //alert("Event Ack is Statrted.");
        console.log("eventObj.msg : ", Ackmsg);
       // ackMessageToRabbitMQ(Ackmsg);
    },3000);
}


const AcknowledgementControl = (props) => {
    Ackmsg = props;
    return (
        
        <div className='acknowledgementControl'>
            <table className="ackTable">
                <tr>
                    <td className="ackTableData"><button className="EscTags" onClick={SendAckToRabbitMQ}>Suspicious Activity1</button></td>
                    <td className="ackTableData"><button className="EscTags" onClick={SendAckToRabbitMQ}>Suspicious Activity2</button></td>
                </tr>
                <tr>
                    <td className="ackTableData"><button className="EscTags" onClick={SendAckToRabbitMQ}>Suspicious Activity3</button></td>
                    <td className="ackTableData"><button className="EscTags" onClick={SendAckToRabbitMQ}>Suspicious Activity4</button></td>
                </tr>
            </table>
            <table className="ackTable">
                <tr>
                    <td className="ackTableData"><button className="TerTags" onClick={SendAckToRabbitMQ}>False Alert</button></td>
                    <td className="ackTableData"><button className="TerTags" onClick={SendAckToRabbitMQ}>House Keeping</button></td>
                </tr>
                <tr>
                    <td className="ackTableData"><button className="TerTags" onClick={SendAckToRabbitMQ}>Person Seen No Threat</button></td>
                    <td className="ackTableData"><button className="TerTags" onClick={SendAckToRabbitMQ}>Vehicle Obseved</button></td>
                </tr>
            </table>
        </div>
        
    );
 }

export default AcknowledgementControl;