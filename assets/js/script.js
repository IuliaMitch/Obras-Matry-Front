const baseURL = "http://localhost:4000/obras";
const msgAlert = document.querySelector(".msg-alert");
const playButton = document.querySelector(".button-audio");
const welcome = document.querySelector(".Logo");

welcome.addEventListener("click", function () {
  openMessageAlert("Bem vindos a Grande Biblioteca!", "Iulia")
  showMessageAlert()
})

playButton.addEventListener("click", function () {
  const audio = document.querySelector("#audio")
  if (audio.classList.contains("close")) {
    audio.className = "open"
  } else {
    audio.className = "close"
  }

})

async function findAllObras() {
  const response = await fetch(`${baseURL}/all-obras`);

  const obras = await response.json();

  obras.forEach(function (obra) {
    document.querySelector("#obraList").insertAdjacentHTML(
      "beforeend",
      `
    <div class="obra-list-item" id="obra-list-item'${obra._id}'">
          <div>
          
            <div class="obra-list-item-nome">${obra.nome}</div>
            <div class="obra-list-item-nota">${obra.nota} <img src="./assets/img/star.svg" alt="estrela" width="14px"></div>
            <div class="obra-list-item-sinopse">
              ${obra.sinopse}
            </div>
            
            <div class="obra-list-item-actions actions">
          <button class="actions-editar btn" onclick="openModalNew('${obra._id}')"> Editar </button>
          <button class="actions-apagar btn" onclick="openModalDelete('${obra._id}')"> Apagar </button>
          </div>
          </div>
          <img
            src="${obra.foto}"
            alt="Obra ${obra.nome}"
            class="obra-list-item-foto"
          />
          
        </div>
    `
    );
  });
}

async function findByIdObras() {
  const id = document.querySelector("#search-input").value;

  if (id == "") {
    openMessageAlert("Digite um ID para pesquisar!", "danger");
    showMessageAlert();

    return;
  }

  const response = await fetch(`${baseURL}/one-obra/${id}`);
  const obra = await response.json();

  if (obra.message != undefined) {
    openMessageAlert(obra.message, "danger");
    showMessageAlert();

    return;
  }

  document.querySelector('#obraList').style.display = 'none'
  document.querySelector('.list-all').style.display = 'block'
  const chosenObraDiv = document.querySelector("#chosen-obra");

  chosenObraDiv.innerHTML = ` <div class="obra-card-item" id="obra-card-item-'${obra._id}'">
  <div>
    <div class="obra-card-item-nome">${obra.nome}</div>
    <div class="obra-card-item-nota">${obra.nota} <img src="./assets/img/star.svg" alt="estrela" width="14px"></div>

    <div class="obra-card-item-sinopse">
      ${obra.sinopse}
    </div>
    <div class="obra-list-item-actions actions">
    <button class="actions-editar btn" onclick="openModalNew('${obra._id}')"> Editar </button>
    <button class="actions-apagar btn" onclick="openModalDelete('${obra._id}')"> Apagar </button>
    </div>
  </div>
  <img
    src="${obra.foto}"
    alt="Obra ${obra.nome}"
    class="obra-card-item-foto"
  />
</div>`;
}

findAllObras();

async function openModalNew(id = "") {
  if (id != "") {
    document.querySelector("#title-modal").innerHTML =
      "<strong>Atualizar Obra</strong>";
    document.querySelector("#button-modal").innerHTML =
      "<strong>Atualizar</strong>";

    const response = await fetch(`${baseURL}/one-obra/${id}`);
    const obra = await response.json();

    document.querySelector("#id").value = obra._id;
    document.querySelector("#nome").value = obra.nome;
    document.querySelector("#sinopse").value = obra.sinopse;
    document.querySelector("#nota").value = obra.nota;
    document.querySelector("#foto").value = obra.foto;
  } else {
    document.querySelector("#title-modal").innerHTML =
      "<strong>Adicionar Obra</strong>";
    document.querySelector("#button-modal").innerHTML =
      "<strong>Adicionar</strong>";
  }
  document.querySelector(".modal-overlay").style.display = "flex";
}

function closeModalNew() {
  document.querySelector(".modal-overlay").style.display = "none";

  let id = (document.querySelector("#id").value = "");
  let nome = (document.querySelector("#nome").value = "");
  let sinopse = (document.querySelector("#sinopse").value = "");
  let nota = (document.querySelector("#nota").value = "");
  let foto = (document.querySelector("#foto").value = "");
}

async function submitObra() {
  let id = document.querySelector("#id").value;
  let nome = document.querySelector("#nome").value;
  let sinopse = document.querySelector("#sinopse").value;
  let nota = document.querySelector("#nota").value;
  let foto = document.querySelector("#foto").value;

  let obra = {
    id,
    nome,
    sinopse,
    nota,
    foto,
  };

  const modoEdicaoAtivado = id != "";

  const endpoint =
    baseURL + (modoEdicaoAtivado ? `/update-obra/${id}` : "/create-obra");

  const response = await fetch(endpoint, {
    method: modoEdicaoAtivado ? "put" : "post",
    headers: {
      "content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(obra),
  });

  const newObra = await response.json();

  if (newObra.message != undefined) {
    openMessageAlert(newObra.message, "danger");
    showMessageAlert();
    return;
  }

  if (modoEdicaoAtivado == true) {
    openMessageAlert("Obra atualizada com sucesso!", "success");
  }
  if (modoEdicaoAtivado == false) {
    openMessageAlert("Obra criada com sucesso!", "success");
  }
  document.location.reload(true);

  closeModalNew();
}

function openModalDelete(id) {
  document.querySelector("#overlay-delete").style.display = "flex";

  const btnYes = document.querySelector(".btn-delete-yes");

  btnYes.addEventListener("click", function () {
    DeleteObra(id);
  });
}

function closeModalDelete() {
  document.querySelector("#overlay-delete").style.display = "none";
}

async function DeleteObra(id) {
  const response = await fetch(`${baseURL}/delete-obra/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  const result = await response.json();

  openMessageAlert(result.message, "success")

  document.location.reload(true);
  closeModalDelete();
}
showMessageAlert();

function openMessageAlert(name, type) {
  localStorage.setItem("message", name);
  localStorage.setItem("type", type);
}

function showMessageAlert(time = 3000) {
  msgAlert.innerText = localStorage.getItem("message");
  msgAlert.classList.add(localStorage.getItem("type"));
  closeMessageAlert(time)
}

function closeMessageAlert(time) {
  setTimeout(function () {
    msgAlert.innerText = "";
    msgAlert.classList.remove(localStorage.getItem("type"));
    localStorage.clear();
  }, time);
}


showMessageAlert();