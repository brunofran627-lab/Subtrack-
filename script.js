 let subs = [];

function addSub() {
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);

  if (!name || isNaN(price)) return;

  subs.push({ name, price });

  render();
}

function render() {
  const list = document.getElementById("list");
  let total = 0;

  list.innerHTML = "";

  subs.forEach(s => {
    total += s.price;
    list.innerHTML += `<p>${s.name} - €${s.price.toFixed(2)}</p>`;
  });

  document.getElementById("total").innerText =
    "Total: €" + total.toFixed(2);
}
