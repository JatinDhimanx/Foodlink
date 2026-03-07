const API="http://localhost:5000/api";

function saveToken(t){
localStorage.setItem("token",t);
}

function getToken(){
return localStorage.getItem("token");
}