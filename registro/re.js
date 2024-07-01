document.addEventListener("DOMContentLoaded", function() {
    let usuarios = obtenerUsuariosLocalStorage();
    let contadorUsuarios = usuarios.length;

    const busquedaInput = document.getElementById('busqueda');
    busquedaInput.addEventListener('input', filtrarUsuarios);

    fetch('https://reqres.in/api/users/')
        .then(response => response.json())
        .then(data => {
            renderizarUsuarios(data.data);
        })
        .catch(error => console.error('Error fetching users:', error));

    function filtrarUsuarios() {
        const textoBusqueda = busquedaInput.value.toLowerCase();
        const usuariosFiltrados = usuarios.filter(usuario => 
            `${usuario.nombre}`.toLowerCase().includes(textoBusqueda)
        );
        mostrarUsuariosFiltrados(usuariosFiltrados);
    }

    function renderizarUsuarios(listaUsuarios) {
        const contenedorUsuarios = document.getElementById('contenedorUsuarios');
        contenedorUsuarios.innerHTML = '';

        listaUsuarios.forEach(usuario => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');

            const nombre = document.createElement('h3');
            nombre.textContent = `${usuario.first_name} ${usuario.last_name}`;
            nombre.addEventListener('click', () => alert(`Seleccionaste a ${usuario.first_name} ${usuario.last_name}`));

            const correo = document.createElement('p');
            correo.textContent = `Correo: ${usuario.email}`;

            const imagen = document.createElement('img');
            imagen.src = usuario.avatar;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('elim');
            botonEliminar.addEventListener('click', () => {
                if (confirm(`¿Estás seguro de eliminar a ${usuario.first_name}?`)) {
                    userCard.remove();
                    eliminarUsuario(usuario.email);
                }
            });

            const botonActualizar = document.createElement('button');
            botonActualizar.textContent = 'Actualizar';
            botonActualizar.classList.add('act');
            botonActualizar.addEventListener('click', () => {
                const nuevoNombre = prompt('Ingresa el nuevo nombre:');
                if (nuevoNombre) {
                    usuario.first_name = nuevoNombre;
                    guardarUsuariosLocalStorage();
                    renderizarUsuarios(listaUsuarios);
                }
            });

            userCard.appendChild(nombre);
            userCard.appendChild(correo);
            userCard.appendChild(imagen);
            userCard.appendChild(botonActualizar);
            userCard.appendChild(botonEliminar);
            contenedorUsuarios.appendChild(userCard);
        });
    }

    function obtenerUsuariosLocalStorage() {
        const usuariosJSON = localStorage.getItem('usuarios');
        return usuariosJSON ? JSON.parse(usuariosJSON) : [];
    }

    function guardarUsuariosLocalStorage() {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    window.agregarUsuario = function() {
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!nombre || !email) {
            alert('Por favor completa todos los campos.');
            return;
        }

        if (usuarios.some(usuario => usuario.email === email)) {
            alert('El correo electrónico ya está registrado.');
            return;
        }

        usuarios.push({ nombre, email });
        guardarUsuariosLocalStorage();
        contadorUsuarios++;
        mostrarUsuarios();
        document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
    };

    window.limpiarUsuarios = function() {
        if (confirm('¿Estás seguro de limpiar todos los usuarios?')) {
            usuarios = [];
            guardarUsuariosLocalStorage();
            contadorUsuarios = 0;
            mostrarUsuarios();
        }
    };

    function mostrarUsuarios() {
        const container = document.getElementById('usuariosContainer');
        container.innerHTML = '';

        usuarios.forEach(usuario => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            userCard.innerHTML = `
                <h3>${usuario.nombre}</h3>
                <p>Correo: ${usuario.email}</p>
                <img class="perf" src="Perf.png" title="${usuario.nombre}">
                <button class="act" onclick="actualizarUsuario('${usuario.email}')">Actualizar</button>
                <button class="elim" onclick="eliminarUsuario('${usuario.email}')">Eliminar</button>
            `;
            container.appendChild(userCard);
        });

        actualizarContador();
        mostrarOcultarMensaje();
    }

    function mostrarUsuariosFiltrados(usuariosFiltrados) {
        const container = document.getElementById('usuariosContainer');
        container.innerHTML = '';

        usuariosFiltrados.forEach(usuario => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            userCard.innerHTML = `
                <h3>${usuario.nombre}</h3>
                <p>Correo: ${usuario.email}</p>
                <img class="perf" src="Perf.png" title="${usuario.nombre}">
                <button class="act" onclick="actualizarUsuario('${usuario.email}')">Actualizar</button>
                <button class="elim" onclick="eliminarUsuario('${usuario.email}')">Eliminar</button>
            `;
            container.appendChild(userCard);
        });
    }

    function actualizarUsuario(email) {
        const nuevoNombre = prompt('Ingresa el nuevo nombre:');
        if (nuevoNombre) {
            usuarios = usuarios.map(usuario => {
                if (usuario.email === email) {
                    usuario.nombre = nuevoNombre;
                }
                return usuario;
            });
            guardarUsuariosLocalStorage();
            mostrarUsuarios();
        }
    }

    function eliminarUsuario(email) {
        usuarios = usuarios.filter(usuario => usuario.email !== email);
        guardarUsuariosLocalStorage();
        contadorUsuarios--;
        mostrarUsuarios();
    }

    function actualizarContador() {
        const contadorElemento = document.getElementById('contadorUsuarios');
        contadorElemento.textContent = contadorUsuarios;
    }

    function mostrarOcultarMensaje() {
        const mensajeUsuarios = document.getElementById('mensajeUsuariosAgregados');
        mensajeUsuarios.style.display = contadorUsuarios > 0 ? 'block' : 'none';
    }

});
