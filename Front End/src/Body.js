import React, { Component } from 'react'
import Home from './components/Home'
import Contacts from './components/Contacts'

class Body extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currPage: 1
    }

  }

  changeState(count){
    this.setState({
      currPage: count
    })
  }
  
  body = () => {
    return (
      <div>
      <div class="topnav" id="myTopnav">
      <a href="#home" class="active" onClick = {() => this.changeState(1)}>Home</a>
      <a href="#contact" onClick = {() => this.changeState(2)}>Contacts</a>
      <a href="#about" >About</a>
      <a href="javascript:void(0);" class="icon" onclick="myFunction()">
        <i class="fa fa-bars"></i>
      </a>
      </div>
      </div>
    )
  }

  render(){
    if(this.state.currPage == 1){
      return(

        <div>
          <this.body/>
          <Home/>
      
        </div>
        
      )
    }
    if(this.state.currPage == 2){
      return (
       <div>
          <this.body/>
          <Contacts/>
        </div>        
      )
    }
  }
}

export default Body;