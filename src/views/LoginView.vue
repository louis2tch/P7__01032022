<template>
  <div class="login">
    <h1>Se connecter</h1> <br><a href="/signup" v-if="existedUser().token ==''"><button> Créer un Compte</button></a>
    <button v-else @click="deconnectUser" >Se deconnecter</button>
    <br><a href="/signup"><button v-if="existedUser().role ==1" >Utilisateurs</button></a>
    <br><a href="/add-department"><button v-if="existedUser().role ==1" >Acces aux Departements</button></a>
    <table  v-if="existedUser().token ==''">
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
     zeroUser: '[{"id":"","id_dep":"","role":"","token":"", "first_name":"","last_name":""}]'
		}
	},
  methods: {
    deconnectUser() { 
     localStorage.setItem("oneUser",this.zeroUser);
      //localStorage.removeItem("oneUser");
      let a = localStorage.getItem("oneUser");
      //this.lanceUser();
      location.reload();
      a = JSON.parse(a);
      return a[0];
    },
    existedUser() {
      var a = localStorage.getItem("oneUser"); 
      if(a !=""){ //var a = this.lanceUser();
       a = JSON.parse(a);   
        //alert(a[0].role);
        return a[0]; 
      } else
      {
        return JSON.parse(this.zeroUser);
      }
      
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
        let d='';  let i = value.v;
        if(!value) d= value;
        else
          d +=`{"id":"${i.id}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
          "last_name":"${i.last_name}", "email":"${i.email}", "role":"${i.role}", "token":"${i.token}"}`;
        //d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`; 
        localStorage.setItem("oneUser",d); //alert(localStorage.getItem("oneUser"));
        location.reload();
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: UP USER "+err.message);
      });

    },
    lanceUser(){ 
      //alert(localStorage.getItem("oneUser"));
    if(localStorage.getItem("oneUser")!=this.zeroUser){ 
      let xid = JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;
      fetch(`http://localhost:3000/api/auth/${xid}`, {
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
}
</script>

