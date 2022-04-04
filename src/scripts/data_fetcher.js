const DataFetcher = {
    getAirport: async function(query){
        const response = await fetch(`/search?searchTerm=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const airportData = await response.json();
        console.log(airportData);
        // console.log(airportData[query][0].state_full);
        // return airportData[query][0];
        return airportData;
    }
}

export default DataFetcher;