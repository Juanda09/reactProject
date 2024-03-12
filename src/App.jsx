
import './App.css'

function App() {
  const saludar= () => {
    alert("Hola")
  }
  const mostrarTexto = (e) => {
    console.log(e.target.value)
  }

  return (
    <>
    <button onClick={()=> saludar()}>
      Enviar
    </button>
    <input type="tex" onChange={mostrarTexto}></input>
    </>
  )
}

export default App
