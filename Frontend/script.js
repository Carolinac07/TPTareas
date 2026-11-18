function agregarTarea() {
    let titulo = document.getElementById("titulo").value
    let descripcion = document.getElementById("descripcion").value
    let fecha = document.getElementById("fecha").value

    if (titulo == "" || descripcion == "" || fecha == "") {
        alert("Por favor, completá todos los campos")
        return
    }

    fetch("http://localhost:3000/tareas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descripcion: descripcion,
            fecha: fecha
        })
    })
    .then(function() {
        document.getElementById("titulo").value = ""
        document.getElementById("descripcion").value = ""
        document.getElementById("fecha").value = ""

        mostrarTareas()
    })
}

function mostrarTareas() {
    fetch("http://localhost:3000/tareas")
    .then(function(respuesta) {
        return respuesta.json()
    })
    .then(function(tareas) {
        let lista = document.getElementById("listaTareas")
        lista.innerHTML = ""

        tareas.forEach(function(tarea) {
            let div = document.createElement("div")
            div.className = "tarea"

            if (tarea.completar == true) {
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
    })
}

function completarTarea(id) {
    fetch("http://localhost:3000/tareas/" + id, {
        method: "PUT"
    })
    .then(function() {
        mostrarTareas()
    })
}

function eliminarTarea(id) {
    fetch("http://localhost:3000/tareas/" + id, {
        method: "DELETE"
    })
    .then(function() {
        mostrarTareas()
    })
}

mostrarTareas()