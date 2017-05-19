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

        <hr id="hracademic">

        <!-- table starts -->
        <div class="result" style="background-color: #f5f5f5;margin-left: 50px; width: 700px;">
            <h2>Semester Wise Score</h2>
            <table class="table" style="width: 650px;margin-left: 50px;background-color: #f5f5f5;">
                <thead>
                    <tr>
                        <th>Semester</th>
                        <th>Score</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>8.0</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th>6.1</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th>8.3</th>
                        <th></th>
                    </tr>
                </tbody>
            </table>
        </div> <!-- table ends -->





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
</style>
