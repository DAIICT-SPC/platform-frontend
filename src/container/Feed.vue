<template lang="html">
  <div class="container" id="container-home">
    <!-- media content starts -->
    <div class="columns is-multiline">
      <div class="column is-full">
        <article class="media" id="med">
          <figure class="media-left" id="media-left-figure">
            <p class="image is-64x64">
              <img src="../../images/daiict.jpg">
            </p>
          </figure>
          <div class="media-content" >
            <div class="content">
              <div>
                <strong>Placement cycle 2016-2017</strong> <span class="is-pulled-right tag is-success">Open</span>
              </div>
              <small>4 days ago</small> <br>
              <p id="pcontent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor
                vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
              <div class="placement-courses">
                  <span class="tag is-info">Msc.IT</span>
                  <span class="tag is-info">B.Tech</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="column  is-full">
        <article class="media" id="med">
          <figure class="media-left" id="media-left-figure">
            <p class="image is-64x64">
              <img src="../../images/daiict.jpg">
            </p>
          </figure>
          <div class="media-content" >
            <div class="content">
              <div>
                <strong>Placement cycle 2016-2017</strong> <span class="is-pulled-right tag is-success">Open</span>
              </div>
              <small>4 days ago</small> <br>
              <p id="pcontent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor
                vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
              <div class="placement-courses">
                  <span class="tag is-info">Msc.IT</span>
                  <span class="tag is-info">B.Tech</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="column  is-full">
        <article class="media" id="med">
          <figure class="media-left" id="media-left-figure">
            <p class="image is-64x64">
              <img src="../../images/daiict.jpg">
            </p>
          </figure>

          <div class="media-content" >
            <div class="content">
              <div>
                <strong>Placement cycle 2016-2017</strong> <span class="is-pulled-right tag is-success">Open</span>
              </div>
              <small>4 days ago</small> <br>
              <p id="pcontent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor
                vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
              </p>
              <div class="placement-courses">
                  <span class="tag is-info">Msc.IT</span>
                  <span class="tag is-info">B.Tech</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <nav class="pagination is-centered">
      <a class="button pagination-previous ">Previous</a>
      <a class="button pagination-next ">Next</a>
    </nav>

  </div>
</template>

<script>
export default {
  name: 'feed'
}
</script>

<style lang="css">

.container{
  padding-left: 15px;
}

#pcontent{
  padding-top: 10px;
}

#media-left-figure {
  margin-left: 5px;
  margin-top: 5px;
}

#med {
  margin-top: 15px;
  background: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0px 4px 5px #d0cfcf;
  border: none;
  margin-right: 15px;
}

.pagination.is-centered{
  margin-top: 15px;
}
</style>
