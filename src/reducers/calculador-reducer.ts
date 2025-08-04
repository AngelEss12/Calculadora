

export type CalculadorActionType =
    { type: "SET_INPUT_VALUE", payload: { value: string | number } } |
    { type: "DELETE_DIGIT" } |
    { type: "CLEAR_CALCULATOR" }

export type CalculadorState = {
    inputValue: string;
    storedValue: string;
    operator: string;
}

export const initialState: CalculadorState = {
    inputValue: "",
    storedValue: "",
    operator: ""
}

let num1: number = 0;
let num2: number = 0;

export const calculadorReducer = (
    state: CalculadorState, action: CalculadorActionType
): CalculadorState => {
    if (action.type === "SET_INPUT_VALUE") {
        if (action.payload.value === 0 && state.inputValue === "") {
            // Evita que el primer valor sea 0
            return {
                ...state,
                inputValue: ""
            };
        } else if (typeof action.payload.value === "number" || action.payload.value === ".") {
            // Si es un número o un punto decimal, actualiza el valor de entrada
            if (action.payload.value === "." && state.inputValue.includes(".")) {
                // Evita agregar múltiples puntos decimales
                return {
                    ...state,
                    inputValue: state.inputValue
                };
            }
            return {
                ...state,
                inputValue: state.inputValue + action.payload.value.toString()
            };
        } else if (typeof action.payload.value === "string" && action.payload.value !== "=") {

            return {
                ...state,
                storedValue: state.inputValue,
                inputValue: "",
                operator: action.payload.value
            };
        } else if (action.payload.value === "=") {
            num1 = parseFloat(state.storedValue);
            num2 = parseFloat(state.inputValue);

            switch (state.operator) {
                case "÷":
                    return {
                        ...state,
                        inputValue : (num1 / num2).toString()}
                    break;
                case "×":
                    return {
                        ...state,
                        inputValue : (num1 * num2).toString()}
                    break;
                case "-":
                    return {
                        ...state,
                        inputValue : (num1 - num2).toString()}
                    break;
                case "＋":
                    return {
                        ...state,
                        inputValue : (num1 + num2).toString()}
                    break;
                default:
                    return {
                        ...state,
                        inputValue : "Error"}
            }
        }
    }
    if (action.type === "DELETE_DIGIT") {
        return {
            ...state,
            inputValue: state.inputValue.slice(0, -1) // Elimina el último dígito del valor de entrada
        };
    }

    if (action.type === "CLEAR_CALCULATOR") {
        return {
            ...state,
            inputValue: "", // Limpia el valor de entrada
            storedValue: "", // Limpia el valor almacenado
            operator: "" // Limpia el operador
        };
    }
    return state;
}

