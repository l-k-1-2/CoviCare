var typingTimer;
var doneTypingInterval = 1500;

$('#email').keyup(function () {
    clearTimeout(typingTimer);
    if ($('#email').val()) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
});

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

async function validate() {
    var ip=document.getElementsByTagName('input');
    var val=0;
    for(var i=0;i<3;i++)
    {
        if(ip[i].value=="")
        {
            console.log(ip[i].value);
            ip[i].setAttribute("class","form-control is-invalid");
        }
        else if(i==1 && doneTyping()==false)
        {
            continue;
        }
        else
        {
            val++;
            ip[i].setAttribute("class","form-control is-valid");
        }
    }
    if(val==3)
    {
        document.getElementById('form').submit();
        console.log("form complete");
    }
}