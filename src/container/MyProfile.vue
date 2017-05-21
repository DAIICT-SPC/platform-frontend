<template lang="html">
  <div class="container">

    <!-- is-narrow-mobile -->
    <div class="columns" id="columns-my-profile"> <!-- main div -->

      <!-- <div class="column is-one-quarter">
      <code>is-one-quarter</code>
    </div>
    <div class="column">
    Auto <span class="is-pulled-right tag is-success">Open</span>
  </div> -->

  <!-- is-hidden-mobile card is-narrow is-one-quarter-mobile -->
  <div class="column is-one-quarter" id="col-1">
    <div class="box" id="box-image">
      <figure class="image is-square">
        <img src="../../images/lotus.jpg" alt="Image">
      </figure>
    </div>
    <div class="card-content" id="card-content-my-profile">
      <div class="media">
        <div class="media-content">
          <p class="title is-4" align="center">Navin Chattopadhyay</p>
        </div>
      </div>
      <div class="content">
        <p style="font-size: 13px;" align="center">
          2018 Passout Batch 3AX12ED042087<br>
          4th Semester, M.Tech. <br>
          Department of Computer Science <br>
          <br>
          <p align="center" style="font-size: 20px;">7.10 <br>
            CGPA
          </p>
          <br>
          <p align="center" style="font-size: 20px;">0 <br>
            APPLICATIONS
          </p>
          <br>
          <p align="center" style="font-size: 20px;">0 <br>
            OFFERS
          </p>
        </p>
      </div>
    </div>
  </div>

  <div class="column is-auto">
    <div class="box" id="col-2-tab">
      <div class="tabs" id="tabs-myprofile">
        <ul>
          <li><router-link :to="{name:'About'}">About</router-link></li>
          <li><router-link :to="{ name: 'Academic' }">Academic Details</router-link></li>
          <li><a>Resume</a></li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>

</div> <!-- main div -->
</div>
</template>

<script>
export default {
  name: 'myprofile'
}
</script>

<style lang="css">
/*
.column{
background-color: red;
margin-left: 10px;
}

.column.is-one-quarter{
background-color: blue;
}*/

/*
#col-1{
width: 240px;
height: 100%;
border-radius: 4px;
box-shadow: 0px 4px 5px #d0cfcf;
}


#box-image{
height: 18%;
width: 80%;
margin-left: 20px;
box-shadow: none;
margin-bottom: 0px;
}


#col-2-tab{
/*margin-left: 25px;*/
/*border-top-width: 30px;*/
/*margin-top: 4px;*/
/*width: 877px;*/
/*height: 100%;*/
/*border-radius: 4px;*/
/*box-shadow: 0px 4px 5px #d0cfcf;
}*/

/*#columns-my-profile{
margin-top: 0px;
}

#card-content-my-profile{
padding-top: 5px;
}

#tabs-myprofile{
margin-top: 0px;
margin-bottom: 10px;
}

.feild-label{
margin-right: 0px;
}


#col-2-tab{
margin-left: 25px;
border-top-width: 30px;
margin-top: 4px;
width: 877px;
height: auto;
border-radius: 4px;
box-shadow: 0px 4px 5px #d0cfcf;
}

.tabs li a.is-active{
border-bottom: solid 2px #00d1b2;
}*/
</style>
