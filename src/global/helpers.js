import { v4 as uuidv4 } from 'uuid'
export const roomSize = process.env.REACT_APP_ROOM_SIZE ?? 4
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
export const fullBookedBadge = (clickEvent) => {
  const { clientX, clientY } = clickEvent
  const badge = document.getElementById('badge-warn')
  badge.classList.remove('d-none')
  badge.style.left = `${clientX}px`
  badge.style.top = `${clientY}px`
  badge.style.opacity = 1
  const time = setInterval(() => {
    if (badge.style.opacity <= 0.1) {
      badge.style.opacity = 1; badge.classList.add('d-none'); clearInterval(time)
    } else {
      badge.style.opacity -= 1.000005 - (badge.style.opacity)
    }
  }, 100)
}
export const createVideo = ({ id, type, pc, stream }) => ({
  id, type, pc, stream
})
