import React, {Component} from 'react';
import './App.css';
import Signin from './Signin/Signin';
import Register from './Register/Register';
import Navigation from './components/navigation/Navigation';
import Logo from './components/navigation/Logo';
import Rank from './components/navigation/Rank';
import ImageLinkForm from './components/navigation/imageLinkForm/imageLinkForm';
import FaceRecognition from './clarifai/clarifai'
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import {particlesOptions} from './Particles/particles'

// function App() {
//   const particlesInit = (engine) => {
//     loadFull(engine);
//   };
//   return (
//     <div className="App">
//       <Particles init={particlesInit} options={particlesOptions} />
//       <Navigation />
//       <Logo /> 
//       <Rank />
//       <ImageLinkForm/>
//       {/* <faceRecognition /> */}
//     </div>
//   );
// }
const PAT = '64ef30ca92d14bc9bd368475f0557ba2';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';       
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';


class App extends Component{

  constructor(){
    super();
    this.state = {
      input:'',
      image_url:'',
      box :{},
      route : 'signin',
      issignedin: false,
      user : {
        id:'',
        name:'',
        entries: 0,
        email:'',
        joined : ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user : {
      id : data.id,
      name : data.name,
      entries : data.entries,
      email : data.email,
      joined : data.joined
    }
  })
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const faces = data.outputs[0].data.regions[0].region_info.bounding_box;
    // const num_faces = data.outputs[0].data.regions.length;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    // console.log(num_faces);
    // for(let i = 0 ; i< num_faces; i++){
    //   var elem = {}
    // }
    return {
      leftCol : faces.left_col * width,
      topRow : faces.top_row * height,
      rightCol : width - (faces.right_col * width),
      bottomRow : height - (faces.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box :box});
  }
  //anytime there's a listener on a page, we recieve the "event"
  // onInputChange = (event) =>{
  //   console.log(event);
  // } 
  //the above code will log some gibberish so we use event.target.value and log that out

  onInputChange = (event) =>{
    // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  //but now on hitting the submit button, we must be able to do something

  onButtonSubmit = () => {
    // console.log('click');
    this.setState({image_url : this.state.input});
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
  });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
  fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    // .then(result => console.log(result))
    // .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
    .then(result => {
      if(result){
        fetch('http://localhost:3000/image', {
          method : 'put',
          headers :{'Content-Type': 'application/json'},
          body : JSON.stringify({
              id: this.state.user.id
          })
      })
        .then(res => res.json())
        .then(count => this.setState(Object.assign(this.state.user, {entries : count})))
      }
      this.displayFaceBox(this.calculateFaceLocation(result))
    })
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({issignedin :true});
    }
    else{
      this.setState({issignedin : false});
    }
    this.setState({route: route});
    // console.log(this.state.issignedin);
    this.setState({image_url : ""});
  }

  render(){
    const particlesInit = (engine) => {
      loadFull(engine);
    };
    return (
      <div className="App">
        <Particles init={particlesInit} options={particlesOptions} />
        <Navigation onRouteChange = {this.onRouteChange} route = {this.state.route}/>
        {
          this.state.route === 'home'
          ?<div>
            <Logo /> 
            <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange = {this.onInputChange} 
              onButtonSubmit = {this.onButtonSubmit}
            />
            <FaceRecognition box = {this.state.box} image_url = {this.state.image_url}/>
          </div>
          :(this.state.route ==='signin'
          ? <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
