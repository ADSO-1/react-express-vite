import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Presentacion from './components/Presentacion';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [numero, setNumero] = useState(0)
  const [nombre, setNombre] = useState("")
  const [resul, setResultado] = useState({})
  const [resulSaludo, setResulSaludo] = useState({})


  const handelOperacion = async (e) => {
    e.preventDefault();
    console.log("Operacion del numero: " , numero);

    try {  
        const respuesta = await fetch(`http://localhost:4000/operacion/${numero}`);
        const resultado = await respuesta.json();
        setResultado(resultado);  
        console.log(resultado);              
    } catch (error) {
        console.log(error);
    }
  };

  const handelSaludo = async (e) => {
    e.preventDefault();

    try {  
        const respuesta = await fetch(`http://localhost:4000/saludo/${nombre}`);
        const resultado = await respuesta.json();
        setResulSaludo(resultado);  
        console.log(resultado);              
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>


      <Presentacion
        count={count}
        setCount={setCount}
      />

      <div>

        <form
          onSubmit={handelOperacion} 
        >
          <fieldset>
            <legend>Multiplicar x 5</legend>
            <input 
              type="number" 
              id="numero" 
              placeholder="Indica el numero" 
              value={numero}
              onChange={ e => setNumero(e.target.value) }
            />
            <button>
              Multiplicar x 5
            </button>

            <p> 
              <strong>El resultado es: </strong> {resul.resultado}  
            </p>

          </fieldset>
        </form>

        <form
          onSubmit={handelSaludo} 
        >
          <fieldset>
            <legend>Saludo</legend>
            <input 
              type="text" 
              id="nombre" 
              placeholder="Indica el nombre" 
              value={nombre}
              onChange={ e => setNombre(e.target.value) }
            />
            <button>
              Saludar
            </button>

            <p> 
              <strong> {resulSaludo.saludo} </strong> {resulSaludo.nombre}  
            </p>

          </fieldset>
        </form>

      </div>
      
    </div>
  )
}

export default App
