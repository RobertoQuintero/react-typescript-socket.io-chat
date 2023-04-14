import { Mensaje } from '../interfaces/dataInterface';
import { horaMes } from '../helpers/horaMes';
type Props={
  msg:Mensaje
}
export const OutGoingMessage = ({msg}:Props) => {
  return (
    <div className="outgoing_msg">
        <div className="sent_msg">
            <p>{msg.mensaje}</p>
            <span className="time_date">{horaMes(msg.createdAt)}</span>
        </div>
    </div>
  )
}
