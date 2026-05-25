require("@babel/register")({
    extensions: [".js", ".jsx"]
})
const express = require("express");
const app = express();
const path = require("path");
const { engine } = require("express-handlebars");
const { json } = require("stream/consumers");
// react
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("./src/App").default;
const template = require("./template")
const PORT = 7000;

app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));


// react
app.get("/", (req, res) => {
    const reactHTML = ReactDOMServer.renderToString(
        React.createElement(App)
    );
    const html = template(reactHTML);
    res.send(html)
})



// handlebars
// app.engine("handlebars", engine({partialsDir: path.join(__dirname, "views/partials")}));
// app.set("view engine", "handlebars");

// app.get("/", (req, res) => {
//     const products = ['Laptop',
//     'Phone',
//     'Tablet'];

//     res.render("home", {
//         title: "Home page",
//         username: "chandan thakur",
//         products
//     })
// })

// app.get("/about", (req, res) => {
//     res.render("about", {
//         title: "About page"
//     })
// })

// app.get("/users", (req, res) => {
//     const user = [
//         {name: "chandan"},
//         {name: "ravi"},
//         {name: "kavi"}
//     ]

//     res.render("users", {
//         title: "Users page",
//         user
//     })
// })



// ejs
// app.set("view engine", "ejs");
// app.get("/home", (req, res) => {
//     const user = "chandan thakur";
//     const product = ["mobile", "labtop", "other device"]

//     res.render("home", {
//         title: "Home Page",
//         product,
//         user
//     })
// })


// pug
// app.set("view engine", "pug");
// app.get("/pug", (req, res) => {

//     const user = "chandan thakur";
//     const products = ["mobile", "labtop", "other device"]

//     res.render("pugHome", {
//         title: "Home Page",
//         products,
//         user
//     })
// })



// only simple html generate
// app.get("/", (req, res) => {
//     const html = `
//     <!DOCTYPE html>
//         <html lang="en">

//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>Simple SSR</title>
//             </head>

//             <body>

//                 <h1>SSR With Simple HTML</h1>
//                 <p>HTML generated from server</p>
//             </body>

//         </html>
//     `

//     res.send(html)
// })

// app.get("/dynamic", (req, res) => {
//     const username = "chandan thakur"
//     const product = ["mobile", "laptop", "other device"]
//     let productHTML = ""
//     product.forEach((p) => {
//         productHTML += `<li>${p}</li>`
//     })

//     const html = `
//         <!DOCTYPE html>
//         <html lang="en">

//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <link rel="stylesheet" href="/style.css">
//                 <title>Simple SSR</title>
//             </head>

//             <body>
//                 <h1>Welcome ${username}</h1>
//                 <h1>My Project</h1>
//                 <ul>${productHTML}</ul>
//             </body>
//             <script>
                
//             </script>

//         </html>
//     `

//     res.send(html)

// })

// app.get("/about", (req, res) => {
//     res.send(`<h1>About Page</h1>`)
// })

// app.get("/contact", (req, res) => {
//     res.send(`<h1>Contact Page</h1>`)
// })


// html file render
// app.get("/sendfile", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"))
// })


app.listen(PORT, () => {
    console.log(`Server is runing this port :${PORT} `)
})