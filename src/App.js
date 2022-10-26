import { Component} from 'react';
import './App.css';
import Map from './Components/Map';
import 'leaflet/dist/leaflet.css';
import { nanoid } from '@reduxjs/toolkit';


class App extends Component {
  state = {
    data: [{
      "confirmed" : {"value": 300}, 
      "deaths" :   {"value": 300} 
    }],
    countryList: {
      "countries" : [{"name":"First Country", "iso3": "FC"}]
    },
    addData : {
      "data" : [{"confirmed": {"value": 0}, "deaths": {"value": 0}}],
      "countryList" : {"countries" : [{"name":"", "iso3":""}]}
    }
  }
  LoadEveryCountryData = () => {
    this.setState({ countryList : []})
    this.setState({ data: [] });
    //load all countries
    fetch('https://covid19.mathdro.id/api/countries')
    .then((response) => response.json())
    .then(countryList => {
        this.setState({ countryList: countryList });
    });
    //get corresponsing data
    this.state.countryList.countries.map(country => this.getCountryData(country.name));
  }

  ResetTableToInitialValue= () => {
    this.setState({ data: [] }); 
    this.setState({countryList: {"countries":[]}});
  }

  componentDidMount(){
    
  }
// retrieving data from every country

 getCountryData = async (country) => {
  const response = await fetch('https://covid19.mathdro.id/api/countries/' + country);
  const result = response.json();
  this.setState({data : [...this.state.data, await result]});
}

handleAddCovidData = (event) => {
  event.preventDefault();
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;


if(fieldName==='confirmed'){
  // 1. Make a shallow copy of the items
  let addData = {...this.state.addData};
  // 2. Make a shallow copy of the item you want to mutate
  let data = {...addData.data[0]};
  // 3. Replace the property you're intested in
  data.confirmed.value = fieldValue;
  // 4. Put it back into our array. N.B. we *are* mutating the array here, 
  //    but that's why we made a copy first
  addData.data[0] = data;
  // 5. Set the state to our new copy
  this.setState({addData: addData});
  
}else if (fieldName==='deaths'){
  let addData = {...this.state.addData};
  // 2. Make a shallow copy of the item you want to mutate
  let data = {...addData.data[0]};
  // 3. Replace the property you're intested in
  data.deaths.value = fieldValue;
  // 4. Put it back into our array. N.B. we *are* mutating the array here, 
  //    but that's why we made a copy first
  addData.data[0] = data;
  // 5. Set the state to our new copy
  this.setState({addData: addData});
}

}

handleAddCountry = (event) => {
  event.preventDefault();
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;


  if(fieldName==='name'){
    // 1. Make a shallow copy of the items
    let addData = {...this.state.addData};
    // 2. Make a shallow copy of the item you want to mutate
    let data = {...addData.countryList.countries[0]};
    // 3. Replace the property you're intested in
    data.name = fieldValue;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, 
    //    but that's why we made a copy first
    addData.countryList.countries[0] = data;
    // 5. Set the state to our new copy
    this.setState({addData: addData});
    
  }else if (fieldName==='iso3'){
    let addData = {...this.state.addData};
    // 2. Make a shallow copy of the item you want to mutate
    let data = {...addData.countryList.countries[0]};
    // 3. Replace the property you're intested in
    data.iso3 = fieldValue;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, 
    //    but that's why we made a copy first
    addData.countryList.countries[0] = data;
    // 5. Set the state to our new copy
  }

}
handleAddData = (event) => {
  event.preventDefault();

  const dataArray = {"confirmed":{"value": this.state.addData.data[0].confirmed.value}, 'deaths': {"value": this.state.addData.data[0].deaths.value}, id: nanoid()};
  const countryObject = {"name":this.state.addData.countryList.countries[0].name, "iso3": this.state.addData.countryList.countries[0].iso3}; 
  this.setState({data: [...this.state.data, dataArray]})
  this.setState({countryList: {"countries" : [...this.state.countryList.countries, countryObject]}});
  console.log(this.state.addData);
  console.log(this.state.data);
  console.log(this.state.countryList);

  /* this.setState({addData: {
    "data" : [{"confirmed": 0, "deaths": 0}],
    "countryList" : {"countries" : [{"name":"", "iso3":""}]}
  } }) */
  
}
render (){
  return (
    <div className="app-container">
      <div className='buttons'>
        <button onClick={this.LoadEveryCountryData} className='button1'>Load Every Data from API</button>
        <button onClick={this.ResetTableToInitialValue}>Erase data</button>
      </div>

      <Map data={this.state.data} countryList={this.state.countryList}/>

      <div className="add">
          <h2>Add data for a specific country:</h2>
          <form>
            <input type="text" name="name" required="required" placeholder='Enter a Country Name' onChange={this.handleAddCountry}/>
            <input type="text" name="iso3" required="required" placeholder='Enter a Country Symbol' onChange={this.handleAddCountry}/>
            <input type="number" name="confirmed" required="required" placeholder='number of confirmed cases' onChange={this.handleAddCovidData}/>
            <input type="number" name="deaths" required="required" placeholder='number of deaths' onChange={this.handleAddCovidData}/>
            <button onClick={this.handleAddData}>Add</button>
          </form>
      </div>

        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Symbol</th>
              <th>Confirmed Covid cases</th>
              <th>deaths</th>
              <th>Actions</th>

            </tr>
            </thead> 
          <tbody>
            
            {
              this.state.data.map((d, index) => (
                <tr key={index}>
                  <td>{this.state.countryList.countries[index].name}</td>
                  <td>{this.state.countryList.countries[index].iso3}</td>
                  {typeof(d.deaths) !== 'undefined' && (<>
                    <td>{d.confirmed.value}</td>
                    <td>{d.deaths.value}</td>
                  </>)
                  
                  } 
                  
                </tr>
              ))
            } 
            
            
          </tbody>
        </table>

        {/* {console.log(this.state.data)} */}
        {/* {setTimeout(()=>this.state.data.map((d,i)=> <p key={i}>{d.deaths.value}</p>),5000)} */}
        {/* <p>{typeof(this.state.data[10].confirmed.value) !== 'undefined' && this.state.data[10] !== null &&
        this.state.data[10].confirmed.value}</p>  */}
    </div>
  )
}
}

export default App;
