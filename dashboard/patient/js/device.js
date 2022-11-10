var dev_col=1;

function disable_rest(){
  if ($("input[value='all']")[0].checked){
    $("input[value='temp']").attr("disabled", true);
    $("input[value='sbp']").attr("disabled", true);
    $("input[value='dbp']").attr("disabled", true);
    $("input[value='spo2']").attr("disabled", true);
    $("input[value='fio2']").attr("disabled", true);
  }
  else{
      $("input[value='temp']").removeAttr("disabled");
      $("input[value='sbp']").removeAttr("disabled");
      $("input[value='dbp']").removeAttr("disabled");
      $("input[value='spo2']").removeAttr("disabled");
      $("input[value='fio2']").removeAttr("disabled");
    
  }
}

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

function insert_node(ID, val, node){
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


//add_node(22110103, "sbp,db,resp,hr,spO2,fiO2,temp", "Central");


function create_node(){

  let dev_t= $("#dev-category option:selected").text();
  let hw_t= $("#hw-category option:selected").text();
  let arr = [];
  $.each($("input[name='comp']:checked"), function(){
      arr.push($(this).val());
  });
  let comps = arr.join(", ");

  console.log(dev_t);
  console.log(hw_t);
  console.log(comps);
  let date = new Date();
  let dev_id=date.getMonth()+""+date.getDate()+""+date.getHours()+""+date.getMilliseconds();
 

  let dev_tkn = $('.key-setting .key-value').text();

  if(dev_tkn == ''){
    alert('Create a Secret key first');
  }
  else{
    

    let url = "https://healthconnect-server.onrender.com/node/create?user="+sessionStorage.getItem('user')+"&token="+dev_tkn;
    
    let formData = 
        {
          "nodeData":{
            "devices":{
              "node":	"node-"+dev_id,
              "type":  dev_t,
              "attribute": comps,
              "lastUp": date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()          
            }
          }
        };


    $.ajax({
      type: "POST",
      url: url,
      data : JSON.stringify(formData),
      crossDomain: true,
      dataType: "json",
      encode: true,
      headers: {
        "Content-Type": "application/json"
      },
      processData: false,
    }).done(function (data) {
      insert_node(dev_id, comps, dev_t);
    }).fail(function (data) {
      console.log("update failed");
      
    });

  }

  
  
}
