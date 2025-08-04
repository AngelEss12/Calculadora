import { useReducer } from "react";
import { Button } from "./assets/components/Button";
import { numbers } from "./assets/data/numbers";
import { calculadorReducer, initialState } from "./reducers/calculador-reducer";

function App() {

  const [state, dispatch] = useReducer(calculadorReducer, initialState)

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
              value={state.inputValue}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 w-full h-full">
            {numbers.map((value, index) => (
              <Button
                key={index}
                label={value.toString()}
                onClick={() => dispatch({ type: "SET_INPUT_VALUE", payload: { value } })}
              />
            ))}
            <button className="col-start-1 col-end-3 w-full h-full bg-fuchsia-700 text-white rounded-lg hover:bg-fuchsia-900 bg-opacity-90 transition-colors text-2xl font-bold" onClick={() => dispatch({ type: "CLEAR_CALCULATOR" })}>
              Limpiar
            </button>
            <button className="col-start-3 col-end-5 w-full h-full bg-fuchsia-700 text-white rounded-lg hover:bg-fuchsia-900 bg-opacity-90 transition-colors text-2xl font-bold" onClick={() => dispatch({ type: "DELETE_DIGIT" })}>
              DEL
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
