import { Component} from 'react';
import './App.css';


class App extends Component {
  state = {
    data: [{
      "confirmed" : {"value": 300}, 
      "deaths" :   {"value": 300} 
    }],
    countryList: {
      "countries" : [
                      {
                        "name" : "testCountry",
                        "iso3" : "tc"
                      }
                    ]
    }
  }
  LoadEveryCountryData = () => {
    this.setState({ data: [{
      "confirmed" : {"value": 300}, 
      "deaths" :   {"value": 300} 
    }] });
    this.state.countryList.countries.map(country => this.getCountryData(country.name));
  }
  ResetTableToInitialValue= () => {
    this.setState({ data: [{
      "confirmed" : {"value": 300}, 
      "deaths" :   {"value": 300} 
    }] });
  }
  componentDidMount(){
    // fetch Countries from Country API
    fetch('https://covid19.mathdro.id/api/countries')

    .then((response) => response.json())

    .then(countryList => {
        this.setState({ countryList: countryList });
    });
    

  }
// retrieving data from every country

 getCountryData = async (country) => {
  const response = await fetch('https://covid19.mathdro.id/api/countries/' + country);
  const result = response.json();
  
  this.setState({data : [...this.state.data, await result /* {
    "confirmed" : await result.confirmed,/* {"value": 300}, 
    "deaths" :  await result.deaths/* {"value": 300} 
  } */]});
}
render (){
  return (
    <div className="app-container">
      <button onClick={this.LoadEveryCountryData}>Load Every Country Data from API</button>
      <button onClick={this.ResetTableToInitialValue}>Rest Table to test</button>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Symbol</th>
              <th>Confirmed Covid cases</th>
              <th>deaths</th>
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

        {console.log(this.state.data)}
        {/* {setTimeout(()=>this.state.data.map((d,i)=> <p key={i}>{d.deaths.value}</p>),5000)} */}
        {/* <p>{typeof(this.state.data[10].confirmed.value) !== 'undefined' && this.state.data[10] !== null &&
        this.state.data[10].confirmed.value}</p>  */}
    </div>
  )
}
}

export default App;
