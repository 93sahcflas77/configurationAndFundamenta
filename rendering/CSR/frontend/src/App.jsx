import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState()


  useEffect(() => {

    const fetchData = async () => {
      const fData = await fetch("http://localhost:7000");
      const data = await fData.json();
      setData(data)
    }

    fetchData();
  }, [])

  console.log(data);  

  return (
    <>
    <h1>Hello World</h1>
    </>
  )
}

export default App
