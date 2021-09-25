# Proyecto-Modular

Instalacion

- Descargar e instalar nodejs v13.9.0^
- Ejecutar comando ``` npm install ``` en linea de comandos
- Correr base de datos
- Adaptar el archivo /config/config.json para la conexion a base de datos
- Ejecutar ``` sequelize-cli db:migrate ``` 
- Ejecutar ``` npm start ```

Interactuar desde algun API tester como [Postman](https://www.postman.com/)

Por defecto se usara el puerto **8000**

## Lista de rutas validas

Todas las rutas mostradas a continuacion se les antecede el host (http://localhost:8000)

### Empresas
- **Metodo:** post **Ruta:** /empresas/ ``` Crear empresa ``` 
  
- **Metodo:** get **Ruta:** /empresas/ ``` Recuperar todas las empresas ``` 

- **Metodo:** get **Ruta:** /empresas/:id/formularios/ ``` Recuperar el formulario de una empresa ``` 

- **Metodo:** get **Ruta:** /empresas/:id/inspecciones/ ``` Recuperar todas las inspecciones de una empresa ``` 

- **Metodo:** get **Ruta:** /empresas/:id ``` Recuperar una sola empresa ``` 

- **Metodo:** put **Ruta:** /empresas/:id ``` Actualizar una empresa por el id ``` 

- **Metodo:** delete **Ruta:** /empresas/:id ``` Eliminar una empresa por id ``` 

- **Metodo:** delete **Ruta:** /empresas/ ``` Eliminar todas las empresas ``` 


### Formularios
- **Metodo:** post **Ruta:** /formularios/ ``` Crear formulario ``` 
  
- **Metodo:** get **Ruta:** /formularios/ ``` Recuperar todos los formularios ``` 

- **Metodo:** get **Ruta:** /formularios/:id/empresa/ ``` Recuperar la empresa de un formulario ``` 

- **Metodo:** get **Ruta:** /formularios/:id ``` Recuperar un solo formulario ``` 

- **Metodo:** put **Ruta:** /formularios/:id ``` Actualizar un formulario por el id ``` 

- **Metodo:** delete **Ruta:** /formularios/:id ``` Eliminar un formulario por id ``` 

- **Metodo:** delete **Ruta:** /formularios/ ``` Eliminar todos los formularios ``` 


### Inspecciones
- **Metodo:** post **Ruta:** /inspecciones/ ``` Crear inspeccion ``` 
  
- **Metodo:** get **Ruta:** /inspecciones/ ``` Recuperar todas las inspecciones ``` 

- **Metodo:** get **Ruta:** /inspecciones/:id/empresa/ ``` Recuperar la empresa de un inspeccion ``` 

- **Metodo:** get **Ruta:** /inspecciones/:id ``` Recuperar una sola inspeccion ``` 

- **Metodo:** put **Ruta:** /inspecciones/:id ``` Actualizar una inspeccion por el id ``` 

- **Metodo:** delete **Ruta:** /inspecciones/:id ``` Eliminar una inspeccion por id ``` 

- **Metodo:** delete **Ruta:** /formularios/ ``` Eliminar todas las inspecciones ``` 
