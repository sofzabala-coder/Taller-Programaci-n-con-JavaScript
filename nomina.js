//  CONSTANTES 2026 
const SMLV               = 1750905;
const SUBSIDIO_TRANSPORTE = 249095;
const UVT                = 52.37;   

const ARL_TARIFAS = {
  1: 0.00522,   // Riesgo 1  - Mínimo
  2: 0.01044,   // Riesgo 2 - Bajo
  3: 0.02436,   // Riesgo 3 - Medio
  4: 0.04350,   // Riesgo 4 - Alto
  5: 0.06960,   // Riesgo 5  - Máximo
};

//  VARIABLES GLOBALES DEL USUARIO 
let nombreCompleto  = "";
let edad            = 0;
let tipoDocumento   = "";   
let numeroDocumento = "";
let salario         = 0;
let comisiones      = 0;
let horasExtra      = 0;
let nivelRiesgo     = 1;   

// VALIDACIÓN DE PERFIL
function validarPerfil(edad) {
  if (edad < 18)  return "menor_de_edad";   // Bloqueado, no puede continuar
  if (edad < 25)  return "beneficiario";    // Beneficiario por cotizante, no continúa
  if (edad >= 60) return "pensionado";      // Solo se calcula pensión
  return "activo";                          // Flujo normal
}

// VALIDAR DOCUMENTO VS EDAD 
function validarDocumento(tipoDoc, edad) {
  if (tipoDoc === "RC" && edad >= 7)  return false;
  if (tipoDoc === "TI" && (edad < 7 || edad >= 18)) return false;
  if (tipoDoc === "CC" && edad < 18)  return false;
  return true; 
}

// CÁLCULO OBLIGACIONES LABORALES 
function calcularNomina(salario, comisiones, horasExtra, nivelRiesgo, esPensionado) {

  // Total devengado 
  const totalDevengado = salario + comisiones + horasExtra;

  // IBC = 70% del total devengado
  const ibc = totalDevengado * 0.70;

  // Auxilio de transporte
  const auxilioTransporte = salario <= 2 * SMLV ? SUBSIDIO_TRANSPORTE : 0;

  // Total ingresos para el desprendible
  const totalIngresos = totalDevengado + auxilioTransporte;

  // Deducciones
  // Si es pensionado: solo paga pensión 
  // Si es activo: paga salud, pensión, solidaridad, ARL y retención

  const salud       = esPensionado ? 0 : ibc * 0.04;
  const pension     = ibc * 0.04;

  // Fondo de Solidaridad
  const solidaridad = ibc >= 4 * SMLV ? ibc * 0.01 : 0;

  const arl         = esPensionado ? 0 : ibc * ARL_TARIFAS[nivelRiesgo];

  // Retención en la fuente: solo para trabajadores activos
  const retencion   = esPensionado ? 0 : calcularRetencion(totalIngresos, salud, pension);

  const totalDeducciones = salud + pension + solidaridad + arl + retencion;
  const neto = totalIngresos - totalDeducciones;

  return {
    totalDevengado,
    ibc,
    auxilioTransporte,
    totalIngresos,
    salud,
    pension,
    solidaridad,
    arl,
    retencion,
    totalDeducciones,
    neto
  };
}

// RETENCIÓN EN LA FUENTE 
function calcularRetencion(totalIngresos, salud, pension) {

  const ingresosNoCR = salud + pension;

  //  Rentas exentas 
  const baseParaExentas = totalIngresos - ingresosNoCR;
  const rentasExentas   = Math.min(baseParaExentas * 0.25, 420 * UVT);

  //  Ingreso laboral gravado
  const gravado    = Math.max(0, totalIngresos - ingresosNoCR - rentasExentas);
  const gravadoUVT = gravado / UVT;

  // tabla del Art. 383
  let retencion = 0;

  if      (gravadoUVT <= 95)   retencion = 0;
  else if (gravadoUVT <= 150)  retencion = (gravadoUVT - 95)   * 0.19 * UVT;
  else if (gravadoUVT <= 360)  retencion = ((gravadoUVT - 150) * 0.28 + 10)  * UVT;
  else if (gravadoUVT <= 640)  retencion = ((gravadoUVT - 360) * 0.33 + 69)  * UVT;
  else if (gravadoUVT <= 945)  retencion = ((gravadoUVT - 640) * 0.35 + 162) * UVT;
  else if (gravadoUVT <= 2300) retencion = ((gravadoUVT - 945) * 0.37 + 268) * UVT;
  else                         retencion = ((gravadoUVT - 2300) * 0.39 + 770) * UVT;

  return Math.max(0, retencion);
}


// LEER DEL DOM:) 
function leerformulario() {
  nombreCompleto  = document.getElementById("nombre").value.trim();
  edad            = parseInt(document.getElementById("edad").value);
  tipoDocumento   = document.getElementById("tipoDocumento").value;
  numeroDocumento = document.getElementById("numeroDocumento").value.trim();
  salario         = parseFloat(document.getElementById("salario").value);
  comisiones      = parseFloat(document.getElementById("comisiones").value) || 0;
  horasExtra      = parseFloat(document.getElementById("horasExtra").value) || 0;
  nivelRiesgo     = parseInt(document.getElementById("nivelRiesgo").value); 
}

function calcular() {
  leerformulario ();

   // Validar documento
  if (!validarDocumento(tipoDocumento, edad)) {
    alert("Tipo de documento no corresponde a la edad");
    return;
}
// Validad perfil
  const perfil = validarPerfil(edad);
  if (perfil === "menor_de_edad") {
    alert("No puede continuar, es menor de edad");
    return;
  } else if (perfil === "beneficiario") {
    alert("Es beneficiario por cotizante, no se calculan obligaciones laborales");
    return;
  }

  const esPensionado = perfil === "pensionado";

//CALCULAR
  const resultado = calcularNomina(salario, comisiones, horasExtra, nivelRiesgo, esPensionado);


  console.log(resultado); 
}