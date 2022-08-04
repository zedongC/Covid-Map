import axios from "axios";

export const DataService = {
    getAllCountyCases: function() {
        // only get a promise, not json, we do not deal with the data in service
        return axios.get("https://disease.sh/v3/covid-19/jhucsse/counties");
    }
}