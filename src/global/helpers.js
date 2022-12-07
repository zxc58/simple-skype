import { v4 as uuidv4 } from 'uuid'
const roomSize = process.env.REACT_APP_ROOM_SIZE ?? 2
export const createLocalStream = async () => {
  const constraints = { audio: true, video: true }
  return navigator.mediaDevices.getUserMedia(constraints)
}
export const createRoom = (action = 'create', other = {}) => ({
  id: uuidv4(),
  type: 'room',
  action,
  size: roomSize,
  other
})
export const createInvitation = ({ room, socket, name, user }) => ({
  type: 'invitation',
  roomId: room.id,
  inviterId: socket?.id ?? room.other.inviterId,
  invitingId: user?.id ?? room.other.invitingId,
  inviterName: name ?? room.other.inviterName,
  invitingName: user?.name ?? room.other.invitingName
})
export const invitationToRoom = (invitation) => ({
  type: 'room',
  id: invitation.roomId,
  action: 'accept invite',
  size: roomSize
})
