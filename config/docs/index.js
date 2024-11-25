module.exports = {
    openapi: "3.0.0",
    info: {
      title: "API de Proyecto Final",
      version: "1.0.0",
      description: "Documentación de la API para el Proyecto Final - Backend.",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor local",
      },
    ],
    paths: {
      "/api/products": {
        get: {
          summary: "Obtener todos los productos",
          description: "Devuelve una lista de todos los productos disponibles.",
          responses: {
            200: {
              description: "Lista de productos obtenida con éxito",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        price: { type: "number" },
                        category: { type: "string" },
                        stock: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Error interno del servidor",
            },
          },
        },
        post: {
          summary: "Crear un nuevo producto",
          description: "Permite agregar un nuevo producto al inventario.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    price: { type: "number" },
                    category: { type: "string" },
                    stock: { type: "number" },
                  },
                  required: ["name", "price", "category", "stock"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Producto creado con éxito",
            },
            400: {
              description: "Solicitud incorrecta",
            },
            500: {
              description: "Error interno del servidor",
            },
          },
        },
      },
      "/api/products/{id}": {
        get: {
          summary: "Obtener un producto por ID",
          description: "Devuelve la información de un producto específico.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID del producto",
            },
          ],
          responses: {
            200: {
              description: "Producto encontrado",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      price: { type: "number" },
                      category: { type: "string" },
                      stock: { type: "number" },
                    },
                  },
                },
              },
            },
            404: {
              description: "Producto no encontrado",
            },
            500: {
              description: "Error interno del servidor",
            },
          },
        },
        delete: {
          summary: "Eliminar un producto",
          description: "Elimina un producto del inventario.",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID del producto",
            },
          ],
          responses: {
            200: {
              description: "Producto eliminado con éxito",
            },
            404: {
              description: "Producto no encontrado",
            },
            500: {
              description: "Error interno del servidor",
            },
          },
        },
      },
    },
  };