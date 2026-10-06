# Documentación de Pruebas de Transición de Estado (Task 02)

En esta tarea se han implementado pruebas unitarias para validar las transiciones de estado dentro del flujo de [recuperación de contraseñas](/backend/tests/auth.test.js)

## Framework y Mocks Utilizados
- Framework Principal: Jest
- Mocks: jest.mock
- Dependencias Mockeadas: bcryptjs, jsonwebtoken, y el modelo User de Sequelize

## Cobertura de las Pruebas

1 El estado inicial es el correcto:
   - Se valida que un usuario nuevo o sin peticiones de recuperación tiene los atributos de estado resetToken y resetTokenExpires en null

2 La acción realiza la transición esperada:
   - Se verifica que al ejecutar el método forgotPassword, el usuario transiciona hacia el estado de recuperación, generando y guardando un nuevo token de recuperación temporal en su modelo

3 Una transición inválida se rechaza:
   - Al intentar finalizar la transición ejecutando resetPassword con un token inválido o no encontrado, la acción es rechazada y levanta una excepción HttpError (400)

4 Los demás datos del elemento se conservan:
   - Al ejecutar una transición exitosa con resetPassword, el estado de los tokens vuelve a null y el password cambia, pero se verifica explícitamente que los demás campos como name e email continúan intactos



## Ejecución de Pruebas

Para correr las pruebas:
```bash
npm run test
```

Para ver la estadística de cobertura:
```bash
npm run test:coverage
```
