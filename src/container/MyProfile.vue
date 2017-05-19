<template lang="html">
  <div>

    <div class="columns is-multiline"> <!-- main div -->

      <div class="column is-one-quarter is-mobile">
        <div class="card" id="card-profile">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="../../images/daiict.jpg" alt="Image" style="width: 200px; height: 200px; padding-left: 50px; padding-top: 50px; ">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4" style="font-size: 20px;" align="center">Navin Chattopadhyay</p>
              </div>
            </div>
            <div class="content">
              <p style="font-size: 12px;" align="center">
                2018 Passout Batch | 3AX12ED042087<br>
                4th Semester, M.Tech. <br>
                Department of Computer Science <br>
                <br>
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
      </div>

      <div class="column">
        <div class="box">
          <div class="tabs" id="tabs-myprofile" style="margin-top: 0px;margin-bottom: 10px;">
            <ul>
              <li><router-link :to="{name:'About'}">About</router-link></li>
              <li><router-link :to="{ name: 'Academic' }">Academic Details</router-link></li>
              <li><a href="resume.php">Resume</a></li>
            </ul>
          </div>


                  <router-view></router-view>


        </div>
      </div>

    </div> <!-- main div -->


  </div>
</template>

<script>
export default {}
</script>

<style lang="css">
html, body {
  height: 100%;
  /*background: #fafcfd;*/
  background: #f5f5f5
}

#tabs-myprofile{
  margin-top: 0px;
  margin-bottom: 10px;
}

.feild-label{
      margin-right: 0px;
}

#card-profile{
  width: 240px;
  height: 650px;
  margin-left: 110px;
  margin-top: 15px;
}

.box{
  margin-left: 25px;
  border-top-width: 30px;
  margin-top: 15px;
  width: 88%;
  height: 100%;
}
</style>
