/* eslint-disable */

export class FetchAndReturnData {
  static async fetchData(location) {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=f1f9fb8473e64e31b6a135518252205&q=${location}&days=7&aqi=no&alerts=no`
      );
      // http://api.weatherapi.com/v1/forecast.json?key=f1f9fb8473e64e31b6a135518252205&q=${location.value}&days=1&aqi=no&alerts=no
      //http://api.weatherapi.com/v1/current.json?key=f1f9fb8473e64e31b6a135518252205&q=${location.value}&aqi=no
      const data = await response.json();

      return data;
    } catch (error) {
      //   return 'error', error;
      console.error(error);
      throw error;
    }
  }
}
