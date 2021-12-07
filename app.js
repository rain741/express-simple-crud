//step install
//1. npm init (sampai selesai)
//2. npm install express --save
//3. npm install --save--dev nodemon
//4. tambahkan pada script di package.json    
//   "start": "node app.js",
//   "dev": "nodemon app.js",
//5. npm run dev
const express = require("express");
const app = express();
const PORT = 3000;


let movies = [
    {id: 1, title: "November Rain", year: 1900},
    {id: 2, title: "September End", year: 1800},
    {id: 3, title: "December Now", year: 1700}
]

app.use(express.json())

app.get("/", (req, res) => {
  res.json("This is Express.js");
});

//get all movie
app.get("/movie", (req, res) => {
    res.json(movies)
})

//delete data by-ID
app.delete("/movie/:id", (req, res) => {
    let movie = movies.find(item => item.id === parseInt(req.params.id)) 
    
    if(movie){
        movies.splice(movies.indexOf(movie), 1)
        res.json("delete movie success")
    }
})

//edit data by-ID
app.put("/movie/:id", (req, res) => {
    let movie = movies.find(item => item.id === parseInt(req.params.id))

    if(movie){
        let update = {
            id: movie.id,
            title: req.body.title,
            year: req.body.year
        }
        movies.splice(movies.indexOf(movie), 1, update)
        res.json("Updated Movie success")
    }else{
        res.json("Update Error")
    }
})

//get movie by-ID
app.get("/movie/:id", (req, res) =>{
    const {id} = req.params

    let movie = movies.find(item => item.id == id)
    if(movie){
        res.json(movie)
    }else{
        res.json("Movie Not Found")
    }
})

//Add Movie
app.post("/movie", (req, res) => {
    let movie = req.body

    movies.push(movie)

    res.json("success add new movie")
})
app.listen(PORT, () => {
  console.log("Express Run on port " + PORT);
});