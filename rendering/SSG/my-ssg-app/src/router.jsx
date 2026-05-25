import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";


export const routes= [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/about",
        element: <About/>
    },
    {
        path: "/contact",
        element: <Contact/>
    }
]