const allissues = [];

const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const btns = document.querySelectorAll(".btn");

function removeActive() {
  btns.forEach((b) => b.classList.remove("active"));
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeActive();
    btn.classList.add("active");
  });
});

async function fetchData() {
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
}

function showAllCards(cards) {
  const cardsSection = document.querySelector(".cards");
  cardsSection.innerHTML = "";
  cards.forEach((card) => {
    const borderTopClass =
      card.status == "open" ? "border-[#00A96E]" : "border-[#A855F7]";
    const cardSection = document.createElement("div");
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
              <div class="flex items-center justify-start gap-1 mb-4">
                <div
                  class="flex items-center justify-center gap-0.5 px-2 py-1 rounded-full bg-[#FEECEC] border border-[#FECACA]"
                >
                  <img src="./assets/bug.svg" alt="bug" />
                  <p class="font-medium text-[#EF4444] text-sm">BUGS</p>
                </div>
                <div
                  class="flex items-center justify-center gap-0.5 px-2 py-1 rounded-full bg-[#FEECEC] border border-[#FECACA]"
                >
                  <img src="./assets/bug.svg" alt="bug" />
                  <p class="font-medium text-[#EF4444] text-sm">BUGS</p>
                </div>

                <div></div>
              </div>
              <hr class="border-t border-neutral-300 mb-4" />
              <div class="text-sm text-[#64748B]">
                <p class="mb-2">${card.author}</p>
                <p>${new Date(card.createdAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}</p>
              </div>
            </div>
    `;
    cardsSection.append(cardSection);
  });
}

fetchData();
