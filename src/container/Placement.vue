<template>
  <div class="placement-page">
    <div class="container box">

      <div class="job-header job-section">
        <div class="heading-main">
          <p class="title is-3 job-title">Software Developer</p>
          <p class="subtitle is-6 company-details">DLF India Pvt. Ltd. Noida, India</p>
        </div>
        <div class="header-action is-pulled-right">
          <span class="tag">Full Time</span>
        </div>
      </div>

      <div class="job-description job-section">
        <b class="section-header">Job Description</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        <div class="eligibility-criteria job-section">
          <b class="section-header">Eligibility Criteria</b>
          <div class="columns">
            <div class="column">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title"> B.Tech </p>
                </header>
                <footer class="stripe-footer">
                  <div class="columns is-gapless is-mobile">
                    <div class="column">Current <br> 7.01</div>
                    <div class="column">Higher <br> 7.01</div>
                    <div class="column">Secondary <br> 7.01</div>
                  </div>
                </footer>
              </div>
            </div>
            <div class="column">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title"> MScIT </p>
                </header>
                <footer class="stripe-footer">
                  <div class="columns is-mobile is-gapless">
                    <div class="column">Current <br> 7.01</div>
                    <div class="column">Bachelors <br> 7.01</div>
                    <div class="column">Higher <br> 7.01</div>
                    <div class="column">Secondary <br> 7.01</div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>

        <div class="hiring-process job-section">
          <b class="section-header">Hiring Process</b>

          <div class="processes">

            <div class="process-application process">
              <a class="button">
                <span class="icon">
                  <i class="fa fa-user-o"></i>
                </span>
                <span>Application</span>
              </a>
            </div>

            <div class="box process">
              <p>Group Discussion</p>
              <a>View Info</a>
            </div>

            <div class="box process">
              <p>Technical Interview</p>
              <a>View Info</a>
            </div>

            <div class="box process">
              <p>HR Interview</p>
              <a>View Info</a>
            </div>

            <div class="process-offer process">
              <a class="button">
                <span class="icon">
                  <i class="fa fa-file-text-o"></i>
                </span>
                <span>Offer</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'placement'
  }
  </script>

  <style lang="scss">
  .placement-page {
    padding: 0.5rem 1.5rem;

    .container.box {
      border-radius: 4px;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
      padding: 0;
    }

    .job-section {
      border-bottom: solid 1px #ddd;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;

      .section-header {
        display: block;
        margin-bottom: 1rem;
      }
    }

    .job-header {
      padding: 2.5rem;
      background: #3273dc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px 4px 0 0;
      box-shadow: inset 0px -8px 16px rgba(0, 0, 0, 0.2);

      .title {
        margin-bottom: 0;
        color: #fff;
      }

      .subtitle {
        color: #1d4586;
        font-weight: bold;
        margin-top: 0.5rem;
      }
    }

    .job-description {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .eligibility-criteria {
      padding-left: 1.5rem;
      padding-right: 1.5rem;

      .stripe-footer {
        .column {
          padding: 1rem;
          text-align: center;
        }
      }
    }

    .hiring-process {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .processes {
      max-width: 400px;
      width: 100%;
      margin: auto;
      text-align: center;
      position: relative;
      &::after{
        position: absolute;
        content: '';
        height: 100%;
        width: 2px;
        background: #ddd;
        top: 0;
        left: 50%;
        margin-left: -1px;
        z-index: 2;
      }
      .box {
        text-align: center;
      }
      .button {
        pointer-events: none;
        .icon {
          margin-right: 0.5rem;
          .fa {
            font-size: 1rem;
          }
        }
      }

      .process {
        position: relative;
        margin: 2rem 0;
        z-index: 5;
        &:first-child:before{
          display: none;
        }
        &:last-child{
          padding-top: 0.3rem;
        }
        &:before {
          left: 47.5%;
          top: -11%;
          position: absolute;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #ddd;
          content: ' ';
        }
      }
    }
  }
  </style>
