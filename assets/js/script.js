const baseURL = "https://b-okina-toshokan.onrender.com/obras";

async function findAllObras() {
  const response = await fetch(`${baseURL}/todas-obras`);

  const obras = await response.json();

  obras.forEach(function (obra) {
    document.querySelector("#obraList").insertAdjacentHTML(
      "beforeend",
      `
    <div class="ObraListaItem">
          <div>
            <div class="ObraListaItem__nome">${obra.nome}</div>
            <div class="ObraListaItem__nota">${obra.nota} <img src="./assets/img/star.svg" alt="estrela" width="14px"></div>

            <div class="ObraListaItem__sinopse">
              ${obra.sinopse}
            </div>
          </div>
          <img
            src="${obra.foto}"
            alt="Obra ${obra.nome}"
            class="ObraListaItem__foto"
          />
        </div>
    `
    );
  });
}

async function findByIdObras() {
  const id = document.querySelector("#idObra").value;

  const response = await fetch(`${baseURL}/obra/${id}`);
  const obra = await response.json();

  const obraEscolhidaDiv = document.querySelector("#obraEscolhida");

  obraEscolhidaDiv.innerHTML = ` <div class="ObraCardItem">
  <div>
    <div class="ObraCardItem__nome">${obra.nome}</div>
    <div class="ObraCardItem__nota">${obra.nota} <img src="./assets/img/star.svg" alt="estrela" width="14px"></div>
    <div class="ObraCardItem__sinopse">
      ${obra.sinopse}
    </div>
  </div>
  <img
    src="${obra.foto}"
    alt="Obra ${obra.nome}"
    class="ObraCardItem__foto"
  />
</div>`;
}

findAllObras();

function openModalNew() {
  document.querySelector(".modal-overlay").style.display = "flex";
}

function closeModalNew() {
  document.querySelector(".modal-overlay").style.display = "none";

  let nome = (document.querySelector("#nome").value = "");
  let sinopse = (document.querySelector("#sinopse").value = "");
  let nota = (document.querySelector("#nota").value = "");
  let foto = (document.querySelector("#foto").value = "");
}

async function createObra() {
  let nome = document.querySelector("#nome").value;
  let sinopse = document.querySelector("#sinopse").value;
  let nota = document.querySelector("#nota").value;
  let foto = document.querySelector("#foto").value;

  let obra = {
    nome,
    sinopse,
    nota,
    foto,
  };


  const response = await fetch(`${baseURL}/create`, {
    method: "post",
    headers: {
      "content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(obra),
  });

  const newObra = await response.json();

  const html = `<div class="ObraListaItem">
  <div>
    <div class="ObraListaItem__nome">${newObra.nome}</div>
    <div class="ObraListaItem__nota">${newObra.nota} <img src="./assets/img/star.svg" alt="estrela" width="14px"> </div>
    <div class="ObraListaItem__sinopse">
      ${newObra.sinopse}
    </div> 
  </div>
  <img
    src="${newObra.foto}"
    alt="Obra ${newObra.nome}"
    class="ObraListaItem__foto"
  />
</div>`;

  document.querySelector("#obraList").insertAdjacentHTML("beforeend", html);

  closeModalNew();
}
