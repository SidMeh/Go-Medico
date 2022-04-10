import React from 'react';
import bgImg from '../images/bg.jpg'
import bgImg1 from '../images/bg1.jpg'
import bgImg2 from '../images/bg2.jpg'
import bgImg3 from '../images/bg3.jpg'
import bgImg4 from '../images/bg4.jpg'
import { Carousel } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Retail from './Retail'; 
import Sell from './Sell';


const gotoprescribe = () =>{
  window.location.replace("");
};





class Home extends Component {

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

  render() {

    if(this.state.currPage == 3){
      return (
        <div>
          <Sell/>
        </div>
      )
    }

    if(this.state.currPage == 2){
      return (
        <div>
          <Retail/>
        </div>
      )
    }


    if(this.state.currPage == 1){
    return (
    
    
     <div>
         <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>
       <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={bgImg}
      alt="First slide"
      class = "resimg"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>


  <Carousel.Item>
    <img
      className="d-block w-100"
      src={bgImg1}
      alt="Second slide"
      class = "resimg"
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>


  <Carousel.Item>
    <img
      className="d-block w-100"
      src={bgImg2}
      alt="Third slide"
      class = "resimg"
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>


  <Carousel.Item>
    <img
      className="d-block w-100"
      src={bgImg3}
      alt="Third slide"
      class = "resimg"
    />
    <Carousel.Caption>
      <h3>Fourth slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>

  
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={bgImg4}
      alt="Third slide"
      class = "resimg"
    />
    <Carousel.Caption>
      <h3>Fifth slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel> 
        <h1 class = "bgh">GO MEDICO</h1>
      
      <br></br>
      <br></br>
      <nbsp></nbsp> 
      <div class = 'cards'>
          {/* <Card style={{width: '18rem'}}> */}
          {/* style={[styles.base, styles.background]} */}
          <Card style = {{width: '18rem'}}>
            <Card.Body  >
              <Card.Title >Get Your Prescribed Medicines here</Card.Title>
                  <Card.Text >
                    Here you can get your prescribed medicines via home delivery safely and securedly.
                    <br></br>
                    Go Medico - Go Online
                  </Card.Text>
                <button><a href = "http://localhost/prescribe/sellerImg.html">Buy Now</a></button>
              </Card.Body>
            </Card>

            <Card style = {{width: '18rem'}}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <button onClick = {() => this.changeState(2)}>Buy Now</button>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                  <Card.Text>
                    Here join us Dear seller. You can provide your selling details and become a part of our business.
                  </Card.Text>
                  <button onClick = {() => this.changeState(3)}>Buy Now</button>
              </Card.Body>
            </Card>
            
           </div>
           <br>
            </br>
            <br>
            
            </br>
            <p>hello</p>
        
      <br>
      </br>
      <br></br><br></br>
      <br></br>
     </div>
    
         

    

    )
  }
}
}

export default Home;


