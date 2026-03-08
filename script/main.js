let allissues = [];

const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const btns = document.querySelectorAll(".btn");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");

function updateCount(issues) {
  document.getElementById("issue-count").innerText = issues.length;
}

function removeActive() {
  btns.forEach((b) => b.classList.remove("active"));
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeActive();
    btn.classList.add("active");
  });
});

allBtn.addEventListener("click", () => {
  showAllCards(allissues);
  updateCount(allissues);
});
openBtn.addEventListener("click", () => {
  const openIssues = allissues.filter((card) => card.status === "open");
  showAllCards(openIssues);
  updateCount(openIssues);
});
closedBtn.addEventListener("click", () => {
  const openissues = allissues.filter((card) => card.status === "closed");
  showAllCards(openissues);
  updateCount(openissues);
});

function search() {
  Loader(true);
  const searchValue = searchInput.value;
  const matchedCards = allissues.filter((card) =>
    card.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  setTimeout(() => {
    showAllCards(matchedCards);
    updateCount(matchedCards);
    Loader(false);
  }, 300);
}
searchBtn.addEventListener("click", search);
searchBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});

async function fetchData() {
  Loader(true);
  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    allissues = data.data;
    showAllCards(allissues);
  } catch (error) {
    console.error("error fetching data", error);
  }
  Loader(false);
}

function showAllCards(cards) {
  const cardsSection = document.querySelector(".cards");
  cardsSection.innerHTML = "";
  cards.forEach((card) => {
    const labelColors = {
      bug: "bg-[#FEECEC] border-[#FECACA] text-[#EF4444]",
      "help wanted": "bg-[#FFF8DB] border-[#FDE68A] text-[#D97706]",
      "good first issue": "bg-[#b197fc30] border-[#b197fc70] text-[#b197fc]",
      enhancement: "bg-[#DEFCE8] border-[#BBF7D0] text-[#00A96E]",
      documentation: "bg-[#74C0FC30] border-[#74C0FC70] text-[#74C0FC]",
    };
    const borderTopClass =
      card.status == "open" ? "border-[#00A96E]" : "border-[#A855F7]";
    const cardSection = document.createElement("div");
    const labels = card.labels
      .map(
        (label) => `
      <div class="flex items-center gap-1 px-2 py-1 rounded-full ${labelColors[label]} border ">
        <img src="./assets/${label}.svg" alt="" />
        <p class="font-medium text-sm">${label.toUpperCase()}</p>
      </div>
    `,
      )
      .join("");
    cardSection.innerHTML = `
    <div onclick="loadCardDetails(${card.id})"
              class="card cursor-pointer drop-shadow-[0_5px_10px_rgba(0,0,0,0.08)] p-4 border-t-5 ${borderTopClass} rounded-t-lg bg-white"
            >
              <div class="flex items-center justify-between mb-3">
                 <img src="./assets/${card.status}-Status.png" alt="" />
                <div class="${card.priority.toUpperCase() == "HIGH" ? "text-[#EF4444] bg-[#FEECEC]" : card.priority.toUpperCase() == "MEDIUM" ? "text-[#D97706] bg-[#FFF6D1]" : "text-[#9CA3AF] bg-[#EEEFF2]"} rounded-full px-3 py-1.5 leading-none font-medium text-xs uppercase"
               
                >
                  ${card.priority}
                </div>
              </div>
              <h2 class="text-left text-sm font-semibold text-darkblue mb-2">
                ${card.title}
              </h2>
              <p class="text-left text-xs text-[#64748B] mb-3">
                ${card.description}
              </p>
              <div class="flex items-center flex-wrap justify-start gap-1 mb-4">
                ${labels}
              </div>
              <hr class="border-t border-neutral-300 mb-4" />
              <div class="text-sm text-[#64748B]">
                <p class="mb-2">#${card.id} by ${card.author}</p>
                <p>${new Date(card.createdAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}</p>
              </div>
            </div>
    `;
    cardsSection.append(cardSection);
  });
}

function Loader(status) {
  if (status === true) {
    document
      .querySelectorAll(".skeleton")
      .forEach((sk) => sk.classList.remove("hidden"));
  } else {
    document
      .querySelectorAll(".skeleton")
      .forEach((sk) => sk.classList.add("hidden"));
  }
}

async function loadCardDetails(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  showCardDetails(data.data);
}

function showCardDetails(card) {
  const labelColors = {
    bug: "bg-[#FEECEC] border-[#FECACA] text-[#EF4444]",
    "help wanted": "bg-[#FFF8DB] border-[#FDE68A] text-[#D97706]",
    "good first issue": "bg-[#b197fc30] border-[#b197fc70] text-[#b197fc]",
    enhancement: "bg-[#DEFCE8] border-[#BBF7D0] text-[#00A96E]",
    documentation: "bg-[#74C0FC30] border-[#74C0FC70] text-[#74C0FC]",
  };

  const labels = card.labels
    .map(
      (label) => `
      <div class="flex items-center gap-1 px-2 py-1 rounded-full ${labelColors[label]} border ">
        <img src="./assets/${label}.svg" alt="" />
        <p class="font-medium text-sm">${label.toUpperCase()}</p>
      </div>
    `,
    )
    .join("");

  const cardDetails = document.getElementById("card-details");
  cardDetails.innerHTML = `
          <h2 class="font-bold text-darkblue text-2xl text-left mb-2">${card.title}</h2>
    <div
      class="flex gap-2 items-center justify-start text-[#64748B] text-sm mb-6"
    >
      <span class="bg-green-500 rounded-full text-white font-medium py-1 px-2 flex items-center justify-center capitalize">${card.status === "open" ? "opened" : "closed"}</span
      ><span>•</span>${card.status === "open" ? "opened" : "closed"} by<span class=" capitalize">${card.assignee === "" ? "none" : card.assignee.replace("_", " ")} </span><span>•</span>
      <span>${new Date(card.updatedAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}</span>
    </div>
    <div class="flex items-center flex-wrap justify-start gap-1 mb-4">${labels}</div>
    <p class="text-[#64748B] text-left mb-6">${card.description}</p>
    <div
      class="p-4 grid grid-cols-2 justify text-left text-[#64748B] bg-[#F8FAFC] rounded-lg gap-x-1 gap-y-2.5"
    >
      <p>Assignee</p>
      <p>Priority:</p>
      <p class="font-semibold text-darkblue capitalize">${card.assignee === "" ? "no assignee" : card.assignee.replace("_", " ")}</p>
      <p
                  class="w-20 text-center ${card.priority.toUpperCase() == "HIGH" ? "text-[#EF4444] bg-[#FEECEC]" : card.priority.toUpperCase() == "MEDIUM" ? "text-[#D97706] bg-[#FFF6D1]" : "text-[#9CA3AF] bg-[#EEEFF2]"} rounded-full px-3 py-1.5 leading-none font-medium text-xs uppercase"
                >
                  ${card.priority}
                </p>
    </div>
  `;

  document.getElementById("word_modal").showModal();
}

fetchData();
