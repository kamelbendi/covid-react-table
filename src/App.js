import { Component} from 'react';
import './App.css';
import Map from './Components/Map';
import 'leaflet/dist/leaflet.css';
//import { nanoid } from '@reduxjs/toolkit';



class App extends Component {
  
  state = {
    
    data: [{
      "confirmed" : {"value": 30000}, 
      "deaths" :   {"value": 300000},
      "name":"Algeria",
      "iso3": "DZA",
      'id': "12334dzds43"
    }],
    
    //addData :  [{"name": "", "iso3":"", "confirmed": {"value": 0}, "deaths": {"value": 0}}],
       
    //editContactId: {index : null, name:"", deaths: {"value": 0}, confirmed: {"value": 0}, iso3: ""}
  }
  

  LoadEveryCountryData = async () => {
    
    //this.setState({ data : [] })
    
    //load all countries

    
      fetch('https://covid19.mathdro.id/api/countries')
    .then((response) => response.json())
    .then(countryList => {
      let filtered = countryList.countries.filter( country => typeof(country.iso3) !== 'undefined')
      this.setState({data: filtered})});
        //this.setState( {countryList : countryList});
    

         
}

  async componentDidUpdate(prevProps, prevState){
    if(this.state.data !== [] && prevState.data !== this.state.data){
      //await this.LoadEveryCountryData();
        this.state.data.map( async (country, index) => {
          fetch('https://covid19.mathdro.id/api/countries/' + country.name)
           .then((response) => response.json())
           .then( dataCovid => {
             let items = this.state.data;
             let item = {...items[index]};
             if(dataCovid.deaths) {item.deaths =  {value : dataCovid.deaths.value};
             item.confirmed = {value : dataCovid.confirmed.value};}
             items[index] = item;
             
             this.setState({data : items})})
             
     //get corresponsing data
     //this.state.data.map(data => this.getCountryData(this.state.data.name));
     
   })
    }
  }

  ResetTableToInitialValue= () => {
    this.setState({ data: [] }); 
  }


/*  handleAddCountry = (event) => {
  event.preventDefault();
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;
  
  const newFormData = {...this.state.addData}
  newFormData[fieldName] = fieldValue;

  this.setState({ addData : newFormData})

}

handleAddCountrySubmit = (event) => {
  event.preventDefault();
  const newCountry = {
    id: nanoid(),
    name : this.state.addData.name,
    iso3 : this.state.addData.iso3,
    deaths : {value : this.state.addData.deaths},
    confirmed : {value : this.state.addData.confirmed}
  }
  const countries = [...this.state.data, newCountry];
  this.setState({data : countries})
} */
  /* console.log(this.state.addData);
  console.log(this.state.data);
  console.log(this.state.countryList); */

  /* this.setState({addData: {
    "data" : [{"confirmed": 0, "deaths": 0}],
    "countryList" : {"countries" : [{"name":"", "iso3":""}]}
  } }) 
  
} */

/* handleEditClick = (event, index) => {
  event.preventDefault();
  const country = this.state.data[index];
  country.index = index;
  this.setState({editContactId: country});
}

saveDataFromButton = (event, index) => {
  event.preventDefault();
  const edit = this.state.editContactId;
  edit.index = null;
  const countryList = this.state.data;
  const country = countryList[index];
  delete country.index;
  country.name = edit.name
  country.iso3 = edit.iso3
  country.confirmed.value = edit.confirmed.value
  country.deaths.value = edit.deaths.value
  countryList[index] = country;
  //const countryList = this.state.data.slice(0, index-1).concat(country, this.state.data.slice(index+1, this.state.data.length - 1 ))
  this.setState({data: countryList})
  this.setState({editContactId : edit})
  
}

handleCancelEdit = (event) => {
  event.preventDefault();
  const country = this.state.editContactId;
  delete country.index;
  this.setState({editContactId : country});
}

handleDeleteClick = (event, index) => {
  event.preventDefault();
  const countries = this.state.data.slice(0,index-1).concat(this.state.data.slice(index+1, this.state.data.length-1));
  this.setState({data: countries});
}

handleInputChanges = (event) =>{
  event.preventDefault();
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;
  
  const newFormData = {...this.state.editContactId}
  if(fieldName==="iso3"|| fieldName === "name"){
    newFormData[fieldName] = fieldValue;}
  else{
    newFormData[fieldName].value = fieldValue;
  }

  this.setState({ editContactId : newFormData})

} */

render (){
  return (
    <div className="app-container">
      <div className='buttons'>
        <button onClick={this.LoadEveryCountryData} className='load-data'>Load Every Data from API</button>
        <button onClick={this.ResetTableToInitialValue} className='erase-data'>Erase data</button>
      </div>
      {console.log(this.state.data)}
      <Map data={this.state.data}></Map>

      {/* <div className="add">
          <h2>Add data for a specific country:</h2>
          <form onSubmit={this.handleAddCountrySubmit}>
            <input type="text" name="name" required="required" placeholder='Enter a Country Name' onChange={this.handleAddCountry}/>
            <input type="text" name="iso3" required="required" placeholder='Enter a Country Symbol ISO_A3' onChange={this.handleAddCountry}/>
            <input type="number" name="confirmed" required="required" placeholder='number of confirmed cases' onChange={this.handleAddCountry}/>
            <input type="number" name="deaths" required="required" placeholder='number of deaths' onChange={this.handleAddCountry}/>
            <button type="submit"  className='add-button'>Add</button>
          </form>
      </div>
      <form>
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
              this.state.data.map((country, index) => (
                <Fragment>
                  
                { this.state.editContactId.index === index ? <tr key={index+300}>
                    <td>
                      <input name="name" required="required" placeholder='enter a country' type='text' value={this.state.editContactId.name} onChange={this.handleInputChanges}/>
                    </td>
                    <td>
                      <input name="iso3" required="required" placeholder='enter a country' type='text' value={this.state.editContactId.iso3} onChange={this.handleInputChanges}/>
                    </td>
                    <td>
                      <input name="confirmed" required="required" placeholder='enter a country' type='number' value={this.state.editContactId.confirmed.value} onChange={this.handleInputChanges}/>
                    </td>
                    <td>
                      <input name="deaths" required="required" placeholder='enter a country' type='number' value={this.state.editContactId.deaths.value} onChange={this.handleInputChanges}/>
                    </td>
                    <td>
                      <button onClick={(event) => this.saveDataFromButton(event, index)}>Save</button>
                      <button onClick= {(event) => this.handleCancelEdit(event)}>Cancel</button>
                    </td>
                </tr>
                : <tr key={index}>
                    <td>{country.name}</td>
                    <td>{country.iso3}</td>
                  {typeof(country.confirmed) !== 'undefined' ? (<>
                    <td>{country.confirmed.value}</td>
                    <td>{country.deaths.value}</td>
                  </>)
                  :
                  (<><td></td>
                  <td></td></>)
                  } 
                  <td>
                    <button onClick={(event) => this.handleEditClick(event, index)}>Edit</button>
                    <button onClick={(event) => this.handleDeleteClick(event, index)}>Delete</button>
                  </td>
                </tr>}
                
          </Fragment>
              ))
            }
          </tbody>
        </table>
        </form> */}

        
        
        {/* {setTimeout(()=>this.state.data.map((d,i)=> <p key={i}>{d.deaths.value}</p>),5000)} */}
        {/* <p>{typeof(this.state.data[10].confirmed.value) !== 'undefined' && this.state.data[10] !== null &&
        this.state.data[10].confirmed.value}</p>  */}
    </div>
  )
}
}

export default App;
