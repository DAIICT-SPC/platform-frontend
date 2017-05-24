<template lang="html">
  <div>

    <div class="card" id="info-card1">
      <header class="card-header">
        <p class="card-header-title">
          Information Technology
        </p>
        <span id="date">May 2012 - Mar 2016</span>
      </header>
      <div class="card-content">
        <div class="content">
          M.Tech, Information Technology, <br>
          Department of computer science <br>
          3AX12ED042087 | 2018 Passout Batch <br>
        </div>
      </div>
      <footer class="card-footer">
        <span class="card-footer-item">7.1 CGPA</span>
        <span class="card-footer-item">71% Score</span>
      </footer>
    </div>

    <div class="card" id="info-card2">
      <header class="card-header">
        <p class="card-header-title">
          Semester Wise Score
        </p>
      </header>
      <footer class="card-footer">
        <span class="card-footer-item">Sem-1 &nbsp; 7.10</span>
        <span class="card-footer-item">Sem-2 &nbsp; 6.1</span>
        <span class="card-footer-item">Sem-3 &nbsp; 7.10</span>
      </footer>
    </div>

    <div class="card" id="info-card3">
      <header class="card-header">
        <p class="card-header-title">
          St. Xavier's High School
        </p>
        <span id="date">2010 - 2011</span>
      </header>
      <div class="card-content">
        <div class="content">
          Karnataka Board <br>
          Senior Secondary Certificate
        </div>
      </div>
      <footer class="card-footer">
        <span class="card-footer-item">72.88% Score</span>
      </footer>
    </div>

    <div class="card" id="info-card4">
      <header class="card-header">
        <p class="card-header-title">
          Vagdevi High School
        </p>
        <span id="date">2008 - 2009</span>
      </header>
      <div class="card-content">
        <div class="content">
          Karnataka Board <br>
          High School Certificate
        </div>
      </div>
      <footer class="card-footer">
        <span class="card-footer-item">95.04% Score</span>
      </footer>
    </div>

  </div>
</template>

<script>
export default {
  name: 'academic'
}
</script>

<style lang="css">
#info-card1{
  margin-top: 0px;
  border-radius: 4px;
  /*box-shadow: 0px 4px 5px #d0cfcf;*/
  width: 98%;
  margin-left: 10px;
}

#info-card2{
  margin-top: 30px;
  border-radius: 4px;
  /*box-shadow: 0px 4px 5px #d0cfcf;*/
  width: 98%;
  margin-left: 10px;
}

#info-card3{
  margin-top: 30px;
  border-radius: 4px;
  /*box-shadow: 0px 4px 5px #d0cfcf;*/
  width: 98%;
  margin-left: 10px;
}

#info-card4{
  margin-top: 30px;
  border-radius: 4px;
  /*box-shadow: 0px 4px 5px #d0cfcf;*/
  width: 98%;
  margin-left: 10px;
}

#card{
  width: 220px;
  margin-top: 20px;
  height: 600px;
  border-radius: 4px;
  box-shadow: 0px 4px 5px #d0cfcf;
}


#box{
  margin-top: 22px;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  border-radius: 4px;
  box-shadow: 0px 4px 5px #d0cfcf;
  padding: 0px 0px 0px 0px;
}

#col1{
  width: 224px;
}

#image{
  width: 200px;
  height: 200px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

#name{
  font-size: 20px;
  margin-top: 20px;
}

#info{
  width: 424px;
  margin-left: 25px;
}

#marks1{
  width: 174px;
  margin-left: 30px;
  height: 74px;
}

#marks2{
  width: 174px;
  margin-left: 30px;
  height: 74px;
}

#score-box{
  width: 40%;
}

#date{
  padding-top: 10px;
  padding-right: 10px;
}
</style>
