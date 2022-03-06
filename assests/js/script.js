let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else
    sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

function view() { 
	document.getElementById('a').setAttribute('style', 'display:block'); 
} 

 
 var scriptUploaded = false;
 var myLandbot;function openLandbot() {

     if (scriptUploaded) {

         myLandbot.open()

     }

     else {

         var script = document.createElement("script");
         script.type = "text/javascript";
         script.setAttribute("SameSite", "None; Secure");
         script.onload = triggerLandbot()
         script.src = "https://static.landbot.io/landbot-3/landbot-3.0.0.js"; document.head.appendChild(script);

     }
 }function triggerLandbot() {

     setTimeout(function () {
         var script = document.createElement("script");script.innerHTML = `myLandbot = new Landbot.Popup({
configUrl: 'https://chats.landbot.io/v3/XXXXXXXXXXXXXXXXX/index.json',});`;
         document.body.appendChild(script);
         scriptUploaded = true;
         myLandbot.onLoad(function () {
             myLandbot.open()
         })
     }, 3000)

 }