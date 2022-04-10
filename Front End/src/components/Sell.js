import React , {Component} from "react";
import axios from "axios";

class Sell extends Component {

    constructor(props){
        super(props);
        this.state = {
            mode: 3,
            seller: {
                firstName: null,
                RegNum: null,
                PhoneNum: null,
                Password: null
            },
            rePassword: null,
            product_name: null,
            product_price: null,
            product_description: null,
            product_discount: null,
            product_pieces: null
        }
    }

    signup(){
        var headers = new Headers();
        var article = {};
        article["firstName"] = this.state.seller.firstName;
        article["RegNum"] = this.state.seller.RegNum;
        article["PhoneNum"] = this.state.seller.PhoneNum;
        article["Password"] = this.state.seller.Password;
        if(article["firstName"] == null || article["RegNum"] == null || article["PhoneNum"] == null || article["Password"] == null){
            alert("Fill all the fields and then you will be able to signup.");
            return;
        }
        if(this.state.rePassword.localeCompare(article["Password"]) != 0){
            alert("Enter password correctly.");
            return;
        }
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        axios.post('http://localhost:5000/ssRequest/',article, headers)
        .then(data => this.validateSignup(data.data));
        console.log(article);
    }

    login(){
        var headers = new Headers();
        var article = {};
        article["firstName"] = this.state.seller.firstName;
        article["RegNum"] = this.state.seller.RegNum;
        article["PhoneNum"] = this.state.seller.PhoneNum;
        article["Password"] = this.state.seller.Password;
        if(article["firstName"] == null || article["RegNum"] == null || article["PhoneNum"] == null || article["Password"] == null){
            alert("Fill all the fields and then you will be able to Login.");
            return;
        }
        axios.post('http://localhost:5000/slRequest/',article, headers)
        .then(data => this.validateLogin(data.data));

    }

    getprodDetails(){
        var headers = new Headers();
        var article = {};
        article["product_name"] = this.state.product_name;
        article["product_price"] = this.state.product_price;
        article["product_discount"] = this.state.product_discount;
        article["product_description"] = this.state.product_description;
        article["product_pieces"] = this.state.product_pieces;
        axios.post('http://localhost:5000/sdRequest/', article, headers)
        .then(data => this.tempfn(data.data));

    }

    tempfn(data){
        console.log(data.toString());
        return;
    }

    validateLogin(data){
        var tmp = "0";
        var ip = data.toString();
        console.log(ip);
        if(tmp.localeCompare(ip) != 0){
            this.setState({
                mode: 3
            })
        }
        else
            alert("Account does not exist");
    }

    validateSignup(data){
        var tmp = "0";
        var ip = data.toString();
        console.log(data);
        if(ip.localeCompare(tmp) == 0){
            alert("Account already exists.");
        }
        else{
            console.log("Account created successfully.");
            this.setState({
                mode: 2
            });
        }
    }

    updateName(evt){
        var name = evt.target.value;
        this.setState({
            seller :{
                firstName: name,
                RegNum: this.state.seller.RegNum,
                Password: this.state.seller.Password,
                PhoneNum: this.state.seller.PhoneNum

            }
        })
        console.log(this.state.seller);
    }

    updateRegNum(evt){
        var name = evt.target.value;
        this.setState({
            seller :{
                firstName: this.state.seller.firstName,
                RegNum: name,
                Password: this.state.seller.Password,
                PhoneNum: this.state.seller.PhoneNum

            }
        })
        console.log(this.state.seller);
    }

    updatePhoneNum(evt){
        var name = evt.target.value;
        this.setState({
            seller :{
                firstName: this.state.seller.firstName,
                RegNum: this.state.seller.RegNum,
                Password: this.state.seller.Password,
                PhoneNum: name

            }
        })
        console.log(this.state.seller);
    }

    updatePassword(evt){
        var name = evt.target.value;
        this.setState({
            seller :{
                firstName: this.state.seller.firstName,
                RegNum: this.state.seller.RegNum,
                Password: name,
                PhoneNum: this.state.seller.PhoneNum

            }
        })
        console.log(this.state.seller);
    }

    rePassword(evt){
        this.setState({
            rePassword: evt.target.value
        })
    }
    
    loginpage(){
        this.setState({
            mode: 1
        });
    }

    getprodName(evt){
        var tmp = evt.target.value;
        this.setState({
            product_name: tmp
        })
    }

    getprodDescription(evt){
        var tmp = evt.target.value;
        this.setState({
            product_description: tmp
        })
    }

    getprodPrice(evt){
        var tmp = evt.target.value;
        this.setState({
            product_price: tmp
        })
    }

    getprodDiscount(evt){
        var tmp = evt.target.value;
        this.setState({
            product_discount: tmp
        })
    }

    getprodPieces(evt){
        var tmp = evt.target.value;
        this.setState({
            product_pieces: tmp
        })
    }

    render(){


        if(this.state.mode == 0){
            return (
                <div>
                    <p>Name :
                    <input type = "text" value={this.state.seller.firstName} onChange={evt => this.updateName(evt)}/>
                    </p>
                    <br></br>
                    <p>Registration Number:
                    <input type = "text" value={this.state.seller.RegNum} onChange={evt => this.updateRegNum(evt)}/>
                    </p>
                    <br></br>
                    <p>Phone Number:
                    <input type = "text" value={this.state.seller.PhoneNum} onChange={evt => this.updatePhoneNum(evt)}/>    
                    </p>
                    <br></br>
                    <p>Password: 
                    <input type = "text" value={this.state.seller.Password} onChange={evt => this.updatePassword(evt)}/>
                    </p>
                    <br></br>
                    <p>Re Enter Password:
                    <input type = "text" value={this.state.rePassword} onChange={evt => this.rePassword(evt)}/>
                    </p><br></br>
                    <button onClick={() => this.signup()}>SignUp</button>
                    <button onClick={() => this.loginpage()}>Login</button>
                </div>
            )
        }

        if(this.state.mode == 1){

            return (

                <div>
                    <p>Name :
                    <input type = "text" value={this.state.seller.firstName} onChange={evt => this.updateName(evt)}/>
                    </p>
                    <br></br>
                    <p>Registration Number:
                    <input type = "text" value={this.state.seller.RegNum} onChange={evt => this.updateRegNum(evt)}/>
                    </p>
                    <br></br>
                    <p>Phone Number:
                    <input type = "text" value={this.state.seller.PhoneNum} onChange={evt => this.updatePhoneNum(evt)}/>    
                    </p>
                    <br></br>
                    <p>Password: 
                    <input type = "text" value={this.state.seller.Password} onChange={evt => this.updatePassword(evt)}/>
                    </p>
                    <button onClick={() => this.login()}>Login</button>
                    <br></br>
                </div>

            )

        }


        if(this.state.mode == 3){
            return (
                <div class = "sell-wrapper">
                <div class = "sell">
                    <h1>Welcome Seller</h1>
                    <p>Enter Product Name : 
                    <input type = "text" value = {this.state.product_name} onChange = {evt => this.getprodName(evt)}></input>
                    </p>
                    <p>Enter Product Description: 
                    <input type = "text" value = {this.state.product_description} onChange = {evt => this.getprodDescription(evt)}></input>
                    </p>
                    <p>Enter price per unit :
                    <input type = "text" value = {this.state.product_price} onChange = {evt =>this.getprodPrice(evt)}></input>
                    </p>
                    <p>Enter maximum discount per unit: 
                    <input type = "text" value = {this.state.product_discount} onChange = {evt =>this.getprodDiscount(evt)}></input>
                    </p>
                    <p>Enter total pieces :
                    <input type = "text" value = {this.state.product_pieces} onChange = {evt =>this.getprodPieces(evt)}></input>
                    </p>
                    <p><a href = "http://localhost/prescribe/sellerImg.html">Click here </a>to add Sample image of your product :</p>
                    <button onClick = {() => this.getprodDetails()}>Submit Details</button>
                    
                    <p>Mail gomadico.gmail.com for further deals</p>
                </div>
                </div>
            )
        }
    }

    

}

export default Sell;