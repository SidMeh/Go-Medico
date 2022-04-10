import axios from "axios";
import React, {Component} from "react";
import Items from "./Items/Items";
import "./styles.css";
import StripeCheckout from "react-stripe-checkout";
import { toast, ToastType } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Opayment from "./Opayment";

var listOfImages =[];
var list = {};
var raw_purchase = {};
var main_purchase = [];
var set = 0;

var st = "1";
axios.get('http://localhost:5000/listRequest/')
      .then(data => make_list(data.data));

function make_list(data){
    list = data[0];
}

class Carts extends Component{

    constructor(props){
        super(props);
        this.state = {
            item_list: {},
            place_order: 0,
            target_img: null,
            target_data: {},
            target_name:  "",
            purchase: {}
        }
       this.fetch_data();
        this.componentWillMount();
        
    }


    importAll(r) {
        return r.keys().map(r);
    }

    fetch_data(){
        var st = "1";
        axios.get('http://localhost:5000/listRequest/')
              .then(data => this.make_list(data.data));
        
    }

    componentWillMount() {
        listOfImages = this.importAll(require.context('./Items/Images/', true));
    }

    make_list(data){
        this.setState({
            item_list: data[0]
        })
    //    console.log(this.state.item_list);
      
    }

    getItemprop(input){
        var raw_key = input;
        raw_key = raw_key.split("/");
        var key = raw_key[3].split(".")[0];
        var data = list[key];
        console.log(data);
        console.log("success");
        this.setState({
            place_order: 1,
            target_data: data,
            target_img: input,
            target_name: key
        })
    }

    DisplayData(props) {
        var raw_key = props.str;
        raw_key = raw_key.split("/");
        var key = raw_key[3].split(".")[0];
        var data = list[key];
        var cost, discount;
        if(data != null)
            cost = data["cost"];
        else
            cost = "";
        if(data != null)
            discount = data["discount"];
        else
            discount = "";    
        return (
            <div class = "item">
                {key}
            
            <p class = "price">Price : {cost}<br></br>
            Max discount : {discount}<br></br>
            
            </p>  
            </div>
        )
    }

    backtoCartPage(){
        this.setState({
            place_order:0
        })
    }

    addCart(evt){
        var value = evt.target.value;
        this.setState({
            purchase: {
                [this.state.target_name]: value
            }
 //           purchase: Object.assign(this.state.prev_purchase, this.state.purchase),
           
        }) 
        console.log(this.state.purchase);
    }

    setPurchaseVal(){
 //       var temp = this.state.purchase;
        raw_purchase[this.state.target_name] = this.state.purchase[this.state.target_name];
        console.log(raw_purchase);
    }

    seeCart(){
        this.setState({
            place_order: 3
        })
    }

    removeItem(){
        var item_name = this.state.target_name;
        delete raw_purchase[item_name];
        console.log(raw_purchase);
    }



    render(){
       
        if(set == 1){
            this.setState({
                place_order: 1 
            })
        }
        console.log(set);
        if(this.state.place_order == 0){
           
            return (
                <div>
                    <button onClick = {() => this.seeCart()}>See My Cart</button>
                    <br></br>
                    <br></br>
                    <div class = "grid-container">
                    {
                    listOfImages.map(
                      (image, index) =>   <div class = "crd">
                            <div class = "sz">
                            <div> 
                                <img key={index} src={image} alt="info"></img>
                            </div>
                            <div class = "item">
                                <this.DisplayData str={image}/>
                            </div>
                            <button  class = "card-button" onClick={() => this.getItemprop(image)}>Shop</button>
                            </div>
                            <br></br>
                        </div>
                    )
                    }
                 </div>
                </div>
            )
        }

        if(this.state.place_order == 1){
            try{
            var price = this.state.target_data['cost'];
            var discount = this.state.target_data['discount'];
            var new_price = (100-discount)*price/100;
            var description = this.state.target_data['description'];
            }
            catch{
                this.setState({
                    place_order: 0
                })
                
            }
            
            if(this.state.place_order == 1){
            return (
                <div class = "incart-div-wrapper">
                <div class = "incart-div">
                    <br></br><br></br><br></br>
                    <img src = {this.state.target_img}></img>
                    <h3>Price : Rs.{price}</h3>
                    <h3>Discount : {discount}%</h3>
                    <h3>New Price : Rs.{new_price}</h3>
                    <h3>Description : {description}</h3>
                    <h3>Enter Quantity : </h3>
                    <input type = "text" value={this.state.purchase[this.state.target_name]} onChange={evt => this.addCart(evt)}></input><br></br>
                    <br></br>
                    <button onClick = {() => this.setPurchaseVal()} class = "btn"> Add to Cart</button><br></br><br></br>
                    <button onClick = {() => this.removeItem()} class = "btn"> Remove from Cart</button><br></br><br></br>
                    <button  onClick = {() => this.backtoCartPage()} class = "btn"> Back to Menu Page</button>
                    <br></br><br></br>
                </div>
                </div>
            )
            }
        }

        else{
            var i = 0;
            var totalcost = 0;
            console.log(raw_purchase);
            main_purchase = [];
            var reqlist = {}
            for(var key in raw_purchase){
                var amt = list[key];
                amt = Number(amt["pieces"]);
                var temp = {};
                temp["name"] = key;
                if(amt > Number(raw_purchase[key]))
                    temp["amount"] = Number(raw_purchase[key]);
                else
                    temp["amount"] = amt;
                reqlist[temp["name"]] = temp["amount"];
                var data = list[key];
                totalcost = totalcost + Number(data["cost"])*Number(temp["amount"]);
                main_purchase[i] = temp;
                i++;
            }
            return (
                <div>
                    <h1>Your Order</h1>
                   {
                   main_purchase.map(
                        (item, index) => <div> 
                            {item["name"]} : 
                            {item["amount"]}
                        </div>
                   )
                   }
                   <button  onClick = {() => this.backtoCartPage()}> Back to Menu Page</button>
                   <Opayment cost = {totalcost} cart = {reqlist}/>
                    
                </div>
            )
        }
    }
}

function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li>{props.value}</li>;
  }

  function jsonConcat(o1, o2) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
   }


//http://crowdforgeeks.com/tutorials/how-to-integrate-google-pay-payment-gateway-in-react-application


export default Carts;