function doneTyping() {
    var e = document.getElementById('email');
    var x = e.value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        e.setAttribute("class", "form-control is-invalid")
        return false;
    } else {
        e.setAttribute("class", "form-control is-valid");
        return true
    }
}

function validate() {
    var val=0,i;
    var ip=document.getElementsByTagName('input');
    for(i=0;i<4;i++)
    {
        if(ip[i].value=="")
        {
            console.log(ip[i].value);
            ip[i].setAttribute("class","form-control is-invalid");
        }
        else
        {
            val++;
            ip[i].setAttribute("class","form-control is-valid");
        }
    }
    console.log(i);
    var pattph=/^\d{10}$/;
    var pattpin=/^\d{6}$/;

    if(pattph.test(ip[i].value))
    {
        val++;
        ip[i].setAttribute("class","form-control is-valid");
    }
    else
    {
        ip[i].setAttribute("class","form-control is-invalid");
    }

    i++;
    if(pattpin.test(ip[i].value))
    {
        val++;
        ip[i].setAttribute("class","form-control is-valid");
    }
    else
    {
        ip[i].setAttribute("class","form-control is-invalid");
    }

    i++;
    if(doneTyping()==true)
    {
        val++;
        ip[i].setAttribute("class","form-control is-valid");
    }
    else
    {
        ip[i].setAttribute("class","form-control is-invalid");
    }

    if(val==7)
    {
        console.log('form complete');
        document.getElementById('form').submit();
    }
}