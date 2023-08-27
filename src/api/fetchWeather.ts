import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "1e1072d2385783cf795223083eea52fd";

export default async function GetWeather(query: string) {
  try {
    const { data } = await axios.get(URL, {
      params: {
        q: query,
        units: "metric",
        APPID: API_KEY,
      },
    });
    return data;
  } catch (err: any) {
    return { msg: "Something went wrong!!", err };
  }
}
