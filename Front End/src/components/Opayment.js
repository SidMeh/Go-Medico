import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

toast.configure();

function Opayment(props) {
  const [product] = React.useState({
    price: props.cost,
    description: "Go medico Sales"
  });

  var arr = props.cart;
  console.log(arr);

  finalChanges(arr);

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      console.log("Success! Check email for details", { type: "success" });
      finalChanges(arr);
      
    } else {
      console.log("Something went wrong", { type: "error" });
    }
  }

  return (
    <div class = "payment">
      <div class="product">
          <br></br><br></br>
        <h3>Total Price : Rs.{product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
        token={handleToken}
        amount={product.price}
        name="Go Medico Shopping"
        billingAddress
        shippingAddress
      />
      <h2>You can modify it from the shopping cart page</h2>
    </div>
  );
}


function finalChanges(arr){
    var httpHeaders = {};
    var headers = new Headers();
    var st = "1";
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    axios.post('http://localhost:5000/cartRequest/', arr,headers)
}

export default Opayment;
