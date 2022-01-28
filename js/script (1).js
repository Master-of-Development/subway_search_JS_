const autocomplete = document.querySelector(".autocomplete > ul");
const result = document.getElementsByClassName("result")[0];
const input = document.querySelector("input");
const stationData = stationList; // 역정보
const stationTimeData = timeList; // 시간표
const btn = document.querySelector("button");
let liTag = document.querySelectorAll(".autocomplete li");

/*
정규표현식
forEach
초성, 중성, 종성
*/

// 한글 초성 추출
function korAlphabet(str) {
    const cho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    let temp = "";
    for(let i = 0; i < str.length; i++) {
        code = str.charCodeAt(i)-44032;
        if(code > -1 && code < 11172) {
            temp += cho[Math.floor(code/588)];
        }
    }
    return temp;
}
// 역정보 데이터 한글 초성 추출
function stationArr() {
    let stationArr = [];
    for (let i = 0; i < stationData.data.length; i++) {
        stationArr.push(korAlphabet(stationData.data[i].station_nm));
    }
    return stationArr;
};
stationArr();

function auto() {
    let search = input.value;
    console.log(search);
    // input값 한글 초성 추출
    function inputArr() {
        let inputStr = "";
        for (let i = 0; i < search.length; i++) {
            inputStr = korAlphabet(search);
        }
        return inputStr;
    }

    // input값과 역정보 데이터 비교 후 출력
    for (let i = 0; i < stationData.data.length; i++) {
        const newList = document.createElement("li");
        let liTag = document.querySelectorAll(".autocomplete li");
        // inputArr().indexOf(stationArr()[i]) && inputArr() == stationArr()[i]
        // search == stationData.data[i].station_nm
        if (inputArr().indexOf(stationArr()[i]) && inputArr() == stationArr()[i]) {
            switch(stationData.data[i].line_num) {
                case "k":
                    newList.innerText = `${stationData.data[i].station_nm}역 공항철도`;
                    break;
                case "b":
                    newList.innerText = `${stationData.data[i].station_nm}역 분당선`;
                    break;
                case "a":
                    newList.innerText = `${stationData.data[i].station_nm}역 공항철도`;
                    break;
                case "g":
                    newList.innerText = `${stationData.data[i].station_nm}역 경춘선`;
                    break;
                case "s":
                    newList.innerText = `${stationData.data[i].station_nm}역 신분당선`;
                    break;
                case "su":
                    newList.innerText = `${stationData.data[i].station_nm}역 수인선`;
                    break;
                case "i":
                    newList.innerText = `${stationData.data[i].station_nm}역 인천 1호선`;
                    break;
                case "e":
                    newList.innerText = `${stationData.data[i].station_nm}역 용인경전철`;
                    break;
                case "u":
                    newList.innerText = `${stationData.data[i].station_nm}역 의정부경전철`;
                    break;
                default:
                    newList.innerText = `${stationData.data[i].station_nm}역 ${stationData.data[i].line_num}호선`
            }
            for (let j = 0; j < liTag.length; j++) {
                if (liTag[j] == newList) {
                    break;
                }else {
                    autocomplete.appendChild(newList);
                }
            }
        }
        else {
            for (let j = 0; j < liTag.length; j++) {
                if (liTag[j] != search) {
                    liTag[j].parentNode.removeChild(liTag[j]);
                }
            }
        }
    }
}

// function auto() {
//     const newList = document.createElement("li");
//     let liTag = document.querySelectorAll(".autocomplete li");
//     for (let i = 0; i < stationData.data.length; i++) {
//         if (input == stationData.data[i].station_nm) {
//             newList.innerText = `${stationData.data[i].station_nm}역 ${stationData.data[i].line_num}호선`;
//             autocomplete.appendChild(newList);
//         } else {
//             for (let j = 0; j < liTag.length; j++) {
//                 if (liTag[j] != input) {
//                     liTag[j].parentNode.removeChild(liTag[j]);
//                 }
//             }
//         }
//     }
// }

function info() {
    while(document.querySelector(".result > div")) {
        result.removeChild(document.querySelector(".result > div"));
    }
    for (let i = 0; i < stationData.data.length; i++) {
        if (search == stationData.data[i].station_nm) {
            let searchResult = `
                ${stationData.data[i].station_nm}역, ${stationData.data[i].line_num}호선<br>
                첫차${stationTimeData.data[i].first_time}/막차${stationTimeData.data[i].last_time}<br> 
            `;
            const divTag = document.createElement("div");
            divTag.innerHTML = searchResult;
            result.appendChild(divTag);
        }
    }
}
input.addEventListener("keyup", auto);
input.addEventListener("submit", info);
btn.addEventListener("click", info);
input.value = "";
input.focus();