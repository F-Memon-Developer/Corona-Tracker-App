import React from "react";
import { fetchGlobalData } from "./api";
import styles from "./App.module.css";
import { Cards, Chart, CountryPicker } from "./components";
import coronaImg from "./images/image.png";

class App extends React.Component {
    state = {
        data: {},
        country: '',
    };

    async componentDidMount() {
        const fetchedData = await fetchGlobalData();

        this.setState({ data: fetchedData });
    }
    handleCountryChange = async (country) => {
        const fetchedData = await fetchGlobalData(country);

        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImg} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        );
    }
}

export default App;
