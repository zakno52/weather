// eslint-disable-next-line import/prefer-default-export
export class FetchAndReturnData {
  static async fetchData(location) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=f1f9fb8473e64e31b6a135518252205&q=${location}&days=7&aqi=no&alerts=no`
      );
      const data = await response.json();

      return data;
    } catch (error) {
      //   return 'error', error;

      throw error;
    }
  }
}
