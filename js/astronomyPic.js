window.onload = pageReady;

function pageReady(){
    //Output blocks
    var apodOutput = document.getElementById("apod__apiOutput");
    var apodIntro = document.getElementById("apod__apiIntro");

    //Get date range
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    var apodDate = year+"-"+month+"-"+date;

    //Setting APOD key & url
    const apodKEY = "DEMO_KEY";
    const apodUrl = "https://api.nasa.gov/planetary/apod?api_key="+apodKEY+"&date="+apodDate;

    //Connect API
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.status===200){
            if(xhr.readyState===4){
                const data = xhr.response;
                if(data.media_type === "image"){
                    apodOutput.innerHTML = "<img src='"+data.url+"' width='960'>";
                }else if(data.media_type === "video"){
                    apodOutput.innerHTML = "<iframe src='"+data.url+"' width='960' height='540' style='border:1px solid black;'></iframe>";
                }
                apodIntro.innerHTML = "<h2>"+data.title+"</h2><p>"+data.date+"</p><p>"+data.explanation+"</p>";
            }
        }
    }

    xhr.open('GET',apodUrl);
    xhr.responseType = "json";
    xhr.send(null);
}