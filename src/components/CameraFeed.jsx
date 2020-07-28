import React, { useEffect, createRef } from 'react';
import { Button, OverlayTrigger, Tooltip, Dropdown} from 'react-bootstrap'
import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';

class CameraFeed extends React.Component {

  constructor(props) {
    super(props);

    this.videoPlayer = createRef()
    this.canvas = createRef()

    this.possibleEffects = ["none", "blur", "brightness", "contrast", 
      "drop-shadow", "grayscale", "hue-rotate", "invert", "opacity", "saturate", "sephia", "url"];
   
    this.state = "dummy";
    this.setState({effect: "none", videoWidth: 680, videoHeight: 360});  
  } 

  /*
  useEffect(() => {
    console.log(navigator.mediaDevices.enumerateDevices())
    async function getCamera() {
      console.log('enumerate devices:', navigator.mediaDevices.enumerateDevices())
      const cameras = await navigator.mediaDevices.enumerateDevices()
      processDevices(cameras)
    }
    getCamera()
  }, [])
  */


 setDevice = async (device) => {
  const { deviceId } = device
  const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } })
  .then(stream => this.videoPlayer.current.srcObject = stream)
  .catch(err => console.log(err))
  this.videoPlayer.current.play()
}

  processDevices = (devices) => {
      devices.forEach(device => {
        console.log('Device:', device.label)
          this.setDevice(device)
      })
  }

  turnCameraOff = () => {
    this.videoPlayer.current.srcObject.getVideoTracks().forEach(track => track.stop())
  }

  turnCameraOn = async () => {
    var cameras = await navigator.mediaDevices.enumerateDevices()
    this.processDevices(cameras)

    var video = document.getElementById("videoPlayer");
    await new Promise(resolve => video.onloadedmetadata = resolve);
    console.log(`${video.videoWidth}x${video.videoHeight}`); // 640x480
    this.setState({effect: this.state.effect, videoWidth: video.videoWidth, videoHeight: video.videoHeight});  
  }

  takePhoto = () => {
      var context = this.canvas.current.getContext('2d')
      var myFrameEl = this.videoPlayer.current;
      var effectText = this.getEffectText();
      context.filter = effectText;
      context.drawImage(myFrameEl, 0, 0, this.canvas.current.width, this.canvas.current.height)
  }

  changeEffect = (props) => {
    if (false) {
      console.log("Oops, effect not found");
    } else {
      this.setState({effect: props.effect});
      console.log(this.state.effect);
    }
  };

  getEffectText = function() {
    console.log("getEffectText() called...")
    switch(this.state.effect) {
      case "none": 
        return "none";
      case "blur":
        return "blur(5px)";
      case "brightness":
        return "brightness(60%)"
      case "contrast":
        return "contrast(150%)"
      case "drop-shadow":
        return "drop-shadow(16px 16px 10px rgba(0,0,0,0.9))"
      case "grayscale":
        return "grayscale(200%)"
      case "hue-rotate":
        return "hue-rotate(90deg)"
      case "invert":
        return "invert(.8)"
      case "opacity":
        return "opacity(60%)";
      case "saturate":
        return "saturate(250%)";
      case "sepia":
        return "sepia(80%)"
      default:
        return "ERROR";
    }
  }

  render() {
      return (
      <div className="c-camera-feed">
        <div className="c-camera-feed__viewer">
          <video id="videoPlayer" ref={this.videoPlayer} width="680" height="360" style={{filter: this.getEffectText()}}/>
        </div>
        <Button className='mr-2' onClick={() => this.turnCameraOff()}>Turn off Camera</Button>
        <Button className='mr-2' onClick={() => this.turnCameraOn()}>Turn on Camera</Button>
        <Button onClick={() => this.takePhoto()}>Take photo!</Button>

        <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      Effects
    </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "none"})}>none</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "blur"})}>blur</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "brightness"})}>brightness</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "contrast"})}>contrast</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "drop-shadow"})}>drop-shadow</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "grayscale"})}>grayscale</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "hue-rotate"})}>hue-rotate</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "invert"})}>invert</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "opacity"})}>opacity</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "saturate"})}>saturate</Dropdown.Item>
        <Dropdown.Item onClick={() => this.changeEffect({effect: "sepia"})}>sephia</Dropdown.Item>
      </Dropdown.Menu>
     </Dropdown>

        <div className="c-camera-feed__stage mt-2">
          <canvas className='canvas' width={this.state.videoWidth} height={this.state.videoHeight} ref={this.canvas} />
        </div>
      </div>
    )
  }

}

export default CameraFeed