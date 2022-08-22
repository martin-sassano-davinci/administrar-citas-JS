const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

const form = document.querySelector("#nueva-cita");
const citasLista = document.querySelector("#citas");

let editando;

mascotaInput.addEventListener("input", datosCita);
propietarioInput.addEventListener("input", datosCita);
telefonoInput.addEventListener("input", datosCita);
fechaInput.addEventListener("input", datosCita);
horaInput.addEventListener("input", datosCita);
sintomasInput.addEventListener("input", datosCita);
form.addEventListener("submit", crearCita);

const citasObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

function datosCita(e) {
  citasObj[e.target.name] = e.target.value;
  console.log(citasObj);
}

class Citas {
  constructor() {
    this.citas = [];
  }
  agregarCitas(cita) {
    this.citas = [...this.citas, cita];
    console.log(this.citas);
  }
  eliminarCitas(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }
  editarCitas(citaAct) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaAct.id ? citaAct : cita
    );
  }
}

class UI {
  printMessage(msg, type) {
    const divMsg = document.createElement("div");
    divMsg.classList.add("text-center", "alert", "d-block", "col-12");
    if (type === "error") {
      divMsg.classList.add("alert-danger");
    } else {
      divMsg.classList.add("alert-success");
    }
    divMsg.textContent = msg;
    document
      .querySelector("#contenido")
      .insertBefore(divMsg, document.querySelector(".agregar-cita"));

    setTimeout(() => {
      divMsg.remove();
    }, 3000);
  }
  printCita({ citas }) {
    this.limpiarHTML();
    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      const parrafoMascota = document.createElement("h2");
      parrafoMascota.classList.add("card-title", "font-weight-bolder");
      parrafoMascota.textContent = mascota;

      const parrafoPropietario = document.createElement("p");
      parrafoPropietario.innerHTML = `
                <span class="font-weight-bolder"> Propietario: </span> ${propietario}
            `;
      const parrafoTelefono = document.createElement("p");
      parrafoTelefono.innerHTML = `
                <span class="font-weight-bolder"> Telefono: </span> ${telefono}
            `;
      const parrafoFecha = document.createElement("p");
      parrafoFecha.innerHTML = `
                <span class="font-weight-bolder"> Fecha: </span> ${fecha}
            `;
      const parrafoHora = document.createElement("p");
      parrafoHora.innerHTML = `
                <span class="font-weight-bolder"> Hora: </span> ${hora}
            `;
      const parrafoSintomas = document.createElement("p");
      parrafoSintomas.innerHTML = `
                <span class="font-weight-bolder"> Sintomas: </span> ${sintomas}
            `;

      const eliminarBtn = document.createElement("button");
      eliminarBtn.classList.add("btn", "btn-danger", "mr-2");
      eliminarBtn.innerHTML = `Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

      eliminarBtn.onclick = () => eliminarCitas(id);

      const editarBtn = document.createElement("button");
      editarBtn.classList.add("btn", "btn-info");
      editarBtn.innerHTML = `Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;

      editarBtn.onclick = () => editarCitas(cita);

      divCita.appendChild(parrafoMascota);
      divCita.appendChild(parrafoPropietario);
      divCita.appendChild(parrafoTelefono);
      divCita.appendChild(parrafoFecha);
      divCita.appendChild(parrafoHora);
      divCita.appendChild(parrafoSintomas);
      divCita.appendChild(eliminarBtn);
      divCita.appendChild(editarBtn);

      citasLista.appendChild(divCita);
    });
  }
  limpiarHTML() {
    while (citasLista.firstChild) {
      citasLista.removeChild(citasLista.firstChild);
    }
  }
}

const ui = new UI();
const citas = new Citas();

function crearCita(e) {
  e.preventDefault();

  const { mascota, propietario, telefono, fecha, hora, sintomas } = citasObj;

  if (
    mascota.trim() === "" ||
    propietario.trim() === "" ||
    telefono.trim() === "" ||
    fecha.trim() === "" ||
    hora.trim() === "" ||
    sintomas.trim() === ""
  ) {
    ui.printMessage("Todos los campos son obligatorios", "error");
    return;
  }

  if (editando) {
    citas.editarCitas({ ...citasObj });

    ui.printMessage("Cita editada correctamente");

    form.querySelector('button[type="submit"]').textContent = "Crear cita";

    editando = false;
  } else {
    citasObj.id = Date.now();

    citas.agregarCitas({ ...citasObj });

    ui.printMessage("Cita agregada correctamente");
  }

  resetearObjeto();

  form.reset();

  ui.printCita(citas);
}

function resetearObjeto() {
  citasObj.mascota = "";
  citasObj.propietario = "";
  citasObj.telefono = "";
  citasObj.fecha = "";
  citasObj.hora = "";
  citasObj.sintomas = "";
}

function eliminarCitas(id) {
  citas.eliminarCitas(id);

  ui.printMessage("Cita eliminada correctamente");

  ui.printCita(citas);
}

function editarCitas(cita) {
  console.log(citas);
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  //llenar el obj

  citasObj.mascota = mascota;
  citasObj.propietario = propietario;
  citasObj.telefono = telefono;
  citasObj.fecha = fecha;
  citasObj.hora = hora;
  citasObj.sintomas = sintomas;
  citasObj.id = id;

  form.querySelector('button[type="submit"]').textContent = "Editar cita";

  editando = true;
}
