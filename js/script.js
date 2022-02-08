const input = document.querySelector("input");
const button = document.querySelector("button");
const autocomplete = document.querySelector(".autocomplete > ul");
const result = document.querySelector(".result");
let sortArr = [];
let cnt = 0;
let stArr = []; // 자동완성 리스트 역이름

input.focus();
input.addEventListener("input", e => {
    sortArr = [];
    autocomplete.innerHTML = "";
    stationList.data.forEach(auto);
    stArr = ["", "", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < 10; i++) { // 자동완성 리스트 출력
        const liTag = document.createElement("li");
        liTag.innerHTML = `${sortArr[i].station_nm.split(input.value)[0]}<span>${input.value}</span>${sortArr[i].station_nm.split(input.value)[1]}역 ${line(sortArr[i].line_num)}`;
        liTag.classList.add("list");
        autocomplete.appendChild(liTag);
        listPush(`${sortArr[i].station_nm}`);
    }
    if (e.key == "Enter") { // Enter키로 검색결과 출력
        result.innerHTML = "";
        search();
    }
});
button.addEventListener("click", () => { // 버튼 클릭으로 검색결과 출력
    result.innerHTML = "";
    search();
});
function auto(ele, idx) { // 자동완성 리스트 정렬
    let stName = stationList.data[idx].station_nm;
    if (stName.includes(input.value) && input.value.length != 0) {
        sortArr.push(stationList.data[idx]);
        sortArr.sort(function sortAuto(a, b) {
            if (a.station_nm < b.station_nm) {
                return -1;
            }
            if (a.station_nm > b.station_nm) {
                return 1;
            }
            return 0;
        });
    }
}
function search() { // 검색결과 출력
    let firstTime;
    let lastTime;
    for (let i = 0; i < 10; i++) {
        const divTag = document.createElement("div");
        timeList.data.forEach(function (ele) { // 시간표
            if (sortArr[i].fr_code == ele.fr_code) {
                firstTime = ele.first_time;
                lastTime = ele.last_time;
            }
        });
        if (typeof firstTime == "undefined") {
            divTag.innerHTML = `${sortArr[i].station_nm}역 ${line(sortArr[i].line_num)}`;
            result.appendChild(divTag);
        } else {
            divTag.innerHTML = `${sortArr[i].station_nm}역 ${line(sortArr[i].line_num)} 첫차: ${firstTime} / 막차: ${lastTime}`;
            result.appendChild(divTag);
        }
    }
}
function line(num) {
    let lineNm;
    switch (num) {
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
input.addEventListener("keydown", (e) => { // 자동완성 리스트 하이라이트
    let autoList = autocomplete.querySelectorAll("li");
    if (e.key === "ArrowDown" && autoList.length > 0) {
        if (cnt === 0) {
            autoList[cnt].classList.replace("list", "listSelect");
            input.value = `${stArr[cnt]}`;
        } else if (cnt > 0 && cnt < autoList.length) {
            autoList[cnt - 1].classList.replace("listSelect", "list");
            autoList[cnt].classList.replace("list", "listSelect");
            input.value = `${stArr[cnt]}`;
        } else if (cnt === autoList.length) {
            autoList[cnt - 1].classList.replace("listSelect", "list");
            cnt = 0;
            autoList[cnt].classList.replace("list", "listSelect");
            input.value = `${stArr[cnt]}`;
        } else if (cnt > autoList.length) {
            cnt = 0;
            autoList[cnt].classList.replace("list", "listSelect");
            input.value = `${stArr[cnt]}`;
        }
        cnt++;
    }
});
function listPush(str) { // 배열에 역이름 저장
    for (let i = 0; i < 10; i++) {
        if (stArr[i] === "") {
            stArr[i] = str;
            break;
        }
    }
}