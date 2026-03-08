let allissues = [];

const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const btns = document.querySelectorAll(".btn");

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

async function fetchData() {
  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    allissues = data.data;
    console.log(allissues);
    showAllCards(allissues);
  } catch (error) {
    console.error("error fetching data", error);
  }
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
    <div
              class="card drop-shadow-[0_5px_10px_rgba(0,0,0,0.08)] p-4 border-t-5 ${borderTopClass} rounded-t-lg bg-white"
            >
              <div class="flex items-center justify-between mb-3">
                 <img src="./assets/${card.status}-Status.png" alt="" />
                <div
                  class="${card.priority.toUpperCase() == "HIGH" ? "text-[#EF4444] bg-[#FEECEC]" : card.priority.toUpperCase() == "MEDIUM" ? "text-[#D97706] bg-[#FFF6D1]" : "text-[#9CA3AF] bg-[#EEEFF2]"} rounded-full px-6 py-1.5 leading-none font-medium text-xs uppercase"
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

fetchData();
