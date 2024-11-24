const authDasboardCntr = (name, obj) => {
    const template = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name}</title>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <nav>
                <a href="/dashboard">Inicio</a>
                <a href="/dashboard/new">Nuevo Producto</a>
            </nav>
            <main>
                <h1>${name}</h1>
                <ul>
                    ${obj.map(product => `
                        <li>
                            <h2>${product.name}</h2>
                            <img src="${product.image}" alt="${product.name}" />
                            <a href="/dashboard/${product._id}">Ver más</a>
                        </li>
                    `).join("")}
                </ul>
            </main>
        </body>
        </html>
    `;
    return template;
};

module.exports = { authDasboardCntr };
