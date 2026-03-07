async function login(){

let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

let res=await fetch(API+"/auth/login",{

method:"POST",
headers:{ "Content-Type":"application/json" },

body:JSON.stringify({email,password})

});

let data=await res.json();

saveToken(data.token);

alert("Login success");

}

async function register(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;
let role=document.getElementById("role").value;

await fetch(API+"/auth/register",{

method:"POST",
headers:{ "Content-Type":"application/json" },

body:JSON.stringify({name,email,password,role})

});

alert("Registered");

}