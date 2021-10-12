const readline = require("readline");
const formatiarValor = new Intl.NumberFormat();
const PREGUNTAS = ["Nombre del docente: ", "Cedula: ", "Horas trabajadas: "];
const VALOR_HORA = 31000;
const SEMANAS_MES = 4;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const preguntaYRespuestas = (pregunta) => {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
};

const resultado = (docente) => {
  console.log(`
     Nombre del docente ${docente["0"]}
     Identificacion: ${docente["1"]}
     Horas trabajdas semanales : ${docente["2"]}
     Valora horas trabajadas mensual ${formatiarValor.format(
       (docente["2"] * VALOR_HORA) * SEMANAS_MES
     )}`);
  rl.close();
};

const inicioApp = async () => {
  const respuestas = {};
     console.log('===============DATOS DEL DOCENTE===================')
  for (let [indice, pregunta] of PREGUNTAS.entries()) {
    const result = await preguntaYRespuestas(pregunta);
    respuestas[indice] = result;
  }

  while (19 < respuestas["2"] || !Number(respuestas["2"])) {
    respuestas["2"] = await preguntaYRespuestas(
      "Ingrese un valor para las horas trabajadas correcto: "
    );
  }

  resultado(respuestas);
};

inicioApp();
