

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
  let dev_col= $("#dev-filter option:selected").val();
  //let dev_col=2; //coulumn for device ID
  let input, filter, table, tr, td, i, txtValue;
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

function insert_node(up, ID, val, node){
  let x=document.getElementById('dev-table-body').insertRow(0);
  x.id="node-"+ID;
  c=0;
  x.insertCell(c).innerHTML='<span class="dev-table-btn-del" onClick="delete_node('+ID+');">🧺</span>'
  x.insertCell(c).innerHTML='<button class="dev-table-btn-connect '+x.id+'" onClick="startLIVE('+ID+');">Connect</button>' + '<button class="dev-table-btn-disconnect '+x.id+'" onClick="stopLIVE('+ID+')"; style="display:none"; ">Disconnect</button>';
  status = 'device-offline '+x.id;
  x.insertCell(c).setAttribute('class', status);
  x.insertCell(c).innerHTML=val;
  x.insertCell(c).innerHTML=ID;
  x.insertCell(c).innerHTML=node;
  x.insertCell(c).innerHTML=up;  

  /* -----------------------  Diagnosis Activation SECTION  ----------------------- */

  let values = val.split(',');
            //console.log(values);
  for(i=0; i<values.length; i++){
    if(values[i] == 'dbp'){
        $('.dbp-g').show();
        $('.diag').hide();
    }
    if(values[i] == 'sbp'){
        $('.sbp-g').show();
        $('.diag').hide();
    }
    if(values[i] == 'resp'){
        $('.resp-g').show();
        $('.diag').hide();
    }
    if(values[i] == 'spo2'){
        $('.spo2-g').show();
        $('.diag').hide();
    }
    if(values[i] == 'temp'){
        $('.temp-g').show();
        $('.diag').hide();
    }
    if(values[i] == 'fio2'){
        $('.fio2-g').show();
        $('.diag').hide();
    }
  }  
  /* ----------------------------------------------------------------------------- */   
}


function create_node(){

  let dev_t= $("#dev-category option:selected").text();
  let hw_t= $("#hw-category option:selected").text();
  let arr = [];
  $.each($("input[name='comp']:checked"), function(){
      arr.push($(this).val());
  });
  let comps = "";
  if (arr[0] == 'all'){
    comps = "temp, sbp, dbp, spo2, fio2";
  }
  else{
    comps = arr.join(", ");
  }
  

  let date = new Date();
  let dev_id=date.getFullYear()-2000+""+date.getMonth()+""+date.getDate()+""+date.getHours()+""+date.getMilliseconds();

      let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
      let current_time = date.getHours()+":"+date.getMinutes();
      let date_time = current_date+" "+current_time;

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
              "lastUp": date_time         
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
      	
      insert_node(date_time, dev_id, comps, dev_t);
      close_key();
      $("#dev-table-body").each(function()
        {
            if($(this).children("tr").length == 0)
            {
              $('.no-device').show();
              $('.dev-list').hide();
              
            }
            else{
              $('.no-device').hide();
              $('.dev-list').show();
            }
        });
        
    }).fail(function (data) {
      console.log("update failed");
      
    });

  } 
}

function delete_node(nd){
  let UID = "node-"+nd;

  let dev_tkn = $('.key-setting .key-value').text();

  if(dev_tkn == ''){
    alert('Create a Secret key first');
  }
  else{

    let url = "https://healthconnect-server.onrender.com/node/delete?user="+sessionStorage.getItem('user')+"&token="+dev_tkn+"&node="+UID;
  
  $.ajax({
    type: "DELETE",
    url: url,
    crossDomain: true,
    dataType: "json",
    encode: true,
    headers: {
      "Content-Type": "application/json"
    },
    processData: false,
  }).done(function (data) {
    let row = "#"+UID;
    $(row).remove(); 

    $("#dev-table-body").each(function()
        {
            if($(this).children("tr").length == 0)
            {
              $('.no-device').show();
              $('.dev-list').hide();
              
            }
            else{
              $('.no-device').hide();
              $('.dev-list').show();
            }
        });
    
  }).fail(function (data) {
    console.log("update failed");
    
  });

  }
  
}

$("#dev-table-body").each(function()
    {
        if($(this).children("tr").length == 0)
        {
          $('.no-device').show();
          $('.dev-list').hide();
          
        }
        else{
          $('.no-device').hide();
          $('.dev-list').show();
        }
    });
