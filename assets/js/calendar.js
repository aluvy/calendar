function checkLeapYear(year){
    if(year % 400 == 0){
        return true;
    } else if (year % 100 == 0 ){
        return false;
    } else if(year % 4 == 0){
        return true;
    } else {
        return false;
    }
}

function getFirstDayOfWeek(year, month){
    if(month < 10) month = "0" + month;
    return (new Date(year+"-"+month+"-01")).getDay();
}

function changeYearMonth(year, month){
    let month_day = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month == 2){
        if(checkLeapYear(year)) month_day[1] = 29;
    }

    let first_day_of_week = getFirstDayOfWeek(year, month); // 일요일:0, 월요일:1
    let arr_calendar = [];

    for(let i=0; i<first_day_of_week; i++){
        arr_calendar.push('');
    }

    for(let i=1; i<=month_day[month-1]; i++){
        arr_calendar.push(String(i));
    }

    let remain_day = 7 - (arr_calendar.length % 7);
    if(remain_day < 7){
        for(let i=0; i<remain_day; i++){
            arr_calendar.push('');
        }
    }

    renderCalendar(arr_calendar);
}

function renderCalendar(data){
    let h = [];
    for (let i=0; i<data.length; i++){
        if(i==0){
            h.push(`<tr>`);
        } else if(i % 7 == 0) {
            h.push(`</tr>`);
            h.push(`<tr>`);
        }

        if(data[i] != ""){
            h.push(`<td><button type="button" value="${data[i]}" onclick="setDate(${data[i]})">${data[i]}</button></td>`);
        } else {
            h.push(`<td>${data[i]}</td>`);
        }
        
    }
    h.push(`</tr>`);

    document.querySelector("#tb_body").innerHTML = h.join('');
}

function changeMonth(diff){
    if(diff == undefined){
        current_month = parseInt(document.querySelector("#month").value);
    } else {
        current_month = current_month + diff;
        if(current_month == 0){
            current_year = current_year - 1;
            current_month = 12;
        } else if (current_month == 13){
            current_year = current_year + 1;
            current_month = 1;
        }
    }

    console.log(current_year, current_month);
   
    loadCalendar(current_year, current_month);
}

function loadCalendar(year, month){
    document.querySelector("#year").value = year;
    document.querySelector(`#month option[value='${month}']`).selected = true;
    changeYearMonth(year, month);
}

function setDate(day){
    if(day<10) day = "0" + day;
    document.querySelector("#input_date").value = `${current_year}-${current_month}-${day}`;
    document.querySelector("#div_calendar").style.display = "none";
}

let current_year = (new Date()).getFullYear();
let current_month = (new Date()).getMonth() + 1;

window.addEventListener("load", function(){

    document.querySelector("#year").value = current_year;
    document.querySelector(`#month option[value='${current_month}']`).selected = true;
    changeYearMonth(current_year, current_month);

    document.querySelector("#input_date_btn").addEventListener("click", function(){
        document.querySelector("#div_calendar").style.display = "block";
    })

    document.addEventListener("click", function(e){
        let target = e.target;
        while ( target ){
            if(target == document.querySelector("#div_calendar")){
                console.log( 'div_calendar', target != document.querySelector("#div_calendar") );
                break;
            } else if( target == document.querySelector("#input_date") || target == document.querySelector("#input_date_btn") ){
                break;
            } else if(target.parentNode == document){
                console.log(target.parentNode == document, document.querySelector("#div_calendar").style.display);
                if( document.querySelector("#div_calendar").style.display == "block"){
                    document.querySelector("#div_calendar").style.display = "none";
                }
                break;
            }
            target = target.parentNode;
        }
    })
})