class Persona {
    constructor(id, nombre, apellido, fechaNacimiento) {
        if (id != null && nombre != null && apellido != null) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.fechaNacimiento = fechaNacimiento;
        }
    }
    ToString() {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, FechaNacimiento: ${this.fechaNacimiento}`;
    }
    ToJson() {
        return {
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            fechaNacimiento: this.fechaNacimiento
        };
    }
}

class Ciudadano extends Persona {

    constructor(id, nombre, apellido, fechaNacimiento, dni,) {

        super(id, nombre, apellido, fechaNacimiento);

        if (dni > 0 && dni !== null) {
            this.dni = dni;
        }
    }

    ToString() {
        return `${super.ToString()},Dni: ${this.dni}`;
    }
    ToJson() {
        return {
            ...super.ToJson(),
            dni: this.dni,
        };
    }
}


class Extranjero extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen) {

        super(id, nombre, apellido, fechaNacimiento);
        if (paisOrigen != null) {

            this.paisOrigen = paisOrigen;
        }
    }

    ToString() {

        return `${super.ToString()},paisOrigen: ${this.paisOrigen}`;
    }
    ToJson() {
        return {
            ...super.ToJson(),
            paisOrigen: this.paisOrigen,
        };
    }
}

const cadena = '[{"id":1,"apellido":"Serrano","nombre":"Horacio","fechaNacimiento":19840103,"dni":45876942},{"id":2,"apellido":"Casas","nombre":"Julian","fechaNacimiento":19990723,"dni":98536214},{"id":3,"apellido":"Galeano","nombre":"Julieta","fechaNacimiento":20081103,"dni":74859612},{"id":4,"apellido":"Molina","nombre":"Juana","fechaNacimiento":19681201,"paisOrigen":"Paraguay"},{"id":5,"apellido":"Barrichello","nombre":"Rubens","fechaNacimiento":19720523,"paisOrigen":"Brazil"},{"id":666,"apellido":"Hkkinen","nombre":"Mika","fechaNacimiento":19680928,"paisOrigen":"Finlandia"}]'

const personas = JSON.parse(cadena);

const arrayPersonas = [];

personas.forEach(Element => {

    if (Element.hasOwnProperty(`dni`)) {
        let ciudadano = new Ciudadano(Element.id, Element.nombre, Element.apellido, Element.fechaNacimiento, Element.dni)
        arrayPersonas.push(ciudadano);
    } else {
        let extranjero = new Extranjero(Element.id, Element.nombre, Element.apellido, Element.fechaNacimiento, Element.paisOrigen)
        arrayPersonas.push(extranjero);
    }
})

console.log(arrayPersonas);

const tablaDatos = document.getElementById("tablaDatos");

function cargarPersonasTabla(array) {

    array.forEach(persona => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${persona.id}</td>
        <td>${persona.nombre}</td>
        <td>${persona.apellido}</td>
        <td>${persona.fechaNacimiento}</td>
        <td>${persona.paisOrigen !== undefined ? persona.paisOrigen : ''}</td>
        <td>${persona.dni !== undefined ? persona.dni : ''}</td>
        `

        tablaDatos.appendChild(fila);
    })
}

cargarPersonasTabla(arrayPersonas);


const botonAgregar = document.getElementById("botonAgregar");
const formABM = document.getElementById("FormAgregar");
formABM.style.display = "none";
const contenedorGrid = document.getElementById("contenedorGrid");

const botonAceptar = document.getElementById("botonAceptar");
const botonCancelar = document.getElementById("botonCancelar");
const botonModificar = document.getElementById("botonModificar");
const botonEliminar = document.getElementById("botonEliminar");


function MostrarFormAbm() {
    contenedorGrid.style.display = "none"
    formABM.style.display = "block";
    botonEliminar.style.display = "none";
    botonModificar.style.display = "none";
}
botonAgregar.addEventListener("click", function () {
    limpiarForm();
    MostrarFormAbm();
});

botonCancelar.addEventListener("click", function () {
    ocultarFormAbm();
});

function ocultarFormAbm() {
    formABM.style.display = "none";
    contenedorGrid.style.display = "block"
}



const selectTipo = document.getElementById("filtroSelect");
let opcion = selectTipo.value;

function mostrarColumnaSegunCheckbox() {


    var checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {

            if (this.checked) {
                mostrarColumna(this.value);
            }
            else {
                ocultarColumna(this.value);

            }
        });
    });
}


function filtrarSegunSelect() {
    selectTipo.addEventListener("change", function () {

        switch (selectTipo.value) {
            case "Todos":
                BorrarDatosTabla();
                cargarPersonasTabla(arrayPersonas);
                mostrarColumnaSegunCheckbox();
                break;
            case "Extranjero":
                let arrayCiudadanos = arrayPersonas.filter(Persona => Persona instanceof Ciudadano)
                BorrarDatosTabla()
                cargarPersonasTabla(arrayCiudadanos);
                mostrarColumnaSegunCheckbox();
                break;
            case "Ciudadano":
                let arrayExtranjero = arrayPersonas.filter(Persona => Persona instanceof Extranjero)
                BorrarDatosTabla()
                cargarPersonasTabla(arrayExtranjero);
                mostrarColumnaSegunCheckbox();
                break;
        }

    });
}

function BorrarDatosTabla() {
    const filas = tablaDatos.querySelectorAll("tr:not(:first-child)");
    filas.forEach(filas => {
        tablaDatos.removeChild(filas);
    });
}




function mostrarColumna(idColumna) {

    console.log(idColumna);
    let filas = tablaDatos.getElementsByTagName('tr');
    let cabecera = tablaDatos.getElementsByTagName('th')[idColumna];
    let celdas;

    for (let i = 0; i < filas.length; i++) {

        celdas = filas[i].getElementsByTagName('td');

        if (celdas[idColumna]) {
            celdas[idColumna].style.display = '';
        }
    }

    if (cabecera) {
        cabecera.style.display = '';
    }
}


function ocultarColumna(idColumna) {

    let filas = tablaDatos.getElementsByTagName('tr');
    let cabecera = tablaDatos.getElementsByTagName('th')[idColumna];
    let celdas;

    for (let i = 0; i < filas.length; i++) {
        celdas = filas[i].getElementsByTagName('td');

        if (celdas[idColumna]) {
            celdas[idColumna].style.display = 'none';
        }
    }

    if (cabecera) {
        cabecera.style.display = 'none';
    }

}



const inputEdadPromedio = document.getElementById("inputEdad");
const botonEdad = document.getElementById("buttonPromedio");



function calcularEdadPromedio() {


    let edades = 0;
    let filas = tablaDatos.getElementsByTagName("tr");

    for (let i = 1; i < filas.length; i++) {
        const celdaEdad = filas[i].getElementsByTagName("td")[3];
        const edad = celdaEdad.textContent;
        console.log(edad.slice(0, 4))
        edades += (2024 - edad.slice(0, 4));
        console.log(edades);
    }
    return (edades / (filas.length - 1)).toFixed(2);
}

botonEdad.addEventListener("click", function () {
    inputEdadPromedio.value = calcularEdadPromedio();

});

inputID = document.getElementsByName("inputId");
inputNombre = document.getElementsByName("inputNombre");
inputApellido = document.getElementsByName("inputApellido");
inputEdad = document.getElementsByName("inputEdad");
inp1 = document.getElementsByName("inp1");
lbl1 = document.getElementById("lbl1");


inputSelect = document.getElementById("TipoSelect");




function agregarPersona() {
    inputID[0].value = "";
    nombre = inputNombre[0].value
    apellido = inputApellido[0].value
    fechaNacimiento = inputEdad[0].value;
    tipoPersona = inputSelect.value;

    let persona;
    console.log(tipoPersona);
    ultimoId = arrayPersonas[arrayPersonas.length - 1];
    id = ultimoId.id + 1;
    if (tipoPersona === "Ciudadano") {
        dni = inp1[0].value;
        persona = new Ciudadano(id, nombre, apellido, fechaNacimiento, dni);
    } else {
        paisOrigen = inp1[0].value;
        persona = new Extranjero(id, nombre, apellido, fechaNacimiento, paisOrigen)
    }

    arrayPersonas.push(persona);
    console.log(persona);
    limpiarForm();
    BorrarDatosTabla();
    cargarPersonasTabla(arrayPersonas);
}

function limpiarForm() {
    inputNombre[0].value = "";
    inputApellido[0].value = "";
    inputEdad[0].value = "";
    inp1[0].value = "";
    inputSelect.disabled = false;
}

function cargarFormAbm(persona) {
    inputID[0].value = persona.id;
    inputNombre[0].value = persona.nombre;
    inputApellido[0].value = persona.apellido;
    inputEdad[0].value = persona.fechaNacimiento;

    if (persona instanceof Ciudadano) {
        inputSelect.value = "Ciudadano";
        inp1[0].value = persona.dni;
        lbl1.textContent = "Dni";

    } else {
        inputSelect.value = "Extranjero";
        inp1[0].value = persona.paisOrigen;
        lbl1.textContent = "Pais Origen";
    }
    inputSelect.disabled = true;
}

inputSelect.addEventListener("change", function () {
    if (inputSelect.value === "Ciudadano") {
        lbl1.textContent = "Dni";
    } else {
        lbl1.textContent = "Pais Origen";
    }
});


tablaDatos.addEventListener("dblclick", function (event) {

    const fila = event.target.parentNode;
    if (fila.tagName === "TR" && fila !== tablaDatos.firstElementChild) {
        let id = fila.cells[0].textContent;
        let persona = arrayPersonas.find(p => p.id === parseInt(id));
        botonAceptar.style.display = "none"

        cargarFormAbm(persona);
        MostrarFormAbm();
        botonEliminar.style.display = "block";
        botonModificar.style.display = "block";
    };
});





function ValidarDatosAbm() {

    console.log(inputSelect.value);
    if ((inputNombre[0].value) === null || inputNombre[0].value.trim() === "") {
        alert("Debe indicar un nombre");
        return false;
    }
    if ((inputApellido[0].value) === null || inputApellido[0].value.trim() === "") {
        alert("Debe indicar un apellido");
        return false;
    }
    if (isNaN(inputEdad[0].value)) {
        alert("Debe indicar un valor de edad numerico");
        return false;
    }
    if (parseInt(inputEdad[0].value) === null) {
        alert("Debe indicar un valor de edad mayor a 15");
        return false;
    }

    switch (inputSelect.value) {
        case "Ciudadano":
            if (isNaN(inp1[0].value)) {
                alert("Debe indicar un valor numerico");
                return false;
            }

            if (parseInt(inp1[0].value) < 0) {
                alert("Debe indicar un dni mayor a 0");
                return false;
            }

            break;
        case "Extranjero":
            if ((inp1[0].value) == null) {
                alert("Debe indicar un telefono");
                return false;
            }
            break;
    }

    return true;
}

botonAceptar.addEventListener("click", function () {

    if (ValidarDatosAbm() === true) {
        agregarPersona();
        alert("Se creo la persona con exito");
        ocultarFormAbm();
    }

});


botonModificar.addEventListener("click", function () {
    modificarPersona();

});

botonEliminar.addEventListener("click", function () {
    eliminarPersona();
});

function modificarPersona() {
    if (ValidarDatosAbm() === true) {

        let idPersona = inputID[0].value;

        personasFiltradas = arrayPersonas.filter(p => p.id === idPersona);
        console.log(personasFiltradas);
        if (personasFiltradas.length > 0) {

            let personaAModificar = personasFiltradas[0];
            personaAModificar.nombre = inputNombre[0].value;
            personaAModificar.apellido = inputApellido[0].value;
            personaAModificar.fechaNacimiento = inputEdad[0].value;

            if (persona instanceof Ciudadano) {
                personaAModificar.dni = inp1[0].value;
            } else if (persona instanceof Extranjero) {
                personaAModificar.paisOrigen = inp1[0].value;
            }
            console.log(personaAModificar)
        }
        BorrarDatosTabla();
        cargarPersonasTabla(arrayPersonas);
        alert("Se modifico correctamente");
    }
}

function eliminarPersona() {
    {
        idEliminar = inputID[0].value;
        let indice = arrayPersonas.filter(Persona => Persona.Id === idEliminar);
        console.log(arrayPersonas);
        console.log(indice);
    }
}



const botonesOrden = document.querySelectorAll('.orden');
tbody = document.getElementById("itemsTabla");

botonesOrden.forEach((boton, index) => {
    boton.addEventListener('click', () => {
        const columna = index;
        ordenarTabla(columna);
    });
});


let ordenAscendente = true;


function ordenarTabla(columna) {
    const filas = Array.from(tablaDatos.querySelectorAll('tr:not(:first-child)'));


    let ascendente = true;
    if (tablaDatos.querySelector('th:nth-child(' + (columna + 1) + ')').classList.contains('ascendente')) {
        ascendente = false;
    }


    filas.sort((filaA, filaB) => {
        const valorA = filaA.cells[columna].textContent.trim();
        const valorB = filaB.cells[columna].textContent.trim();

        if (isNaN(valorA) || isNaN(valorB)) {

            return ascendente ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        } else {
            // Si los valores son numéricos, usar orden numérico
            return ascendente ? parseFloat(valorA) - parseFloat(valorB) : parseFloat(valorB) - parseFloat(valorA);
        }
    });


    filas.forEach(fila => tablaDatos.removeChild(fila));


    filas.forEach(fila => tablaDatos.appendChild(fila));

    tablaDatos.querySelectorAll('th').forEach(th => th.classList.remove('ascendente', 'descendente'));


    const th = tablaDatos.querySelector('th:nth-child(' + (columna + 1) + ')');
    th.classList.add(ascendente ? 'ascendente' : 'descendente');
}
filtrarSegunSelect();
mostrarColumnaSegunCheckbox();