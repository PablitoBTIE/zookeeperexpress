import express from 'express'
import AnimalsController from './zookeeperii/controllers/AnimalsController.js'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.get("/", (req,res) =>{
    res.send("ok")
})

app.get("/animals", AnimalsController.getAllAnimals)
app.get("/animals/:id", AnimalsController.getAnimalById)
app.delete("/animals/:id", AnimalsController.deleteAnimal)
app.put("/animals/put/:id", AnimalsController.updateAnimal)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

exports.default = app;