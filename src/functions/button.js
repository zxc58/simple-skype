export const myVideo = async () => {
//   const stream = await window.navigator.media
  const constraints = {
    audio: true,
    video: true
  }
  const stream = await navigator.mediaDevices.getUserMedia(constraints)

  document.querySelector('#my-video').srcObject = stream
}
