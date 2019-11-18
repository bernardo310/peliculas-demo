const agregarProtagonista = document.getElementById("agregar-protagonista");
agregarProtagonista.addEventListener("click", () => {
    document.getElementById('agregar-protagonista').insertAdjacentHTML('beforebegin', `
     <div class="protBorrar row">
     <label class="col span-1-of-3 for="protagonistas">&nbsp;</label>
     <input class="col span-2-of-3 type="text" id="protagonistas" name="protagonistas" maxlength="30">
 </div>
     `);
});
