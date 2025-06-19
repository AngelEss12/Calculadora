import { useState } from "react";
import { Button } from "./assets/components/Button";
import { numbers } from "./assets/data/numbers";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [storedValue, setStoredValue] = useState<string>(""); // Valor almacenado para la operación
  const [operator, setOperator] = useState<string>(""); // Operador seleccionado

  const handleClick = (value: string | number) => {
    if (value === 0 && inputValue === "") {
      // Evita que el primer valor sea 0
      return;
    } else if (typeof value === "number" || value === ".") {
      // Si es un número o un punto decimal, actualiza el valor de entrada
      if (value === "." && inputValue.includes(".")) {
        // Evita agregar múltiples puntos decimales
        return;
      }
      setInputValue((prev) => prev + value.toString());
    } else if (typeof value === "string" && value !== "=") {
      setOperator(value); // Establece el operador seleccionado
      setStoredValue(inputValue); // Almacena el valor actual
      setInputValue(""); // Limpia el valor de entrada para la siguiente operación
    } else if (value === "=") {
      calcularResultado();
    }
  };

  const eliminarDigito = () => {
    setInputValue(inputValue.slice(0, -1)); // Elimina el último dígito del valor de entrada
  }

  const limpiarCalculadora = () => {
    setInputValue(""); // Limpia el valor de entrada
    setStoredValue(""); // Limpia el valor almacenado
    setOperator(""); // Limpia el operador
  };

  function calcularResultado() {
    let num1 = parseFloat(storedValue);
    let num2 = parseFloat(inputValue);

    switch (operator) {
      case "÷":
        setInputValue((num1 / num2).toString());
        break;
      case "×":
        setInputValue((num1 * num2).toString());
        break;
      case "-":
        setInputValue((num1 - num2).toString());
        break;
      case "＋":
        setInputValue((num1 + num2).toString());
        break;
      default:
        setInputValue("Error");
        break;
    }
  }

  return (
    <>
      <header className="w-full h-[10vh] bg-gray-900 flex items-center justify-center">
        <h1 className="text-center text-white text-4xl font-bold">
          Calculadora
        </h1>
      </header>

      <main className="w-full h-[90vh] flex items-center justify-center bg-gray-800">
        <div className="w-[400px] h-[500px] bg-white bg-opacity-15 rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
          <div className="w-full">
            <input
              type="text"
              className="w-full h-12 bg-gray-200 bg-opacity-85 rounded-lg p-2 text-black text-right text-xl mb-4"
              placeholder="0"
              readOnly
              value={inputValue}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 w-full h-full">
            {numbers.map((value, index) => (
              <Button
                key={index}
                label={value.toString()}
                onClick={() => handleClick(value)}
              />
            ))}
            <button className="col-start-1 col-end-3 w-full h-full bg-fuchsia-700 text-white rounded-lg hover:bg-fuchsia-900 bg-opacity-90 transition-colors text-2xl font-bold" onClick={() => limpiarCalculadora()}>
              Limpiar
            </button>
            <button className="col-start-3 col-end-5 w-full h-full bg-fuchsia-700 text-white rounded-lg hover:bg-fuchsia-900 bg-opacity-90 transition-colors text-2xl font-bold" onClick={() => eliminarDigito()}>
              DEL
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
