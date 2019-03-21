//Paquetes:
var azure = require('azure-storage');

//Crear conexión:
var azure2 = require('./keys_azure'); //Importación de llaves
var tableSvc = azure.createTableService(azure2.myaccount, azure2.myaccesskey);

//Query:
var query = new azure.TableQuery();
var nextContinuationToken = null;

//Tabla origen:
var tablaUsar = "botdyesatb02"

//Variables:
var contador = 0;
var finalizar = false;
var task = {
    PartitionKey: { '_': '' },
    RowKey: { '_': '' },
    Timestamp: { '_': '' },
    Area: { '_': '' },
    Baja: { '_': '' },
    Borrado: { '_': '' },
    Check: { '_': '' },
    Descripcion: { '_': '' },
    Fecha_Fact: { '_': '' },
    Fecha_Fin: { '_': '' },
    Fecha_ini: { '_': '' },
    HojaDeServicio: { '_': '' },
    Inmueble: { '_': '' },
    Localidad: { '_': '' },
    No_Fact: { '_': '' },
    NombreEnlace: { '_': '' },
    NombreUsuario: { '_': '' },
    Pospuesto: { '_': '' },
    Proyecto: { '_': '' },
    Resguardo: { '_': '' },
    SerieBorrada: { '_': '' },
    Servicio: { '_': '' },
    Status: { '_': '' },
};

//Programa
async function working() {
    //Bucle:
    do {
        await promesa();
    } while (finalizar == false);
    resultado();
}

function promesa() {
    return new Promise(function(resolve, reject) { //Promesa 1
        tableSvc.queryEntities(tablaUsar, query, nextContinuationToken, function(error, results, response) {
            if (!error) {
                //Recorrido por row:
                //console.log(results);
                results.entries.forEach(function(entry) {

                    //Se obtiene la información en un json valor por valor en caso de no existir alguno:
                    task['PartitionKey']['_'] = entry['PartitionKey']['_']; //---- 1
                    task['RowKey']['_'] = entry['RowKey']['_']; //---- 2
                    task['Timestamp']['_'] = entry['Timestamp']['_']; //---- 3
                    //----------- 4
                    if (entry['Area'] == undefined) {
                        task['Area']['_'] = "";
                    } else {
                        task['Area']['_'] = entry['Area']['_'];
                    }
                    //----------- 5
                    if (entry['Baja'] == undefined) {
                        task['Baja']['_'] = "";
                    } else {
                        task['Baja']['_'] = entry['Baja']['_'];
                    }
                    //----------- 6
                    if (entry['Borrado'] == undefined) {
                        task['Borrado']['_'] = "";
                    } else {
                        task['Borrado']['_'] = entry['Borrado']['_'];
                    }
                    //----------- 7
                    if (entry['Check'] == undefined) {
                        task['Check']['_'] = "";
                    } else {
                        task['Check']['_'] = entry['Check']['_'];
                    }
                    //----------- 8
                    if (entry['Descripcion'] == undefined) {
                        task['Descripcion']['_'] = "";
                    } else {
                        task['Descripcion']['_'] = entry['Descripcion']['_'];
                    }
                    //----------- 9
                    if (entry['Fecha_Fact'] == undefined) {
                        task['Fecha_Fact']['_'] = "";
                    } else {
                        task['Fecha_Fact']['_'] = entry['Fecha_Fact']['_'];
                    }
                    //----------- 10
                    if (entry['Fecha_Fin'] == undefined) {
                        task['Fecha_Fin']['_'] = "";
                    } else {
                        task['Fecha_Fin']['_'] = entry['Fecha_Fin']['_'];
                    }
                    //----------- 11
                    if (entry['Fecha_ini'] == undefined) {
                        task['Fecha_ini']['_'] = "";
                    } else {
                        task['Fecha_ini']['_'] = entry['Fecha_ini']['_'];
                    }
                    //----------- 12
                    if (entry['HojaDeServicio'] == undefined) {
                        task['HojaDeServicio']['_'] = "";
                    } else {
                        task['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                    }
                    //----------- 13
                    if (entry['Inmueble'] == undefined) {
                        task['Inmueble']['_'] = "";
                    } else {
                        task['Inmueble']['_'] = entry['Inmueble']['_'];
                    }
                    //----------- 14
                    if (entry['Localidad'] == undefined) {
                        task['Localidad']['_'] = "";
                    } else {
                        task['Localidad']['_'] = entry['Localidad']['_'];
                    }
                    //----------- 15
                    if (entry['No_Fact'] == undefined) {
                        task['No_Fact']['_'] = "";
                    } else {
                        task['No_Fact']['_'] = entry['No_Fact']['_'];
                    }
                    //----------- 16
                    if (entry['NombreEnlace'] == undefined) {
                        task['NombreEnlace']['_'] = "";
                    } else {
                        task['NombreEnlace']['_'] = entry['NombreEnlace']['_'];
                    }
                    //----------- 17
                    if (entry['NombreUsuario'] == undefined) {
                        task['NombreUsuario']['_'] = "";
                    } else {
                        task['NombreUsuario']['_'] = entry['NombreUsuario']['_'];
                    }
                    //----------- 18
                    if (entry['Pospuesto'] == undefined) {
                        task['Pospuesto']['_'] = "";
                    } else {
                        task['Pospuesto']['_'] = entry['Pospuesto']['_'];
                    }
                    //----------- 19
                    if (entry['Proyecto'] == undefined) {
                        task['Proyecto']['_'] = "";
                    } else {
                        task['Proyecto']['_'] = entry['Proyecto']['_'];
                    }
                    //----------- 20
                    if (entry['Resguardo'] == undefined) {
                        task['Resguardo']['_'] = "";
                    } else {
                        task['Resguardo']['_'] = entry['Resguardo']['_'];
                    }
                    //----------- 21
                    if (entry['SerieBorrada'] == undefined) {
                        task['SerieBorrada']['_'] = "";
                    } else {
                        task['SerieBorrada']['_'] = entry['SerieBorrada']['_'];
                    }
                    //----------- 22
                    if (entry['Servicio'] == undefined) {
                        task['Servicio']['_'] = "";
                    } else {
                        task['Servicio']['_'] = entry['Servicio']['_'];
                    }
                    //----------- 23
                    if (entry['Status'] == undefined) {
                        task['Status']['_'] = "";
                    } else {
                        task['Status']['_'] = entry['Status']['_'];
                    }

                    tableSvc.replaceEntity(tablaUsar, task, function(error, result, response) {
                        if (!error) {
                            console.log("Entidad remplazada correctamente.");
                        }
                    });

                    contador++;
                });
            }

            //Token que permite continuar despues de leer 1000 rows:
            if (results.continuationToken) {
                nextContinuationToken = results.continuationToken;
                //numeroBucle++;
                resolve();
            } else {
                //numeroBucle = numeroBucle + 30000;
                finalizar = true;
                resolve();
            }
        });
    });
}

//Funcion que se ejecuta el final del programa:
function resultado() {
    console.log(`Se eliminarion todos los nulls de ${contador} entidades.`);
}

//Inicia el trabajo:
working();