import axios from "axios";
import React, {Component} from "react";
import Carts from './Carts';
import "./loginstyles.css";

class Retail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authorization: 1,
      seller: {
          firstName: props.firstName,
          RegNum: props.RegNum,
          PhoneNum: props.PhoneNum,
          password: props.password,
          repassword: props.password
      }
    }
  }


  def(article) {
//  var article = { name: 'React Hooks POST Request Example' };
  var httpHeaders = {};
  var headers = new Headers();
  var st = "1";
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  axios.post('http://localhost:5000/postRequest/', article,headers)
        .then(data => this.validate(data.data));
    
    
  }


  validate(data){
    var st = "0";
    data = data.toString();
    console.log(data + " " + st);
    if(st.localeCompare(data) == 0){
     
      this.setState({
        authorization: 0
      })
      
    }
    else{
      alert("The account already exists.");
    }
    
  }

  validateLogin(data){
    var st = "0";
    data = data.toString();
    if(st.localeCompare(data) != 0){
      this.setState({
        authorization: 0
      })
    }
    else{
        alert("The account does not exists.");
      }
    console.log("data", data);
  }
  
  updateName(evt) {
    const val = evt.target.value;
    console.log(val);
    // ...
    this.setState({
      seller:{
        firstName: val,
        PhoneNum: this.state.seller.PhoneNum,
        RegNum: this.state.seller.RegNum,
         password: this.state.seller.password
      }
    });
  }
  
  updateRegNum(evt) {
    const val = evt.target.value;
    console.log(val);
    // ...
    this.setState({
      seller:{
        RegNum: val,
        PhoneNum: this.state.seller.PhoneNum,
        firstName: this.state.seller.firstName,
         password: this.state.seller.password
      }
    });
  }

  updatePhoneNum(evt) {
    const val = evt.target.value;
    console.log(val);
    // ...
    this.setState({
      seller:{
        PhoneNum: val,
        firstName: this.state.seller.firstName,
        RegNum: this.state.seller.RegNum,
        password: this.state.seller.password
      }
    });
  }

  updatePassword(evt) {
    const val = evt.target.value;
    console.log(val);
    this.setState({
      seller:{
        password: val,
        firstName: this.state.seller.firstName,
        RegNum: this.state.seller.RegNum,
        PhoneNum: this.state.seller.PhoneNum
      }
    });
  }

  validatePassword(evt){
    
  }

  getloginpage(){
    this.setState({
      authorization: 2
    });
  }

  getparameters(){  
    
    var article = {};
    article["name"] = this.state.seller.firstName;
    article["RegNum"] = this.state.seller.RegNum;
    article["PhoneNum"] = this.state.seller.PhoneNum;
    article["password"] = this.state.seller.password;
    if(article["name"] == null || article["RegNum"] == null || article["PhoneNum"] == null || article["password"] == null ){
      alert("Some fields left blank. Fill them.")
      return;
    }
    console.log(this.state.seller.PhoneNum + "YES");
    const val = this.state.seller.password;
    const val2 = this.state.seller.password;
    if(val.localeCompare(val2) != 0){
      alert("Password Entered Incorrectly");
      return;
    }
    
    this.def(article);
  }

  login(){
    var article = {};
    article["name"] = this.state.seller.firstName;
    article["RegNum"] = this.state.seller.RegNum;
    article["PhoneNum"] = this.state.seller.PhoneNum;
    article["password"] = this.state.seller.password;
    console.log(this.state.seller.PhoneNum + "YES");
    if(article["name"] == null || article["RegNum"] == null || article["PhoneNum"] == null || article["password"] == null ){
      alert("Some fields left blank. Fill them.")
      return;
    }
    var headers = new Headers();
  
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    axios.post('http://localhost:5000/loginRequest/', article,headers)
        .then(data => this.validateLogin(data.data));

  }

      render() {
        if(this.state.authorization == 1){
            return (
              <div class = "container">
                  <form method="POST">
                      <p>Name :
                      <input type = "text" value={this.state.seller.firstName} onChange={evt => this.updateName(evt)}/>
                      </p>
                      <br></br>
                      <p>Registration Number :
                      <input type = "text" value={this.state.seller.Regnum} onChange={evt => this.updateRegNum(evt)}/>
                      </p>
                      <p>Phone Number :
                      <input type = "text" value={this.state.seller.PhoneNum} onChange={evt => this.updatePhoneNum(evt)}/>
                      </p>
                      <p>Password :
                      <input type = "text" value={this.state.seller.password} onChange={evt => this.updatePassword(evt)}/>
                      </p>
                      <p>Re enter Password :
                      <input type = "text" value={this.state.seller.repassword}/>
                      </p>
                  </form>
                  <button class = "login__submit" onClick = {() => this.getparameters()}>S i g n u p</button>
                  <button class = "login__submit" onClick = {() => this.getloginpage()}>L o g i n</button>
              </div>
            )
          }
        
        else if(this.state.authorization == 2){

          return (

            <div>
              <p>Name :
                <input type = "text" value={this.state.seller.firstName} onChange = {evt => this.updateName(evt)}></input>
              </p>
              <p>
                Registration Number:
                <input type = "text" value={this.state.seller.RegNum} onChange = {evt => this.updateRegNum(evt)}></input>
              </p>
              <p>
                Phone Number:
                <input type = "text" value={this.state.seller.PhoneNum} onChange = {evt => this.updatePhoneNum(evt)}></input>
              </p>
              <p>Password :
                <input type = "text" value={this.state.seller.password} onChange={evt => this.updatePassword(evt)}/>
              </p>
              <button class = "login__submit" onClick = {() => this.login()}>Login</button>
            </div>
          )


        }


        else{
          return (
            <div>
              <Carts/>
            </div>
          )
        }
  }
}

export default Retail;