<template>
  <div class="gifts"  v-if="existedUser().token != ''">
    <h1>Partagez vos articles preferes</h1>
    <table>
     <!-- <tr>
        <td class="dep">Département:</td>
        <td class="dep">
          <select id="department">
            <option value="1">Commercial</option>
            <option value="2">Resources humaines</option>
            <option value="3">Information technonogy</option>
          </select>
        </td>
      </tr>-->
    </table>
    <div>
       <div id="chat">
         <div v-for="i in existedAllChat()" :key="i.id" class="chatAll">
            <span class="chatDataTime">
             {{ i.dateTime }} &nbsp; {{ i.hour }}:{{ i.minute }}:{{ i.second }}
            </span> @<span class="chatName">{{ i.first_name }} </span>
           <div class="chatComment">{{ i.comment }}
             <div>
               <i class="fa fa-thumbs-up"></i>&nbsp;&nbsp;<i class="fa fa-thumbs-down"></i>
              </div>
            </div>
         </div>
       </div>
       <table class="table" >
         <tr>
           <td><textarea id="comment"></textarea></td>
           <td><button id="inputChat" @click="inputChat">OK</button></td>
           </tr>
       </table>
       
        
         
        
    </div>
  </div>
</template>

<style scoped lang="scss">
table {margin: auto; margin-top:30px;}
.table {margin: auto; margin-top:3px;}
td {text-align: left;}
h1{display:inline;}
a{text-decoration: none;}
.dep {padding-bottom:15px;}
#chat{margin:auto; width:600px; height:300px; max-height:300px; background: #eee;
  overflow-y: scroll;
  border:1px #999 solid;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 25px;
  text-align: left;
  }
.chatDataTime{font-size: 12px; color:rgb(132, 0, 255);}
textarea{width:550px;}
.delete {color: red;}
button {margin:5px 5px 5px 0; cursor: pointer;}
.chatDataTime{font-size: 12px; color:rgb(132, 0, 255);}
i{color:#999; font-size: 14px; cursor: pointer;}
.chatComment{padding-left:20px; margin-bottom: 10px; color:#000; font-size:13px;}
.chatName{font-size:10px; font-weight:bold;}
.chatAll{font-size:10px;}            

*{ box-sizing: border-box;}
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
    existedAllChat() { 
    this.lanceChat();
    //var a = document.getElementById("tout1").innerHTML;
    //localStorage.removeItem("allDep"); 
    var a = localStorage.getItem("allChat"); 
    a = JSON.parse(a); 
			return a;

		},
    inputChat(){ 
      let comment = document.getElementById("comment").value;
      comment = comment.replace(/'/g,"&apos;");
      let id_user =  JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let z = {chat:{
                      comment : comment,
                      id_user : id_user
                    }
              }; 
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; 
      fetch(`http://localhost:3000/api/chat`, {
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
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
        let d=''; //let comment=""; 
          for(let i of value.v){
            let dateTime = new Date(i.times).toDateString();
            let hour = new Date(i.times).getHours();
            let minute = new Date(i.times).getMinutes();
            let second = new Date(i.times).getSeconds();

            i.comment = i.comment.replace("\n","<br/>");
                        
            d +=`{"id":"${i.id_chat}", "id_user":"${i.id_user}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
            "last_name":"${i.last_name}", "email":"${i.email}", 
            "times":"${i.times}", "dateTime":"${dateTime}", "hour":"${hour}", "minute":"${minute}", "second":"${second}", 
            "comment":"${i.comment}"}, `;
          }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`;  
        localStorage.setItem("allChat",d); alert(localStorage.getItem("allChat"));
        //document.getElementById("chat").innerHTML = comment;
        //document.getElementById("comment").value = ""; 
        document.getElementById("comment").value = "";
        
        location.reload();
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: ADD Comment "+err.message);
      });
      
    },
    lanceChat(){ 
      //alert(localStorage.getItem("oneUser"));
    if(localStorage.getItem("oneUser")!=this.zeroUser){ 
      //let xid = JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;
      fetch(`http://localhost:3000/api/chat/`, {
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
          let d=''; //let comment=""; 
          for(let i of value.v){
            let dateTime = new Date(i.times).toDateString();
            let hour = new Date(i.times).getHours();
            let minute = new Date(i.times).getMinutes();
            let second = new Date(i.times).getSeconds();

            i.comment = i.comment.replace("\n","<br/>");
                        
            d +=`{"id":"${i.id_chat}", "id_user":"${i.id_user}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
            "last_name":"${i.last_name}", "email":"${i.email}", 
            "times":"${i.times}", "dateTime":"${dateTime}", "hour":"${hour}", "minute":"${minute}", "second":"${second}", 
            "comment":"${i.comment}"}, `;
            
          }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`;  
        localStorage.setItem("allChat",d); //alert(localStorage.getItem("allChat"));
        //document.getElementById("chat").innerHTML = comment;
        //document.getElementById("comment").value = ""; 
        //return d; 
        //location.reload();
        })
        .catch(function(err) {
          alert("Une Erreur est survenue: ALL USERS"+err.message);
        });
        //return localStorage.getItem("allChat");
      }
    }
  }
}
</script>