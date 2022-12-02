// This JS file can only import node packages
export const createLocalStream = async () => {
  const constraints = { audio: true, video: true }
  return navigator.mediaDevices.getUserMedia(constraints)
}
