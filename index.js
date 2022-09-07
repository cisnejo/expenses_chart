import data from "./data.json" assert { type: "json" };

const graphContainer = document.getElementById("graph_container");
const totalContainer = document.getElementById("total_container");
function PopulateDayData(data) {
  const maxAmount = getMaxData(data);
  const sumAmount = getSum(data);
  const DOM_bars = setDomData(data, maxAmount, sumAmount);
  DOM_bars.forEach((bar, index, bar_array) => {
    bar.addEventListener("click", () => {
      bar_array.forEach((dom_bar) => {
        const sibling_valueIndicator =
          dom_bar.parentElement.querySelector(".value_indicator");
        if (dom_bar === bar) {
          dom_bar.classList.toggle("bar_active");
          sibling_valueIndicator.classList.toggle("value_indicator_active");
        } else {
          dom_bar.classList = "bar";
          sibling_valueIndicator.classList = "value_indicator";
        }
      });
    });
  });
}

PopulateDayData(data);

// utility functions
function getMaxData(data) {
  const maxAmount = data.reduce((acc, curr) => {
    const { amount } = curr;
    if (amount > acc) {
      acc = amount;
      return acc;
    }
    return acc;
  }, 0);

  return maxAmount;
}
function getSum(data) {
  const sum = data.reduce((acc, curr) => {
    const { amount } = curr;
    acc += amount;
    return acc;
  }, 0);
  return sum;
}

function setDomData(JSON_data, maxAmount, sumAmount) {
  //set total amount
  const H3_totalValue = document.createElement("h1");
  H3_totalValue.innerText = `$${sumAmount}`;
  totalContainer.appendChild(H3_totalValue);




  return JSON_data.map((dayData) => {
    const { day, amount } = dayData;
    //create doc elements
    const P_value = document.createElement("p");
    const SPAN_valueIndicator = document.createElement("span");
    const DIV_barContainer = document.createElement("div");
    const DIV_barWrapper = document.createElement("div");
    const DIV_bar = document.createElement("div");
    const P_barTitle = document.createElement("p");

    //set classes and id's
    SPAN_valueIndicator.classList = "value_indicator";
    DIV_barContainer.classList = "bar_container";
    DIV_barWrapper.classList = "bar_wrapper";
    DIV_bar.classList = "bar";
    P_barTitle.classList = "bar_title";
    //append in heigharchy;
    SPAN_valueIndicator.appendChild(P_value);
    //DIV_bar.appendChild(SPAN_valueIndicator);
    DIV_barWrapper.appendChild(DIV_bar);
    DIV_barWrapper.appendChild(SPAN_valueIndicator);
    DIV_barContainer.appendChild(DIV_barWrapper);
    DIV_barContainer.appendChild(P_barTitle);
    graphContainer.appendChild(DIV_barContainer);

    //set values
    P_barTitle.innerText = day;
    P_value.innerText = `$${amount}`;
    DIV_bar.style.height = `${(amount / maxAmount) * 75}%`;
    return DIV_bar;
  });
}
