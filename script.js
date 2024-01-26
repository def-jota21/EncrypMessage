
document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del DOM
    var txtMensajeEncriptar = document.getElementById("txtMensajeEncriptar");
    var txtClaveEncriptar = document.getElementById("txtClaveEncriptar");
    var btnEncriptar = document.querySelector(".btn-success");
    var txtEncriptado = document.getElementById("txtEncriptado");

    var txtMensajeDesencriptar = document.getElementById("txtMensajeDesencriptar");
    var txtClaveDesencriptar = document.getElementById("txtClaveDesencriptar");
    var btnDesencriptar = document.querySelector(".btn-warning");
    var txtDesencriptado = document.getElementById("txtDesencriptado");

    function validarClave(clave) {
        
        if (clave.length < 8 || clave.length > 20) {
            alert("La clave debe tener entre 8 y 20 caracteres.");
            return false;
        }

        var formatoClave = /^[a-zA-Z0-9]+$/;
        if (!formatoClave.test(clave)) {
            alert("La clave debe contener solo letras y números.");
            return false;
        }

        return true;
    }
    // Evento de clic para encriptar
    btnEncriptar.addEventListener("click", function () {
        var mensaje = txtMensajeEncriptar.value;
        var clave = txtClaveEncriptar.value;
        if (validarClave(clave)) {
             
            var mensajeEncriptado = encriptarMensaje(mensaje, clave);
            txtEncriptado.value = mensajeEncriptado;
        }    
       
    });

    // Evento de clic para desencriptar
    btnDesencriptar.addEventListener("click", function () {
        var mensajeEncriptado = txtMensajeDesencriptar.value;
        var claveDesencriptar = txtClaveDesencriptar.value;
        
        if (validarClave(claveDesencriptar)) {
            
            var mensajeDesencriptado = desencriptarMensaje(mensajeEncriptado, claveDesencriptar);
            txtDesencriptado.value = mensajeDesencriptado;
        }  
        
    });
    // Evento de clic para generar clave
    document.getElementById("btnGenerarClave").addEventListener("click", function () {
        var claveAleatoria = generarClaveAleatoria();
        document.getElementById("txtClaveEncriptar").value = claveAleatoria;
    });

    // Función para generar una clave aleatoria
    function generarClaveAleatoria() {
        var longitud = 16; 
        var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var clave = "";

        for (var i = 0; i < longitud; i++) {
            var indice = Math.floor(Math.random() * caracteres.length);
            clave += caracteres.charAt(indice);
        }

        return clave;
    }

    // Función para encriptar mensaje
    function encriptarMensaje(mensaje, clave) {
        
        var claveBytes = CryptoJS.enc.Utf8.parse(clave);
        var mensajeBytes = CryptoJS.enc.Utf8.parse(mensaje);

        var encrypted = CryptoJS.AES.encrypt(mensajeBytes, claveBytes, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        var mensajeEncriptado = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
        return mensajeEncriptado;
    }

    // Función para desencriptar mensaje
    function desencriptarMensaje(mensajeEncriptado, claveDesencriptar) {
        try {
            var claveBytes = CryptoJS.enc.Utf8.parse(claveDesencriptar);

            var mensajeBytes = CryptoJS.enc.Base64.parse(mensajeEncriptado);
            var cifrado = { ciphertext: mensajeBytes };

            var decrypted = CryptoJS.AES.decrypt(cifrado, claveBytes, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            
            var mensajeDesencriptado = CryptoJS.enc.Utf8.stringify(decrypted);
            document.getElementById("txtDesencriptado").value = mensajeDesencriptado;

            return mensajeDesencriptado;
        } catch (error) {
            console.error("Error durante la desencriptación:", error.message);
            alert("Error al desencriptar el mensaje. Verifica la clave y el formato del mensaje encriptado.");
            return null;
        }
    }
});
