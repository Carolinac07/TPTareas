let tareas = []
function agregarTarea() {
let titulo = document.getElementById("titulo").value
let descripcion = document.getElementById("descripcion").value
let fecha = document.getElementById("fecha").value
let tarea = {
    id: Date.now(),
    titulo: titulo,
    descripcion: descripcion,
    fecha: fecha,
    completar: false
}
tareas.push(tarea)
document.getElementById("titulo").value = ""
document.getElementById("descripcion").value = ""
document.getElementById("fecha").value = ""
mostrarTareas()
}

function mostrarTareas() {
let lista = document.getElementById("listaTareas")
lista.textContent = ""

tareas.forEach(function(tarea) {
    let div = document.createElement("div")
    div.className = "tarea"
    if (tarea.completar) {
        div.classList.add("completada")
    }
    let titulo = document.createElement("h3")
    titulo.textContent = tarea.titulo
    let descripcion = document.createElement("p")
    descripcion.textContent = tarea.descripcion
    let fecha = document.createElement("p")
    fecha.textContent = "Fecha: " + tarea.fecha
    let botonCompletar = document.createElement("button")
    botonCompletar.textContent = tarea.completar ? "Desmarcar" : "Completar"
    botonCompletar.onclick = function() {
        completarTarea(tarea.id)
    }
    let botonEliminar = document.createElement("button")
    botonEliminar.textContent = "Eliminar"
    botonEliminar.onclick = function() {
        eliminarTarea(tarea.id)
    }
    div.appendChild(titulo)
    div.appendChild(descripcion)
    div.appendChild(fecha)
    div.appendChild(botonCompletar)
    div.appendChild(botonEliminar)
    lista.appendChild(div)
})
}

function completarTarea(id) {
tareas.forEach(function(tarea) {
if (tarea.id == id) {
tarea.completar = !tarea.completar
}
})
mostrarTareas()
}
function eliminarTarea(id) {
tareas = tareas.filter(function(tarea) {
return tarea.id != id
})
mostrarTareas()
}
mostrarTareas()