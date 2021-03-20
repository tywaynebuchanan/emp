

let html = document.getElementById('root');
html.innerHTML = `
<header>
        <h1>HRPLUS</h1>
        <nav>
            <ul class="nav__links">
                <li><a href="#">Businesses</a></li>
                <li><a href="#">Freelancers</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        <div class="nav__end">
            <a href="#" class="cta__login"><i class="fas fa-user"></i></a>
            <a href="#" class="cta__signup">Request a Demo</a>
        </div>
    </header>

    <section>
             <div class="hero">
                <div class="hero-container">
                    <div class="wrapper">
                        <h1>Welcome to HRPLUS</h1>
                        <p>Your Human Resource Management Tool</p>
                    </div>
                 </div>
            </div>
        </section>

    

     <div class="container">
       <div class="row">
           <div class="col-1">
                <table class="table-aside">
                    <tr>
                        <td><a href ="#"><i class="fas fa-user-plus"></i>Add Employee</a></td>
                    </tr>
                    <tr>
                        <td><a href ="#"><i class="fas fa-user-cog"></i>View Employee</a></td>
                    </tr>
                    <tr>
                        <td><a href ="#"><i class="fas fa-user-slash"></i>Delete Employee</a></td>
                        
                    </tr>
                    <tr>
                        <td><a href ="#"><i class="fas fa-house-user"></i>NHT Contributions</a></td>
                        
                    </tr>
                </table>
           </div>
           <div class="col-2">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <td></td>
                        <td>FirstName</td>
                        <td>LastName</td>
                        <td>Address</td>
                        <td>Start Date</td>
                        <td>YTD Days Worked</td>
                        <td>YTD Sick Days</td>
                        <td>YTD Vacation Days</td>
                    </tr>
                </thead>
                <tbody id="tbody">
    
                </tbody>
            </table>
           </div>
       </div>
        
   </div>

`
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






 