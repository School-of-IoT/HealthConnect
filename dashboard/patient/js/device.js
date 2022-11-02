var dev_col=1;



function node_search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementsByClassName("s-inpt")[0].value;
  filter = input.toUpperCase();
  table = document.getElementById("dev-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[dev_col];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function add_node(ID, val, node){
  let date = new Date();
	let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	let current_time = date.getHours()+":"+date.getMinutes();
	let date_time = current_date+" "+current_time;	
  let x=document.getElementById('dev-table').insertRow(1);
  x.id="node-"+ID;
  c=0;
  x.insertCell(c).innerHTML='<button class="dev-table-btn" onClick="startConnect('+ID+');">Connect</button>';
  status = 'device-offline '+x.id;
  x.insertCell(c).setAttribute('class', status);
  x.insertCell(c).innerHTML=val;
  x.insertCell(c).innerHTML=ID;
  x.insertCell(c).innerHTML=node;
  x.insertCell(c).innerHTML=date_time;
  
}


//add_node(22110103, "sbp,db,resp,hr,spO2,fiO2,temp", "Central", 9);