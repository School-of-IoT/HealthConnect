var dev_col=1;



function myFunction() {
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