const url = "https://api.covid19india.org/data.json";
let response = fetch(url);
async function calldata(url) {
    const response = await fetch(url);
    var data = await response.json();

    var datelabels = [];
    var total_confirmed = [];
    var total_active = [];
    var total_recovered = [];
    var total_deceased = [];
    const l = data.cases_time_series.length;
    var j = 0;
    for (var i = l - 30 - 1; i < l; i += 5) {
        datelabels.push(data.cases_time_series[i].date);
        total_confirmed.push(data.cases_time_series[i].totalconfirmed);
        total_recovered.push(data.cases_time_series[i].totalrecovered);
        total_deceased.push(data.cases_time_series[i].totaldeceased);
        total_active[j] = total_confirmed[j] - total_deceased[j] - total_recovered[j];
        j++;
    }

    const graphdata = {
        labels: datelabels,
        datasets: [{
                label: 'Total Cases',
                data: total_confirmed,
                borderColor: '#D53E43',
                backgroundColor: "#D53E43"
            },
            {
                label: 'Active Cases',
                data: total_active,
                borderColor: '#E9721C',
                backgroundColor: "#E9721C"
            }
        ]
    };

    const config = {
        type: 'line',
        data: graphdata,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 30,
                    }
                },
                title: {
                    display: true,
                    text: 'Covid-19 Statistics',
                    position: 'top',
                    font: {
                        size: '25px'
                    }
                }
            }
        },
    };

    var ctx = document.getElementById('linechart').getContext('2d');
    var chart = new Chart(ctx, config)
    var s = data.cases_time_series.length;
    confirmed.innerHTML = "Total Confirmed : <span>" + data.cases_time_series[s - 1].totalconfirmed + "</span>";
    active.innerHTML = "Total Active : <span>" + (data.cases_time_series[s - 1].totalconfirmed - data.cases_time_series[s - 1].totalrecovered - data.cases_time_series[s - 1].totaldeceased) + "</span>";
    recovered.innerHTML = "Total Recovered : <span>" + data.cases_time_series[s - 1].totalrecovered + "</span>";
    deceased.innerHTML = "Total Deceased : <span>" + data.cases_time_series[s - 1].totaldeceased + "</span>";

    var table=document.createElement('table');
    var tr=document.createElement('tr');

    tr.innerHTML=`<tr>
    <th><span>STATE</span></th>
    <th>TOTAL CONFIRMED</th>
    <th>ACTIVE CASES</th>
    <th>RECOVERED</th>
    <th>DEATHS</th>
    </tr>`;
    table.appendChild(tr);
    
    var len=data.statewise.length;
    var statewise=data.statewise;

    console.log(statewise);
    for(var i=1;i<len;i++)
    {
        if(i!=31)
        {
            var tr=document.createElement('tr');
            tr.innerHTML=`
            <td>`+statewise[i].state+`</td>
            <td>`+statewise[i].confirmed+`</td>
            <td>`+statewise[i].active+`</td>
            <td>`+statewise[i].recovered+`</td>
            <td>`+statewise[i].deaths+`</td>`
            table.appendChild(tr);
        }
        else
        continue;
    }
    document.getElementById('table').appendChild(table);

}

calldata(url);