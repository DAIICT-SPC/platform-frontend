<template lang="html">
  <div class="container">

    <!-- is-narrow-mobile -->
<div class="columns" id="columns-my-profile"> <!-- main div -->

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
      <div class="content" id="content-extras">
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
          <li><router-link :to="{name:'about'}">About</router-link></li>
          <li><router-link :to="{ name: 'academic' }">Academic Details</router-link></li>
          <li><router-link :to="{ name: 'resume' }">Resume</router-link></li>
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

#content-extras{
  padding-top: 15px;
}

#col-1{
  margin-top: 12px;
  width: 240px;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0px 4px 5px #d0cfcf;
  background-color: white;
}

#box-image{
  height: 18%;
  width: 80%;
  margin-left: 20px;
  box-shadow: none;
  margin-bottom: 0px;
}

#col-2-tab{
  margin-left: 25px;
  border-top-width: 30px;
  /*margin-top: 4px;*/
  /*width: 877px;*/
  /*height: 100%;*/
  border-radius: 4px;
  box-shadow: 0px 4px 5px #d0cfcf;
}
</style>
