export function valida(input){    
    const tipoDeInput = input.dataset.tipo;
    console.log(tipoDeInput)
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",    
    "customError",
    "patternMismatch"
]

const mensajesError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El email no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: 
        "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo telefono no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "el estado debe contener entre 10 a 40 caracteres"
    },
}

function mostrarMensajeError(tipoInput, input){
    let mensaje = '';
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesError[tipoInput][error];
        }
    } )
    return mensaje;
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);    
    let  mensaje = '';    
    if (!mayorEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad';
    }
    input.setCustomValidity(mensaje);
}


function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
    
}