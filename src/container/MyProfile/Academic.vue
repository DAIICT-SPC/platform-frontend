<template lang="html">
    <div>


        <div class="columns"> <!-- cols -->
            <!-- col 1 -->
            <div class="column is-half" id="col1academic">
                <p class="info1">
                    Information Technology <br>
                    M.Tech, Information Technology, <br>
                    Department of computer science <br>
                    3AX12ED042087 | 2018 Passout Batch <br>
                    May 2012 - Mar 2016
                    <br>
                </p>
            </div> <!-- col 1 ends -->
            <!-- col 2 -->
            <div class="column" id="col2academic">
                <p class="marks" style="width: 50px; padding-left: 5px;">
                    7.1 <br>
                    CGPA
                </p>
            </div> <!-- col 2 ends -->
            <!-- col 3 -->
            <div class="column" id="col3academic">
                <p class="marks2" style="width: 50px; padding-left: 5px;">
                    71 % <br>
                    Score
                </p>
            </div> <!-- col 3 ends -->
        </div> <!-- cols ends -->

        <!-- <hr id="hracademic"> -->


        <div style="overflow-x: auto;">  <!-- table starts -->
            <table class="table" id="tableacademic">
                <thead>
                    <tr>
                        <th colspan="2" id="tableth">Semester Wise Score</th>
                    </tr>
                    <tr>
                        <th>Semester</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>8.0</th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>6.1</th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>8.3</th>
                    </tr>
                </tbody>
            </table>
        </div> <!-- table ends -->


        <!-- previous ed -->
        <div id="prevedacademic">
            <div>
                <h2>Previous Education</h2>
                <div class="columns">
                    <!-- col 1 -->
                    <div class="column is-one-third">
                        <p>
                            <b>St. Xavier's High School</b> <br>
                            Karnataka Board <br>
                            <small>Senior Secondary Certificate</small> <br>
                            2010-2011
                        </p>
                    </div>
                    <div class="column"></div> <!-- col 2 -->
                    <div class="column"> <!-- col 3 -->
                        <p style="">
                            72.88%  <br>
                            Score
                        </p>
                    </div>
                </div>

                <div class="columns">
                    <!-- col 1 -->
                    <div class="column is-one-third">
                        <p>
                            <b>Vagdevi High School</b> <br>
                            Karnataka Board <br>
                            <small>High School Certificate</small> <br>
                            2008-2009
                        </p>
                    </div>
                    <div class="column"></div> <!-- col 2 -->
                    <div class="column"> <!-- col 3 -->
                        <p>
                            95.04%  <br>
                            Score
                        </p>
                    </div>
                </div>

            </div>
        </div>




    </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
#col1academic, #col2academic, #col3academic{
    margin-left: 15px;
    margin-top: 15px;
}

#hracademic{
    margin-bottom: 10px; margin-top: 0px; margin-right: 100px; margin-left: 20px; width: 720px;
}

#result{
    background-color: #f5f5f5;margin-left: 50px; width: 700px;
}
#tableacademic{
    width: 720px; margin-left: 20px;background-color: #f5f5f5;

}
#tableth{
    padding-left: 250px;

}
#prevedacademic{
    margin-left: 20px;
    margin-top: 10px;
}
</style>
