function change(id) {
    var button=document.getElementById(id);
    console.log(button.childNodes[1].childNodes[3].childNodes[1].childNodes[1]);
    var icon=button.childNodes[1].childNodes[3].childNodes[1].childNodes[1]
    var className=icon.className;
    if(className=='fas fa-angle-down icon')
    {
        icon.setAttribute("class","fas fa-angle-up icon");
    }
    else
    {
        icon.setAttribute("class","fas fa-angle-down icon");
    }
}

const url="https://api.covid19india.org/data.json";
let response=fetch(url);
async function calldata(url) {
    const response=await fetch(url);
    var data=await response.json();
    
    var s=data.cases_time_series.length;
    total_cases.innerHTML="Total : "+data.cases_time_series[s-1].totalconfirmed;
    new_cases.innerHTML="New : "+data.cases_time_series[s-1].dailyconfirmed;

    active.innerHTML="Total : "+(data.cases_time_series[s-1].totalconfirmed-data.cases_time_series[s-1].totalrecovered-data.cases_time_series[s-1].totaldeceased);
    
    recovered.innerHTML="Total : "+data.cases_time_series[s-1].totalrecovered;
    new_recovered.innerHTML="New : "+data.cases_time_series[s-1].dailyrecovered;

    deceased.innerHTML="Total : "+data.cases_time_series[s-1].totaldeceased;
    new_deceased.innerHTML="New : "+data.cases_time_series[s-1].dailydeceased;

    // -------------Chart Data Array--------------

    var datelabels=[];
    var total_confirmed=[];
    var total_active=[];
    var total_recovered=[];
    var total_deceased=[];  
    const l = data.cases_time_series.length;
    var j=0;
    for(var i=l-30-1;i<l;i+=5)
    {
        datelabels.push(data.cases_time_series[i].date);
        total_confirmed.push(data.cases_time_series[i].totalconfirmed);
        total_recovered.push(data.cases_time_series[i].totalrecovered);
        total_deceased.push(data.cases_time_series[i].totaldeceased);
        total_active[j]=total_confirmed[j]-total_deceased[j]-total_recovered[j];
        j++;
    }
    // ----------Confirmed Chart---------------

    var ctx = document.getElementById('confirmed_chart').getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 0, 1779, 0);
    gradientFill.addColorStop(0.5, "#2D3391");
    gradientFill.addColorStop(0, "#ffffff");
    
    var confirmed_chart = new Chart(ctx, 
    {
            type: 'line',
            data: {
                    labels: datelabels,
                    datasets: [{
                    backgroundColor: gradientFill, 
                    data: total_confirmed,
                    borderColor:'#2D3391',
                      borderWidth: 4,
                    }],
                  },
            options:{
                legend: {
                    display: false
                 },
                elements: {
                    point:{
                        radius: 0
                    }
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            fontSize:8,
                            stepSize:200000
                        }
                    }],
                    xAxes:[{
                        gridLines: {
                            // display:false,
                        },
                        ticks:{
                            fontSize:8
                        }
                    }],
                }
            }
    });

    // ------------------Active Cases Chart---------------

    var ctx = document.getElementById('active_chart').getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 0, 1779, 0);
    gradientFill.addColorStop(0.5, "#E9721C");
    gradientFill.addColorStop(0, "#ffffff");
    
    var active_chart = new Chart(ctx, 
    {
            type: 'line',
            data: {
                    labels: datelabels,
                    datasets: [{
                    backgroundColor: gradientFill, 
                    data: total_active,
                    borderColor:'#E9721C',
                      borderWidth: 4,
                    }],
                  },
            options:{
                legend: {
                    display: false
                 },
                elements: {
                    point:{
                        radius: 0
                    }
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            fontSize:8,
                        }
                    }],
                    xAxes:[{
                        gridLines: {
                            // display:false,
                        },
                        ticks:{
                            fontSize:8
                        }
                    }],
                }
            }
        });
        
    // ------------------Recovered Chart --------------------
    
    var ctx = document.getElementById('recovered_chart').getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 0, 1779, 0);
    gradientFill.addColorStop(0, "#ffffff");
    gradientFill.addColorStop(0.5, "#03AD5C");
    
    var recovered_chart = new Chart(ctx, 
    {
            type: 'line',
            data: {
                    labels: datelabels,
                    datasets: [{
                    backgroundColor: gradientFill, 
                    data: total_recovered,
                    borderColor:'#03AD5C',
                      borderWidth: 4,
                    }],
                  },
            options:{
                legend: {
                    display: false
                 },
                elements: {
                    point:{
                        radius: 0
                    }
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            fontSize:8,
                        }
                    }],
                    xAxes:[{
                        gridLines: {
                            // display:false,
                        },
                        ticks:{
                            fontSize:8
                        }
                    }],
                }
            }
        });

        // -----------------------Deceased Charts-------------------

    var ctx = document.getElementById('deceased_chart').getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 0, 1779, 0);
    gradientFill.addColorStop(0.5, "#D53E43");
    gradientFill.addColorStop(0, "#ffffff");
    
    var deceased_chart = new Chart(ctx, 
    {
            type: 'line',
            data: {
                    labels: datelabels,
                    datasets: [{
                    backgroundColor: gradientFill, 
                    data: total_deceased,
                    borderColor:'#D53E43',
                      borderWidth: 4,
                    }],
                  },
            options:{
                legend: {
                    display: false
                 },
                elements: {
                    point:{
                        radius: 0
                    }
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            fontSize:8,
                            stepSize:600
                        }
                    }],
                    xAxes:[{
                        ticks:{
                            fontSize:8
                        }
                    }],
                }
            }
        });
}

calldata(url);

function getcovid() {
    document.getElementById('learnmoreform').submit();
}

function getstatistics() {
    document.getElementById('learnmorestats').submit();
}

function getvaccination() {
    document.getElementById('learnmorevaccination').submit();

}