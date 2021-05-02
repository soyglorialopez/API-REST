### API REST

_Una API REST en la cual cuenta con tres principales endepoints;_  <br> 
_users_  <br> 
_posts_  <br> 
_comments_  <br> 
_en cada uno de estos enpodpoints se podrá hacer los verbos;_ <br> 
_GET, POST, PUT, PATCH, DELETE_  <br> 

#### LINKS
* Postman collection: 
    <small><strong>Podrás ver la collección o importarla</strong></small><br> 
https://app.getpostman.com/run-collection/11209189-ee3021f5-6a9d-4804-bb22-97bbc696a6c0?action=collection%2Ffork&collection-url=entityId%3D11209189-ee3021f5-6a9d-4804-bb22-97bbc696a6c0%26entityType%3Dcollection%26workspaceId%3D8dce8d7c-f96c-43e8-977d-d503ff0f9911
* Documentación en Swagger: <br> 
https://app.swaggerhub.com/apis/soyglorialopez/api-rest/1.0.0

### Cómo esta creado la API🔧
Para la creación de esta api, se utilizó la api https://jsonplaceholder.typicode.com/ para obtener los datos y hacerle cambios a los mismos.<br>
La api cuenta con test en la mayoria de los endpoint en postman collection

<br>

 * <strong> Dependecias</strong> <br>
  * "javaScript":  Lenguaje principal  <br>
   * "express":  Framework principal  <br>
   * "node-fetch": Para hacer llamados http<br>
   * "jsonwebtoken": Para los token de autenticación <br>
 
<br>

### Pre-requisitos 📋

* Tener instalado Node y algún cliente http<br>


<br>  

## Guia 🚀

_Estas instrucciones te permitirán obtener una copia de la api en funcionamiento en tu máquina local para propósitos pruebas._

* Clonar el proyecto ``` https://github.com/soyglorialopez/API-REST.git```
* Instalar las dependecias ``` npm init ```
* Crear una contraseña que será como una llave que utilizará JWT <br>
   * en el archivo index en la carpeta config
   * en el objeto jwtConfig
   * o pasarlo como variable de entorno con el nombre que se <br> encuentra en    el mismo objeto  jwtConfig




<br>

## Despliegue 📦

```
npm run start 
```

