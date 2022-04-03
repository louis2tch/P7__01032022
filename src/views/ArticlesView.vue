<template>
  <div class="gifts">
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
       <div class="chat"></div>
       <table class="table">
         <tr>
           <td><textarea></textarea></td>
           <td><button>OK</button></td>
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
.chat{margin:auto; width:600px; height:300px; background: #eee; 
  border:1px #999 solid;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 15px;
  }
textarea{width:550px;}

*{ box-sizing: border-box;}
</style>