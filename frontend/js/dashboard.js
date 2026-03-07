async function addFood(){

let foodType=document.getElementById("foodType").value;
let quantity=document.getElementById("quantity").value;

await fetch(API+"/food",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+getToken()
},

body:JSON.stringify({
foodType,
quantity
})

});

alert("Food Added");

}

async function loadFood(){

let res=await fetch(API+"/food/available");

let data=await res.json();

let div=document.getElementById("foodList");

data.forEach(f=>{

div.innerHTML+=`
<div>
${f.foodType} - ${f.quantity}
<button onclick="requestPickup('${f._id}')">Request</button>
</div>
`;

});

}

async function requestPickup(id){

await fetch(API+"/pickups/request",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+getToken()
},

body:JSON.stringify({foodListingId:id})

});

alert("Pickup Requested");

}

async function loadDeliveries(){

let res=await fetch(API+"/pickups/pending");

let data=await res.json();

let div=document.getElementById("deliveries");

data.forEach(d=>{

div.innerHTML+=`
<div>
Pickup: ${d.foodListingId}
<button onclick="acceptDelivery('${d._id}')">Accept</button>
</div>
`;

});

}

async function acceptDelivery(id){

await fetch(API+"/deliveries/accept",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+getToken()
},

body:JSON.stringify({pickupId:id})

});

alert("Delivery accepted");

}