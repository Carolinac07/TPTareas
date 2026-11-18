const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.json())
app.use(express.static("../Frontend"))

app.get("/tareas", (req, res) => {
    let tareas = JSON.parse(fs.readFileSync("tareas.json"))
    res.json(tareas)
})

app.post("/tareas", (req, res) => {
    let tareas = JSON.parse(fs.readFileSync("tareas.json"))

    let tarea = req.body

    tarea.id = Date.now()
    tarea.completar = false

    tareas.push(tarea)

    fs.writeFileSync("tareas.json", JSON.stringify(tareas))

    res.json(tarea)
})

app.put("/tareas/:id", (req, res) => {
    let tareas = JSON.parse(fs.readFileSync("tareas.json"))

    tareas.forEach(function(tarea) {
        if (tarea.id == req.params.id) {
            tarea.completar = !tarea.completar
        }
    })

    fs.writeFileSync("tareas.json", JSON.stringify(tareas))

    res.json(tareas)
})

app.delete("/tareas/:id", (req, res) => {
    let tareas = JSON.parse(fs.readFileSync("tareas.json"))

    tareas = tareas.filter(function(tarea) {
        return tarea.id != req.params.id
    })

    fs.writeFileSync("tareas.json", JSON.stringify(tareas))

    res.json(tareas)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Servidor funcionando")
})