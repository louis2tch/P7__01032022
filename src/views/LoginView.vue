<template>
  <div class="login">
    <h1>Se connecter</h1> <a href="/signup">/ Créer un Compte</a>
    <table>
      <tr>
        <td>Email:</td>
        <td><input type="email" id="email" placeholder="Email"></td>
      </tr>
      <tr>
        <td>Mot de passe:</td>
        <td><input type="password" id="password" ></td>
      </tr>
      <tr>
        <td></td>
        <td><button @click="loginUser" >Se connecter</button></td>
      </tr>
    </table>
    <div>
     <div class="user">
      User <br>
      if moderateur<br>
      - departements<br>
      - users {id[0,1]}<br><br>
      </div>
    </div>

  </div>
</template>
<style scoped lang="scss">
table {margin: auto; margin-top:40px;}
td {text-align: left; padding:3px;}
h1{display:inline;}
a{text-decoration: none;}
.user{padding: 20px; background: #eee; color: chocolate; opacity: 0.2;}
.dep {padding-bottom:15px;}
.delete {color: red;}
button {margin:5px 5px 5px 0; cursor: pointer;}
em {color:rgb(10, 6, 245); font-weight: 600;}
input {width:190px; height:20px;}
select{width:200px; height:28px;}
</style>


<script>

export default {
 /* name: 'HomeTemplate',
  props: {
    msg: String
  },*/

  data() {
		return {
     
		}
	},
  methods: {
    existedUser() {
    var a = this.lanceUser();
      a = JSON.parse(a);  
			return a;
		}, 
    loginUser(){
      let z = {user:{
                      email : document.getElementById("email").value,
                      password : document.getElementById("password").value
                     //first_name : document.getElementById("first_name").value,
                    }
              }; 
      fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
       }, 
       body: JSON.stringify(z)
      })
      .then(function(res) {
        if (res.ok) {
          return res.json(); 
        } 
      })
      .then(function (value) {
        console.info(value);
        let d=''; 
        if(!value) d= value;
        else
          d +=`{"id":"${value.v.id}", "email":"${value.v.email}", "first_name":"${value.v.first_name}", "token":"${value.v.token}"}`;
        
        //d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`; 
        localStorage.setItem("oneUser",d);
        location.reload();
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: UP USER "+err.message);
      });

    },
    lanceUser(){ alert(JSON.parse(localStorage.getItem("oneUser")).token); 
    let x = JSON.parse(localStorage.getItem("oneUser")).token;
     fetch("http://localhost:3000/api/auth/", {
        method: "GET",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }/*, 
       body: JSON.stringify(z)*/
      })
      .then(function(res) {
        if (res.ok) { 
          return res.json(); 
        } 
      })
      .then(function (value) {
        let d=''; 
        for(let i of value.v){
          d +=`{"id":"${i.id}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
          "last_name":"${i.last_name}", "email":"${i.email}"}, `;
        }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`; 
        localStorage.setItem("allUser",d);
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: ALL USERS"+err.message);
      });
      return localStorage.getItem("allUser");
    }
  }
}
</script>

