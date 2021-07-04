document.querySelector(".button__container").addEventListener("click", () => {
  let text = document.getElementById("filter__jobs").value;
  getJobs().then((jobs) => {
    let filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
  });
});

function getJobs() {
  return fetch("data.json")
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function filterJobs(jobs, searchText) {
  if (searchText) {
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.roleName.includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.type.includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.company.includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText) ||
        job.requirements.content.includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredJobs;
  } else {
    return jobs;
  }
}
function showJobs(jobs) {
  console.log("Jobs in showJobs", jobs);
  let jobsContainer = document.querySelector(".jobs__container");
  let jobsHTML = "";
  jobs.forEach((job) => {
    jobsHTML += `
    <div class="job__tile">
               <div class="top">
                   <img src="${job.logo}"/>
                   <span class="material-icons more_horiz">more_horiz</span>
               </div>
               <div class="rolename">
                   <span>${job.roleName}</span>
               </div>
               <div class="description">
                   <span>${job.requirements.content}</span>
               </div>
               <div class="buttons">
                   <div class="button apply-now">
                    Apply Now
                   </div>
                   <div class="button">
                    Message
                   </div>
               </div>
            </div>`;
  });
  jobsContainer.innerHTML = jobsHTML;
}

getJobs().then((data) => {
  showJobs(data);
});
