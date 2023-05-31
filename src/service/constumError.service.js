<<<<<<< HEAD
export class CustomError {
  static createError({ name = "Error", cause, message, errorCode }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = errorCode;
    console.log("error", error.cause);
    throw error;
  }
}

export const generateUserErrorInfo = (product) => {
  if (!product.title) {
    return `
    Alguno de los campos para agregar el nuevo producto no fue válido.
    Lista de campos requeridos:
    Title
    Price.
    En su caso:
    Title: debe ser un campo de tipo String. Se recibio: ${product.title}, 
    `;
  } else if (!product.price) {
    return `
    Alguno de los campos para agregar el nuevo producto no fue válido.
    Lista de campos requeridos:
    Title
    Price.
    En su caso:
    Price: debe ser un campo de tipo Number. Se recibio: ${product.price},
    `;
  }
};
=======
export class CustomError {
  static createError({ name = "Error", cause, message, errorCode }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = errorCode;
    console.log("error", error.cause);
    throw error;
  }
}

export const generateUserErrorInfo = (product) => {
  if (!product.title) {
    return `
    Alguno de los campos para agregar el nuevo producto no fue válido.
    Lista de campos requeridos:
    Title
    Price.
    En su caso:
    Title: debe ser un campo de tipo String. Se recibio: ${product.title}, 
    `;
  } else if (!product.price) {
    return `
    Alguno de los campos para agregar el nuevo producto no fue válido.
    Lista de campos requeridos:
    Title
    Price.
    En su caso:
    Price: debe ser un campo de tipo Number. Se recibio: ${product.price},
    `;
  }
};
>>>>>>> 30f199008ec74a8bf280b47cdbb52c0d387c238b
