url = "https://api.rootnet.in/covid19-in/contacts";
let response = fetch(url);
async function getdata(url) {
    const response = await fetch(url);
    var data = await response.json();
    data = data.data.contacts;
    console.log(data);

    var table = document.createElement('table');

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = "Phone Number";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = ":";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = data.primary.number;
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = "Toll Free Number";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = ":";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = "1075";
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = "Email";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = ":";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = data.primary.email;
    tr.appendChild(td);
    table.appendChild(tr);

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = "Website";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = ":";
    tr.appendChild(td);
    var td = document.createElement('td');
    td.innerHTML = "abc@email.com";
    tr.appendChild(td);
    table.appendChild(tr);

    document.getElementsByClassName('national')[0].appendChild(table);

    var table = document.createElement('table');    
    var s=data.regional.length;
    for (var i = 0; i < s; i++) {
        
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = "State";
        td.setAttribute("class","state");
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = ":";
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = data.regional[i].loc;
        tr.appendChild(td);
        table.appendChild(tr);

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = "Toll Free Number";
        td.setAttribute("class","state");
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = ":";
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = data.regional[i].number;
        tr.appendChild(td);
        table.appendChild(tr);

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = "";
        td.setAttribute("class","space");
        tr.appendChild(td);
        table.appendChild(tr);

        document.getElementsByClassName('regional')[0].appendChild(table);
    }

}

getdata(url);