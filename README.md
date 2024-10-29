
#Instalación y Uso del Proyecto
     
     git clone <link>

1. Navegar a la Carpeta del Proyecto
Abre una terminal y navega hasta la carpeta del proyecto utilizando el siguiente comando:

        cd nombre-de-la-carpeta

Asegúrate de reemplazar nombre-de-la-carpeta con el nombre real de la carpeta donde se encuentra tu proyecto.

2. Instalar Dependencias
Si no tienes las dependencias instaladas, ejecuta el siguiente comando para instalarlas(regulamente es node):

         npm install


3. Instalar bcryptjs
Para la encriptación de contraseñas, debes instalar bcryptjs. Ejecuta el siguiente comando:

        npm install bcryptjs

Uso del Proyecto
Para ejecutar el proyecto, utiliza el siguiente comando:

          ng server

Esto iniciará el servidor de desarrollo y abrirá automáticamente el navegador en http://localhost:4200/.

Ejecutar JsonServer
Para ejecutar json-server, utiliza el siguiente comando:

      json-server --watch db.json

Esto iniciará json-server y utilizará el archivo db.json como tu base de datos simulada.
