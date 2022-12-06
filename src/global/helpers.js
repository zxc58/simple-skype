import { v4 as uuidv4 } from 'uuid'
export const createLocalStream = async () => {
  const constraints = { audio: true, video: true }
  return navigator.mediaDevices.getUserMedia(constraints)
}
export const createRoom = () => ({
  id: uuidv4(),
  size: 2
})
