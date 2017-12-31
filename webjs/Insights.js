function onpress(id) {
    document.getElementById("Precision").style.visibility = 'hidden';
    document.getElementById("Precision").style.display = 'none';

    document.getElementById("Domination").style.visibility = 'hidden';
    document.getElementById("Domination").style.display = 'none';

    document.getElementById("Socery").style.visibility = 'hidden';
    document.getElementById("Socery").style.display = 'none';

    document.getElementById("Resolve").style.visibility = 'hidden';
    document.getElementById("Resolve").style.display = 'none';

    document.getElementById("Inspiration").style.visibility = 'hidden';
    document.getElementById("Inspiration").style.display = 'none';

    if(id == 'button0')
    {
        document.getElementById('Precision').style.visibility = 'visible';
        document.getElementById('Precision').style.display = 'inline-block';
    }
    else if(id == 'button1')
    {
        document.getElementById('Domination').style.visibility = 'visible';
        document.getElementById('Domination').style.display = 'inline-block';
    }
    else if(id == 'button2')
    {
        document.getElementById('Socery').style.visibility = 'visible';
        document.getElementById('Socery').style.display = 'inline-block';
    }
    else if(id == 'button3')
    {
        document.getElementById('Inspiration').style.visibility = 'visible';
        document.getElementById('Inspiration').style.display = 'inline-block';
    }
    else
    {
        document.getElementById('Resolve').style.visibility = 'visible';
        document.getElementById('Resolve').style.display = 'inline-block';
    }


    console.log("here");



}
