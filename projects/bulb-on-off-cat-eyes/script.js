function switchOff() {
    document.getElementById("bulbImage").src = "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/bulb-go-off-img.png";
    document.getElementById("catImage").src = "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/cat-eyes-img.png";
    document.getElementById('OffSwitch').style.backgroundColor = "#cbd2d9";
    document.getElementById('switchStatus').textContent = "Switched Off";
    document.getElementById('OnSwitch').style.backgroundColor = "#22c55e";
}

function switchON() {
    document.getElementById("bulbImage").src = "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/bulb-go-on-img.png";
    document.getElementById("catImage").src = "https://d2clawv67efefq.cloudfront.net/ccbp-dynamic-webapps/cat-img.png";
    document.getElementById('switchStatus').textContent = "Switched ON";
    document.getElementById('OffSwitch').style.backgroundColor = "#e12d39";

    document.getElementById('OnSwitch').style.backgroundColor = "#cdb2d9";
}