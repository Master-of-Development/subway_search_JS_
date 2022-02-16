const input = document.querySelector("input");
const button = document.querySelector("button");
const autocomplete = document.querySelector(".autocomplete > ul");
const result = document.querySelector(".result");
const sortArr = [];
let count;

input.addEventListener("input", e => {
    count = 0;
    sortArr.splice(0, sortArr.length);
    autocomplete.innerHTML = "";
    stationList.data.forEach(auto);
    if (sortArr.length > 10) { // 자동완성 리스트 출력
        for (let i = 0; i < 10; i++) {
            const liTag = document.createElement("li");
            liTag.innerHTML = `${sortArr[i].station_nm.split(input.value)[0]}<span>${input.value}</span>${sortArr[i].station_nm.split(input.value)[1]}역 ${line(sortArr[i].line_num)}`;
            liTag.classList.add("list");
            autocomplete.appendChild(liTag);
        }
    } else {
        for (let i = 0; i < sortArr.length; i++) {
            const liTag = document.createElement("li");
            liTag.innerHTML = `${sortArr[i].station_nm.split(input.value)[0]}<span>${input.value}</span>${sortArr[i].station_nm.split(input.value)[1]}역 ${line(sortArr[i].line_num)}`;
            liTag.classList.add("list");
            autocomplete.appendChild(liTag);
        }
    }
    if (e.key == "Enter") { // Enter키로 검색결과 출력
        result.innerHTML = "";
        search();
    }
});
button.addEventListener("click", _ => { // 버튼 클릭으로 검색결과 출력
    result.innerHTML = "";
    search();
});
function auto(ele, idx) { // 자동완성 리스트 정렬
    let stName = stationList.data[idx].station_nm;
    if (stName.includes(input.value) && input.value.length != 0) {
        sortArr.push(stationList.data[idx]);
        sortArr.sort((a, b) => {
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
    const resultArr = [];
    let firstTime;
    let lastTime;
    stationList.data.forEach(ele => {
        if (ele.station_nm.includes(input.value) && input.value.length != 0) {
            resultArr.push(ele);
            resultArr.sort((a, b) => {
                if (a.station_nm < b.station_nm) {
                    return -1;
                }
                if (a.station_nm > b.station_nm) {
                    return 1;
                }
                return 0;
            });
        }
    });
    if (resultArr.length > 10) {
        for (let i = 0; i < 10; i++) {
            timeList.data.forEach(ele => { // 시간표
                if (resultArr[i].fr_code === ele.fr_code) {
                    firstTime = ele.first_time;
                    lastTime = ele.last_time;
                }
            });
            const tempA = `${resultArr[i].station_nm}역 ${line(resultArr[i].line_num)}`;
            const tempB = `${resultArr[i].station_nm}역 ${line(resultArr[i].line_num)} 첫차: ${firstTime} / 막차: ${lastTime}`;
            const divTag = document.createElement("div");
            divTag.innerHTML = typeof firstTime === "undefined" ? tempA : tempB;
            result.appendChild(divTag);
        }
    } else {
        for (let i = 0; i < resultArr.length; i++) {
            timeList.data.forEach(ele => { // 시간표
                if (resultArr[i].fr_code === ele.fr_code) {
                    firstTime = ele.first_time;
                    lastTime = ele.last_time;
                }
            });
            const tempA = `${resultArr[i].station_nm}역 ${line(resultArr[i].line_num)}`;
            const tempB = `${resultArr[i].station_nm}역 ${line(resultArr[i].line_num)} 첫차: ${firstTime} / 막차: ${lastTime}`;
            const divTag = document.createElement("div");
            divTag.innerHTML = typeof firstTime === "undefined" ? tempA : tempB;
            result.appendChild(divTag);
        }
    }
}
input.addEventListener("keydown", e => { // 자동완성 리스트 하이라이트
    const autoList = autocomplete.querySelectorAll("li");
    if (e.key === "ArrowDown" && autoList.length > 0) {
        count++;
        if (count === 1) {
            autoList[count - 1].classList.replace("list", "listSelect");
        } else if (count - 1 > 0 && count - 1 < autoList.length) {
            autoList[count - 2].classList.replace("listSelect", "list");
            autoList[count - 1].classList.replace("list", "listSelect");
        } else if (count - 1 === autoList.length) {
            autoList[count - 2].classList.replace("listSelect", "list");
            count = 1;
            autoList[count - 1].classList.replace("list", "listSelect");
        } else if (count - 1 > autoList.length) {
            count = 1;
            autoList[count - 1].classList.replace("list", "listSelect");
        }
        input.value = sortArr[count - 1].station_nm;
    }
    if (e.key === "ArrowUp" && autoList.length > 0) {
        count--;
        if (count === -1) {
            count = 10;
            autoList[count - 1].classList.replace("list", "listSelect");
        } else if (count - 1 > 0 && count - 1 < autoList.length) {
            autoList[count].classList.replace("listSelect", "list");
            autoList[count - 1].classList.replace("list", "listSelect");
        } else if (count === 1) {
            autoList[count].classList.replace("listSelect", "list");
            autoList[count - 1].classList.replace("list", "listSelect");
        } else if (count === 0) {
            autoList[count].classList.replace("listSelect", "list");
            count = 10;
            autoList[count - 1].classList.replace("list", "listSelect");
        }
        input.value = sortArr[count - 1].station_nm;
    }
});
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