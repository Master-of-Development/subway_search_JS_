const input = document.querySelector("input");
const button = document.querySelector("button");
const autocomplete = document.querySelector(".autocomplete > ul");
const result = document.querySelector(".result");

input.focus();
input.addEventListener("input", e => {
    console.log(input.value); // 검색어
    autocomplete.innerHTML = "";
    stationList.data.forEach(auto); // 검색어가 포함된 역정보
    if(e.key == "Enter") { // 검색결과
        result.innerHTML = "";
        stationList.data.forEach(search);
    }
});
button.addEventListener("click", () => { // 검색버튼 클릭
    result.innerHTML = "";
    stationList.data.forEach(search);
});

function auto(ele, idx) {
    if(input.value === ele.station_nm) {
        let stName = stationList.data[idx].station_nm;
        let lineNum = stationList.data[idx].line_num;
        const liTag = document.createElement("li");
        liTag.innerHTML = `${stName}역 ${line(lineNum)}`
        autocomplete.appendChild(liTag);
    }
}

function search(ele, idx) {
    if(input.value === ele.station_nm) {
        let stName = stationList.data[idx].station_nm;
        let lineNum = stationList.data[idx].line_num;
        let firstTime = timeList.data[idx].first_time;
        let lastTime = timeList.data[idx].last_time;
        const divTag = document.createElement("div");
        divTag.innerHTML = `${stName}역 ${line(lineNum)} 첫차: ${firstTime} / 막차: ${lastTime}`;
        result.appendChild(divTag);
    }
}

function line(num) {
    let lineNm;
    switch(num) {
        case "k":
            lineNm = "공항철도";
            break;
        case "b":
            lineNm = "분당선";
            break;
        case "a":
            lineNm = "공항철도";
            break;
        case "g":
            lineNm = "경춘선";
            break;
        case "s":
            lineNm = "신분당선";
            break;
        case "su":
            lineNm = "수인선";
            break;
        case "i":
            lineNm = "인천 1호선";
            break;
        case "e":
            lineNm = "용인경전철";
            break;
        case "u":
            lineNm = "의정부경전철";
            break;
        default:
            lineNm = num + "호선";
    }
    return lineNm;
}

/*
forin
foreach
map
filter
*/