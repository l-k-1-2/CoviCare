url="https://covid.ourworldindata.org/data/owid-covid-data.json";
let response=fetch(url);
async function get_data(url) {
    const response = await fetch(url);
    var data = await response.json();
    data=data.IND.data;
    data=data[data.length-1]
    total_vaccinated.innerHTML=data.new_vaccinations;
    new_vaccinated_per_mil.innerHTML=data.new_vaccinations_smoothed_per_million;
    single_dose.innerHTML=data.people_vaccinated;
    fully_vaccinated.innerHTML=data.people_fully_vaccinated;
}
get_data(url);