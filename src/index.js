
function dateDifference(start, end) {
    var s = new Date(+start);
    var e = new Date(+end);
 
  s.setHours(12,0,0,0);
  e.setHours(12,0,0,0);
  
   var totalDays = Math.round((e - s) / 8.64e7);
  
  var wholeWeeks = totalDays / 7 | 0;
  
   var days = wholeWeeks * 5;

   if (totalDays % 7) {
    s.setDate(s.getDate() + wholeWeeks * 7);
    
    while (s < e) {
      s.setDate(s.getDate() + 1);
      
      if (s.getDay() != 0 && s.getDay() != 6) {
        ++days;
      }
    }
  }
  return days;
}

const getData = async() =>{
  const dataApi = await fetch('data.json')
  if(dataApi.ok){
    const res = await dataApi.json();
    res.forEach(data =>{
    let newDate = new Date(data.startdate);
    let newdate1 = new Date();
    let numday = dateDifference(newDate,newdate1);
     let sickday = Math.floor(numday / 22);
     let vacday = Math.floor(numday / 22);
  
    const tbody = document.getElementById('tbody');
    const div = document.createElement('tr');
  
    div.innerHTML = `
    <td>${data.usericon}</td>
    <td>${data.firstname}</td>
    <td>${data.lastname}</td>
    <td>${data.address}</td>
    <td>${data.startdate}</td>
    <td><span class = "color-1">${numday}</span></td>
    <td><span class = "color-2">${sickday}</span></td>
    <td><span class = "color-3">${vacday}</span></td>
    `
    tbody.appendChild(div);
  })
  }else{
    const errDiv = document.createElement('div');
    errDiv.innerHTML = `${src.status}`
    tbody.appendChild(errDiv);
   
  }
  
}
getData();






 