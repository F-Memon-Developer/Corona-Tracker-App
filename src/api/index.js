import axios from "axios";

const BASE_URL = "https://disease.sh/v3/covid-19";

// ✅ Global data
export const fetchGlobalData = async (country) => {
  let changeableUrl = `${BASE_URL}/all`;
  if (country) {
    changeableUrl = `${BASE_URL}/countries/${country}`;
  }

  try {
    const { data: { cases, recovered, deaths, updated } } =
      await axios.get(changeableUrl);

    return {
      confirmed: cases,
      recovered,
      deaths,
      updated,
    };
  } catch (error) {
    console.log(error);

    console.error("Error fetching global data:", error);
  }
};

// ✅ Daily / Historical data
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(
      (`${BASE_URL}/historical/all?lastdays=all`)
    );
    const modifiedData = Object.keys(data.cases).map((date) => ({
      confirmed: data.cases[date],
      deaths: data.deaths[date],
      date,
    }));

    return modifiedData;
  } catch (error) {
    console.error("Error fetching daily data:", error);
  }
};

// ✅ Countries list
export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/countries`);
    return data.map((country) => country.country);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};

// ✅ Country-wise data
export const fetchCountryData = async (country) => {
  try {
    if (!country) return await fetchGlobalData();

    const { data: { cases, recovered, deaths, updated } } =
      await axios.get(`${BASE_URL}/countries/${country}`);

    return {
      confirmed: cases,
      recovered,
      deaths,
      updated,
    };
  } catch (error) {
    console.error(`Error fetching data for ${country}:`, error);
  }
};
