const autocomplete = document.querySelector(".autocomplete > ul");
const result = document.getElementsByClassName("result");
const input = document.querySelector("input");

input.addEventListener("keyup", () => {
    const stationData = stationList;
    const search = input.value;
    console.log(search);

    for(let i = 0; i < stationData.data.length; i++) {
        let station_nm = stationData.data[i].station_nm;
        if(station_nm.indexOf(search) != -1) { // 역정보 비교 인덱스 반환
            alert("성공");
            const newList = document.createElement("li");
            newList.innerText =`
            ${stationData.data[i].station_nm}역 ${stationData.data[i].line_num}호선
            `;
            autocomplete.appendChild(newList);
        } else {
            alert("실패"); 
            let liTag = document.querySelectorAll(".autocomplete li");
            for(let j = 0; j < liTag.length; j++) {
                liTag[j].parentNode.removeChild(liTag[j]);
            }
        }
    }
});