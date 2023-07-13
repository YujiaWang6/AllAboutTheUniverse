window.onload = pageReady;
function pageReady(){
    //Output blocks
    var apod = document.getElementById("apod");

    //Get date range
    var today = new Date();
    var date1 = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    var apodStartDate = "";
    var apodEndDate = "";
    var monthAlt = "";
    if(date1>10){
        date2 = date1-10;
        apodStartDate = year+"-"+month+"-"+date2;
        apodEndDate = year+"-"+month+"-"+date1;
    }else{
        date2 = date1+10;
        if(month>1){
            monthAlt = month-1;
        }else{
            monthAlt = 12;
        }
        apodStartDate = year+"-"+monthAlt+"-"+date2;
        apodEndDate = year+"-"+month+"-"+date1;
    }

    //Setting APOD key & url
    const apodKEY = "DEMO_KEY";
    const apodUrl = "https://api.nasa.gov/planetary/apod?api_key="+apodKEY+"&start_date="+apodStartDate+"&end_date="+apodEndDate;

    var apodImage = [];
    //Connect API
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status ===200){
            if(xhr.readyState ===4){
                const data = xhr.response;
                //console.log(data);
                //Get all the images within the range and push them into array
                for(let i=0; i<data.length; i++){
                    if(data[i].media_type === "image"){
                        apodImage.push("url('"+data[i].url+"')");
                    }
                }

                //Change background function
                function apodChangeBG(){
                    var apodbg = apodImage[Math.floor(Math.random()*apodImage.length)]
                    apod.style.backgroundImage = apodbg;
                }
                setInterval(apodChangeBG,3000);
            }else{
                apod.style.backgroundColor = "black";
            }
        }
    }

    xhr.open('GET', apodUrl);
    xhr.responseType = "json";
    xhr.send(null);
}