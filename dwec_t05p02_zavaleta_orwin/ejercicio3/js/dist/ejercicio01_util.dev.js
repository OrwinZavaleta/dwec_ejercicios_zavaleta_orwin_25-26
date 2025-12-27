"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log("T04P02 - Ejercicio 01 - Utilidades");

var Util =
/*#__PURE__*/
function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "validarEntero",
    value: function validarEntero(valor) {
      if (valor === null || valor === undefined || typeof valor === "boolean" || String(valor).trim() === "") {
        return false;
      }

      return Number.isInteger(Number(valor));
    }
  }, {
    key: "validarReal",
    value: function validarReal(valor) {
      if (valor === null || valor === undefined || typeof valor === "boolean" || String(valor).trim() === "") {
        return false;
      }

      return Number.isFinite(Number(valor));
    }
  }, {
    key: "validarCadenaFecha",
    value: function validarCadenaFecha(valor) {
      // formatos validos (D-M-YYYY , DD-MM-YYYY, YYYY-M-D , YYYY-MM-DD)
      // Solo valida que la cadena cumpla el formato
      var pattern = /^((0?[1-9]|[12]\d|3[01])-(0?[1-9]|1[0-2])-\d{4}|\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01]))$/;
      return pattern.test(valor);
    }
  }, {
    key: "validarFecha",
    value: function validarFecha(valor) {
      // Valida que la fecha como tal sea valida
      var valido = false;

      if (this.validarCadenaFecha(valor)) {
        var dia = NaN,
            mes = NaN,
            anyo = NaN;
        var fechaSeparada = valor.split("-");

        if (fechaSeparada[0].length === 4) {
          var _ref = (_readOnlyError("anyo"), (_readOnlyError("mes"), (_readOnlyError("dia"), fechaSeparada)));

          var _ref2 = _slicedToArray(_ref, 3);

          anyo = _ref2[0];
          mes = _ref2[1];
          dia = _ref2[2];
        } else {
          var _ref3 = (_readOnlyError("anyo"), (_readOnlyError("mes"), (_readOnlyError("dia"), fechaSeparada)));

          var _ref4 = _slicedToArray(_ref3, 3);

          dia = _ref4[0];
          mes = _ref4[1];
          anyo = _ref4[2];
        }

        var fecha = new Date(anyo, mes - 1, dia);

        if (fecha.getMonth() === mes - 1 && fecha.getFullYear() === anyo && fecha.getDate() === dia) {
          valido = true;
        }
      }

      return valido;
    }
  }, {
    key: "validarTitulo",
    value: function validarTitulo(titulo) {
      return typeof titulo === "string" && titulo.length >= 1;
    }
  }, {
    key: "validarNombrePersona",
    value: function validarNombrePersona(nombre) {
      var pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
      return typeof nombre === "string" && nombre.length >= 3 && pattern.test(nombre);
    }
  }, {
    key: "validarDireccion",
    value: function validarDireccion(direccion) {
      return typeof direccion === "string" && direccion.length >= 3;
    }
  }, {
    key: "validarPrecio",
    value: function validarPrecio(precio) {
      return this.validarReal(precio) && precio >= 0;
    }
  }, {
    key: "validarTamanoArchivo",
    value: function validarTamanoArchivo(tamanoArchivo) {
      return this.validarEntero(tamanoArchivo) && tamanoArchivo >= 0;
    }
  }, {
    key: "validarPeso",
    value: function validarPeso(peso) {
      return this.validarEntero(peso) && peso >= 0;
    }
  }, {
    key: "validarStock",
    value: function validarStock(stock) {
      return this.validarEntero(stock) && stock >= 0;
    }
  }, {
    key: "validarDimensiones",
    value: function validarDimensiones(dimensiones) {
      // formatos aceptados("NNxNNxNN")
      var pattern = /^\d{1,2}x\d{1,2}x\d{1,2}$/;
      return pattern.test(dimensiones);
    }
  }, {
    key: "esMesPromocion",
    value: function esMesPromocion(fecha, array_mes_promocion) {
      if (this.validarFecha(fecha)) {
        var aux = new Date(fecha);
        return array_mes_promocion.includes(aux.getMonth());
      }

      return false;
    }
  }, {
    key: "validarFormato",
    value: function validarFormato(formatoLeido, setFormatosValidos) {
      return setFormatosValidos.has(formatoLeido);
    }
  }, {
    key: "validarGenero",
    value: function validarGenero(generoLeido, setGenerosValidos) {
      return setGenerosValidos.has(generoLeido);
    }
  }, {
    key: "validarDiasEnvio",
    value: function validarDiasEnvio(dias) {
      return this.validarEntero(dias) && dias > 0;
    }
    /* Añadidas */

  }, {
    key: "comprobarCadenaVacia",
    value: function comprobarCadenaVacia(entrada) {
      return entrada === null || entrada === "";
    }
  }, {
    key: "validarNombreEnvio",
    value: function validarNombreEnvio(titulo) {
      return typeof titulo === "string" && titulo.length >= 1;
    }
  }, {
    key: "validarDescuento",
    value: function validarDescuento(descuento) {
      return descuento <= 1 && descuento >= 0;
    }
  }]);

  return Util;
}();