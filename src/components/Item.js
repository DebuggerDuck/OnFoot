import React, { Component } from 'react';
import './css/Item.css';
import postRestaurant from './lib/postRestaurant.js';
import DirectionsModal from './DirectionsModal';


class Item extends Component {
  constructor (props) {
    super()
    this.state = {};
  }

  directionsClick(e) {
    var geolocation = `${this.props.item.geometry.location.lat},${this.props.item.geometry.location.lng}`;
    this.props.displayDirections(geolocation, this.props.item.id);
  }
  
  saveRestaurant(e) {
    e.preventDefault();
    console.log("name",this.props.item.place_id,"id",this.props.item.name);
    postRestaurant(item.place_id,item.name);
  }

  // this function turns `item.price_level` into a dollar sign level
  starRating(){
    let score =this.props.item.rating;
    let str=''
    for (let i=0;i<Math.floor(score);i++){
      str+='★';
    }
    return str;
  }
  priceLevel() {
    var result = '';
    for (var i = 0; i < this.props.item.price_level; i++) {
      result += '$';
    }
    return result;
  }

render(){
   // variable string for link to Google maps directions
  let queryStr = "https://www.google.com/maps?saddr=My+Location&daddr=" + this.props.item.geometry.location.lat + "," + this.props.item.geometry.location.lng + "&dirflg=w"

  //get the latitude and longtitude of a restaurant
  var geolocation = `${this.props.item.geometry.location.lat},${this.props.item.geometry.location.lng}`;
  //url for google street view api
  var url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${geolocation}&key=${this.props.API}`
  let openText;
  if (this.props.item.opening_hours){
    if (this.props.item.opening_hours.open_now===true){
    openText="Open now"
    }else{
      openText="Closed now"
    }
  } else {
    openText="Unable to retrieve opening hours"
  }

  let savedButton;
  if (!this.props.isLogin){
    savedButton = function(){
      return <button>Add to saved list</button>
    }
  } else {
    savedButton = function(){
      return '';
    }
  }

    return (
    <li className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
      <div className='list-location-cont'>
      <span className="ribbon icon"><a href="/fav" title="title">{this.props.item.rating}{this.starRating()}, {this.priceLevel()}</a></span>
        <div className='list-location-info'>
          <img className="list-location-img" src={url} alt="Photo of a restaurant" />
          <div>
            <h3>{this.props.item.name}</h3>
            <p>{this.props.item.vicinity}</p>
            <p>{openText}</p>
              {/* Link to map directions */}
              <button className='list-location-button' target='_blank' href={queryStr}>Go</button>
              {
                this.props.isLogin ?
                <button className='list-location-button' onClick={this.saveRestaurant}>Try it later</button> : null
              }
            <DirectionsModal item={this.props.item} directionsClick={this.directionsClick.bind(this)}/>
<<<<<<< 757215ec029eb952fe7f2acacfba47c2c4b79b68
          </div>
        </div>
      </div>
||||||| merged common ancestors
            <div>{openText}</div>
          </figcaption>
        </figure>
      </a>
=======
            {savedButton()}
            <div>{openText}</div> 
          </figcaption>
        </figure>
      </a>
>>>>>>> Fixed slider bar
    </li>
    );
  }
};

export default Item;
