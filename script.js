// All Jobs

const jobs = [
  {
    id: 1,
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000-$175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "notapplied",
  },
  {
    id: 2,
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000-$120,000",
    description:
      "Create stunning web experiences for high-profile clients.Must have portfolio and experience with modern web design trends.",
    status: "notapplied",
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000-$165,000",
    description:
      "Transform complex data into compelling visualizations. Required Skills: D3.js, React and strong analytical thinking.",
    status: "notapplied",
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000-$190,00",
    description:
      "Design and Maintain scalable backend systems using Python and AWS. Work with modern DevOps Practices and cloud infrastructure.",
    status: "notapplied",
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000-$150,00",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "notapplied",
  },
  {
    id: 6,
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000-$170,00",
    description:
      "Build Enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
    status: "notapplied",
  },
  {
    id: 7,
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000-$160,000",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Grab benefits and equity package included.",
    status: "notapplied",
  },
  {
    id: 8,
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000-$175,000",
    description:
      "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge products.",
    status: "notapplied",
  },
];

let currentTab = "All";

function showJobs() {
  const container = document.getElementById("job-container");
  container.innerHTML = "";

  const filtered = jobs.filter((j) =>
    currentTab === "All" ? true : j.status === currentTab,
  );

  const total = jobs.length;
  const filteredCount = filtered.length;

  document.getElementById("jobsCount").textContent =
    currentTab === "All"
      ? `${total} jobs`
      : `${filteredCount} out of ${total} jobs`;

  if (filtered.length === 0) {
    container.innerHTML = `
        <div class="text-center flex flex-col justify-center items-center py-10">
            <img src="./jobs.png">
            <h3 class="text-gray-600 font-bold">
                No jobs available in ${currentTab} tab.
            </h3>
            <p class="text-gray-400">Check back later.</p>
        </div>`;
    return;
  }

  filtered.forEach((job) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    let badgeColor = "bg-blue-300 border border-blue-400 text-blue-950";
    if (job.status === "Interview")
      badgeColor = "bg-green-300 border border-green-500 text-green-800";
    if (job.status === "Rejected")
      badgeColor = "bg-red-300 border border-red-500 text-red-800";

    card.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div>
                    <h2 class="font-bold text-blue-950">${job.companyName}</h2>
                    <p class="text-gray-500">${job.position}</p>
                </div>
                <button class="delete-btn w-8 h-8 rounded-full text-gray-600 hover:text-red-800 border border-gray-400 hover:border-red-800">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>

            <p class="text-gray-500 mb-2">${job.location} • ${job.type} • ${job.salary}</p>

            <p class="capitalize px-3 py-1 ${badgeColor} w-fit mb-2">
                ${job.status === "notapplied" ? "Not Applied" : job.status}
            </p>

            <p>${job.description}</p>

            <div class="flex gap-3 mt-3">
                <button class="interview-btn px-4 py-1 uppercase border border-green-600 rounded text-green-600">
                    Interview
                </button>
                <button class="rejected-btn px-4 py-1 uppercase border border-red-600 rounded text-red-600">
                    Rejected
                </button>
            </div>
        `;

    const interviewBtn = card.querySelector(".interview-btn");
    const rejectedBtn = card.querySelector(".rejected-btn");

    if (job.status === "Interview") {
      interviewBtn.disabled = true;
      interviewBtn.classList.add("opacity-50", "cursor-not-allowed"); // Click Disabled when Selecting a button
    }

    if (job.status === "Rejected") {
      rejectedBtn.disabled = true;
      rejectedBtn.classList.add("opacity-50", "cursor-not-allowed"); // Click Disabled when Selecting a button
    }

    interviewBtn.addEventListener("click", () => {
      if (job.status !== "Interview") {
        job.status = "Interview";
        updateCounts();
        showJobs();
      }
    });

    rejectedBtn.addEventListener("click", () => {
      if (job.status !== "Rejected") {
        job.status = "Rejected";
        updateCounts();
        showJobs();
      }
    });

    card.querySelector(".delete-btn").addEventListener("click", () => {
      const index = jobs.findIndex((j) => j.id === job.id);
      jobs.splice(index, 1);
      updateCounts();
      showJobs();
    });

    container.appendChild(card);
  });
}

// function updateCounts() {
//     document.getElementById("allc").textContent = jobs.length;
//     document.getElementById("interviewc").textContent = jobs.filter(
//         (j) => j.status === "Interview",
//     ).length;
//     document.getElementById("rejectedc").textContent = jobs.filter(
//         (j) => j.status === "Rejected",
//     ).length;
// }

function updateCounts() {
  let interviewCount = 0;
  let rejectedCount = 0;
  let availableCount = 0;

  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].status === "Interview") {
      interviewCount = interviewCount + 1;
    } else if (jobs[i].status === "Rejected") {
      rejectedCount = rejectedCount + 1;
    } else {
      availableCount = availableCount + 1;
    }
  }

  // document.getElementById("availablec").textContent = availableCount;

  document.getElementById("allc").textContent = jobs.length;
  document.getElementById("interviewc").textContent = interviewCount;
  document.getElementById("rejectedc").textContent = rejectedCount;
}

// Tabs Functionality
document.querySelectorAll(".tabs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentTab = btn.dataset.tab;
    document
      .querySelectorAll(".tabs button")
      .forEach((b) => b.classList.remove("bg-blue-700", "text-white"));
    btn.classList.add("bg-blue-700", "text-white");
    showJobs();
    // showJobs();
  });
});

updateCounts();
showJobs();

// let allCount = document.getElementByID("allc")
// jobs.status = "Interview"
// container.innerHTML += "<div>job</div>"
// document.getElementById("interviewc") = jobs.filter(...).length
// filtered = jobs.filter(j => j.status = "Interview")
// btn.addEventListener("click", showJobs())
