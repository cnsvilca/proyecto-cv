/**
 * El metodo obtiene los datos del formulario de contacto 
 * usa el metodo post para enviar los datos a la api jsonplaceholder
 * guarda los datos de la respuesta en LocalStorage
 */
function onClick(event) {
    event.preventDefault();
    const mensaje = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        messaje: document.getElementById('message').value
    }
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(mensaje),
        headers: { "content-type": "application/json; charset=UTF-8" },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            localStorage.setItem("msj", JSON.stringify(json))
            Swal.fire(
                'Enviado correctamente',
                'Gracias',
                'success',
            );
            cleanForm();
        })
        .catch((err) => console.log(err));
}
function cleanForm() {
    let formulario = document.getElementById('formulario');
    formulario.reset();
}
let boton = document.getElementById('boton-enviar');
boton.addEventListener("click", onClick);

/**
 * el metodo obtiene datos aleatorios usando la api randomuser
 * y los muesta en el inicio de la pagina
 */
async function userData() {
    let response = await fetch("https://randomuser.me/api/")
    let datos = await response.json();
    console.log(datos)
    let { cell,dob,location,gender, email, name,phone, picture } = datos.results[0];
    document.getElementById('img-avatar').src = picture.large
    document.getElementById('name-avatar').textContent = "Hola! soy " + name.first + " " + name.last
    document.getElementById('info-email').textContent = "Email: " + email
    document.getElementById('info-cell').textContent = "Celular: " + cell
    document.getElementById('info-age').textContent = "Edad: " + dob.age
    document.getElementById('info-location').textContent = "Pais: " + location.country
    document.getElementById('info-gender').textContent = "Genero: " + gender
    document.getElementById('info-phone').textContent = "Telefono fijo: " + phone
}
userData()