//import dataCountries from '../Data/countries.geojson';
import './Map.css';
import { Component } from 'react';
import L from 'leaflet';
import dataCountries from '../Data/countries.json'


  
  class Map extends Component {
    constructor(props){
      super(props);
      this.state = {
          data: this.props.data,
          deathDataSelected : true
      }
  }
  componentDidMount() {

    this.map = L.map("map", {
      center: [32,0],
      zoom: 2,
      layers: [
        L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmxvcnZhbmRla2VyY2tob3ZlIiwiYSI6ImNqdGZyMmtrejAxYWw0M3A2OGtwdTMxNWEifQ.5U-KSDZfyKNC_Z74fEWj6g",
        {
          minZoom: 2,
          maxZoom: 8,
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          id: "streets-v9"
        })
      ]
    });

    this.geojson = L.geoJson(dataCountries, {
      style: (feature) => this.mapStyle(feature),
      onEachFeature: this.onEachFeature
    }).addTo(this.map);

//  -------------------------------------Adding White Window for data 

    this.info = L.control();
    this.info.onAdd = function() {
      this._div = L.DomUtil.create("div", "info");
      this.update();
      return this._div;
    };

    this.info.update = function(props, state) {
      if(typeof(state) === "undefined" || typeof(this._div) === "undefined") return this._div.innerHTML = "<h4>Hover over a country</h4>"
      
      let country = state.data.find(country => country.iso3 === props.ISO_A3);
      
      //console.log(state)
      this._div.innerHTML =
        state.deathDataSelected? "<h4> Deaths due of Covid </h4>" +
        
          "<b>" +
            "Country : " + props.name +
            "</b><br /><br/>" +
            
             (typeof(country) !== "undefined" ? "Number of deaths : " + country.deaths.value : "No Data") 
            
             : "<h4> Confirmed Cases </h4><b>" +
             "Country : " + props.name +
             "</b><br />" +
             
             (typeof(country) !== "undefined" ? "Number of confirmed cases : " + country.confirmed.value : "No Data")
            
          
    

        }
    this.info.addTo(this.map);


    /* this.scale = L.control();
    this.scale.onAdd = function() {
      this._div = L.DomUtil.create("div", "scale");
      this.update();
      return this._div;
    };

    this.scale.update = function(props, state) {
      if(typeof(state) === "undefined" || typeof(this._div) === "undefined") return this._div.innerHTML = "<h4>Hover over a country</h4>"
      
      
      
      //console.log(state)
      this._div.innerHTML =
        state.deathDataSelected? "<h4> Scale :</h4>" +
        
          "<br/>"
          +"<rect x=\"10\" y=\"355\" width=\"20\" height=\"20\" class=\"key colour0\" />" + "<text x=\"35\" y=\"370\">0</text>"
            
             : "<h4> Scale : </h4><b>" 
             
        }
    this.scale.addTo(this.map); */
    // add layer
    this.layer = L.layerGroup().addTo(this.map);

    /* if (this.state.heatingSelected !== this.props.heatingSelected){ this.setState({ heatingSelected: this.props.heatingSelected });} */
  }


  componentDidUpdate(prevProps, prevState){
    
    if (prevProps.data !== this.props.data) {
    
       this.setState({ data: this.props.data })
  
    }
    this.geojson = L.geoJson(dataCountries, {
      style: (feature) => this.mapStyle(feature),
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
  }
  
  mapStyle = (feature) => {
    
    return ({
      weight: 2,
      opacity: 1,
      color: "#778899",
      dashArray: "0",
      fillOpacity: 0.7,
      fillColor: this.state.deathDataSelected ? this.getColorDeaths(feature.properties.ISO_A3) : this.getColorConfirmed(feature.properties.ISO_A3)
    });
  }
  
  
  getColorDeaths = (d) =>{
    let country = this.state.data.find(country => country.iso3 === d);
    
    
    if(typeof(country) === 'undefined' || typeof(country.deaths) === 'undefined'){ 
      //console.log(country.iso3); 
      
      return "#F0F8FF";

        }else{
          return country.deaths.value > 200000
          ? "#800026"
          : country.deaths.value > 100000
          ? "#BD0026"
          : country.deaths.value > 50000
            ? "#E31A1C"
            : country.deaths.value > 10000
              ? "#FC4E2A"
              : country.deaths.value > 5000
              ? "#FD8D3C"
              : country.deaths.value > 3000 ? "#FEB24C" : country.deaths.value > 1000 ? "#FED976" : "#FFEDA0"
  }}
  
  getColorConfirmed = (d) =>{
    let country = this.state.data.find(country => country.iso3 === d)
    
    if(typeof(country) === 'undefined' || typeof(country.deaths) === 'undefined'){
    return "#F0F8FF";
  }else{
    return country.confirmed.value > 5000000
    ? "#000431"
    : country.confirmed.value > 500000
      ? "#01065A"
      : country.confirmed.value > 100000
        ? "#021CA4"
        : country.confirmed.value > 50000
          ? "#3099FE"
          : country.confirmed.value > 10000
            ? "#60B2FE"
            : country.confirmed.value > 5000 ? "#90CCFE" : country.confirmed.value > 1000 ? "#F0FFFE" : "#F0FFFE";
  }}

  /* zoomOut = () => {
    this.map.setView([40, -16.5], 5.5);
  } */

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature
    });
  }


  highlightFeature = (e) => {
    var layer = e.target;
    layer.setStyle({
      weight: 3,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7
    });
    layer.bringToFront();
    this.info.update(layer.feature.properties, this.state);   //update info in window
  }

  resetHighlight = (event) => {
    this.geojson.resetStyle(event.target);
    this.info.update();
  }

  zoomToFeature = (e) => {
    this.map.fitBounds(e.target.getBounds());
  }


  render() {
    return (
      <div id="container">
        <div id="map"></div>
        <div className={"btn-group"}>
          <button className={"switch_data_button"} onClick={()=>{this.setState({deathDataSelected : !this.state.deathDataSelected})}}>{this.state.deathDataSelected ? "Switch to Confirmed Cases Data" : "Switch To Death Cases Data"}</button>
          <button className={"zoom"} onClick={() => {this.map.setView([32,0], 2)}}>Center Map Position</button>
        </div>
      </div>
      )} 
    }
  
  
  export default Map;