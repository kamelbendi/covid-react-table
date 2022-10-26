//import dataCountries from '../Data/countries.geojson';
import './Map.css';
import { Component } from 'react';
//import L from 'leaflet';




const style = {
    width: "50%",
    height: "40%"
  };

  /* const mapStyle = (feature) => {
    return ({
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: getColor(feature.properties.density)
    });
  } */
  
 /*  const getColor = (d) =>{
    return d > 1000
    ? "#800026"
    : d > 500
      ? "#BD0026"
      : d > 200
        ? "#E31A1C"
        : d > 100
          ? "#FC4E2A"
          : d > 50
            ? "#FD8D3C"
            : d > 20 ? "#FEB24C" : d > 10 ? "#FED976" : "#FFEDA0";
  } */
  class Map extends Component {
    constructor(props){
      super(props);
      this.state = {
          data: this.props.data,
          countryList : this.props.countryList
      }
  }/* 
    componentDidMount() {
      // create map
      //console.log(Object.keys(data.features[0].properties));
      console.log(dataCountries);
      this.map = L.map("map", {
        center: 40,
        zoom: 5,
        layers: [
          L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmxvcnZhbmRla2VyY2tob3ZlIiwiYSI6ImNqdGZyMmtrejAxYWw0M3A2OGtwdTMxNWEifQ.5U-KSDZfyKNC_Z74fEWj6g",
          {
            maxZoom: 15,
            attribution:
              'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: "streets-v9"
          })
        ]
      });
  
      this.geojson = L.geoJson(dataCountries, {
        style: mapStyle,
        onEachFeature: this.onEachFeature
      }).addTo(this.map);
  
      this.info = L.control();
  
      this.info.onAdd = function(map) {
        this._div = L.DomUtil.create("div", "info");
        this.update();
        return this._div;
      };
  
      this.info.update = function(props) {
        this._div.innerHTML =
          "<h4>Energy poverty in Portugal</h4>" +
          (props
            ? "<b>" +
              props.name +
              "</b><br />" +
              props.density +
              " people / mi<sup>2</sup>"
            : "Hover over " + this.region);
      };
  
      this.info.addTo(this.map);
  
      // add layer
      this.layer = L.layerGroup().addTo(this.map);
    }
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
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7
      });
  
      layer.bringToFront();
  
      this.info.update(layer.feature.properties);
    }
    resetHighlight = (event) => {
      this.geojson.resetStyle(event.target);
      this.info.update();
    }
    zoomToFeature = (e) => {
      this.map.fitBounds(e.target.getBounds());
    } */
    render() {
      return <div id="map" style={style}/>;
      }
  }
  
  export default Map;