//Paquetes:
var azure = require('azure-storage');

//Crear conexión:
var azure2 = require('./keys_azure'); //Importación de llaves
var tableSvc = azure.createTableService(azure2.myaccount, azure2.myaccesskey);

//Tabla origen:
var tablaUsar = "botdyesatb02"

var proyectoTrabajando = "OperacionInterna";
var bajaExiste = "X";
var borradoExiste = "";
var checkExiste = "X";
var resguardoExiste = "X";
var hojaDeServicioExiste = "";
var contadorX = 0;

var taskBlanco = {
    PartitionKey: { '_': '' },
    RowKey: { '_': '' },
    Timestamp: { '_': '' },
    Area: { '_': '' },
    Baja: { '_': '' },
    Borrado: { '_': '' },
    Check: { '_': '' },
    Descripcion: { '_': '' },
    Fecha_Fin: { '_': '' },
    Fecha_ini: { '_': '' },
    HojaDeServicio: { '_': '' },
    Inmueble: { '_': '' },
    Localidad: { '_': '' },
    NombreEnlace: { '_': '' },
    NombreUsuario: { '_': '' },
    Pospuesto: { '_': '' },
    Proyecto: { '_': '' },
    Resguardo: { '_': '' },
    SerieBorrada: { '_': '' },
    Servicio: { '_': '' },
    Status: { '_': '' },
    Fecha_Fact: { '_': '' },
    No_Fact: { '_': '' },
};

var updateTaskTabla2 = {
    PartitionKey: { '_': '' },
    RowKey: { '_': '' },
    Timestamp: { '_': '' },
    Area: { '_': '' },
    Baja: { '_': '' },
    Borrado: { '_': '' },
    Check: { '_': '' },
    Descripcion: { '_': '' },
    Fecha_Fin: { '_': '' },
    Fecha_ini: { '_': '' },
    HojaDeServicio: { '_': '' },
    Inmueble: { '_': '' },
    Localidad: { '_': '' },
    NombreEnlace: { '_': '' },
    NombreUsuario: { '_': '' },
    Pospuesto: { '_': '' },
    Proyecto: { '_': '' },
    Resguardo: { '_': '' },
    SerieBorrada: { '_': '' },
    Servicio: { '_': '' },
    Status: { '_': '' },
    Fecha_Fact: { '_': '' },
    No_Fact: { '_': '' },
};

//JSON tabla4:
var tablaUsar4 = "botdyesatb04"
var taskTabla4 = {
    PartitionKey: { '_': 'Proyecto' },
    RowKey: { '_': 'NombreProyecto' },
    Timestamp: { '_': '' },
    NumDoc: { '_': 0 },
    Baja: { '_': '' },
    Borrado: { '_': '' },
    Check: { '_': '' },
    Resguardo: { '_': '' },
    HojaDeServicio: { '_': '' },
};

//JSON tabla5:
var tablaUsar5 = "botdyesatb05"
var taskTabla5 = {
    PartitionKey: { '_': 'Proyecto' },
    RowKey: { '_': 'Serie' },
    Timestamp: { '_': '' },
    Baja: { '_': '' },
    Borrado: { '_': '' },
    Check: { '_': '' },
    Resguardo: { '_': '' },
    HojaDeServicio: { '_': '' },
    Status: { '_': '' }
};

//Query:
var query = new azure.TableQuery();
var nextContinuationToken = null;
var numeroBucle = 1;
var tiempo = 15000;

//Contador:
var aceptCount = 0;
var proyectoCount = 0;
var count5 = 0;
var count4 = 0;
var count3 = 0;
var count2 = 0;
var count1 = 0;
var count0 = 0;
var total = 0;

//Celda nueva trabajando:
var celdaActual = 1;


//Trabajo promesa:
function promesaWork() {

    //Contador de X:
    if (bajaExiste == "X") {
        contadorX++;
    }
    if (borradoExiste == "X") {
        contadorX++;
    }
    if (checkExiste == "X") {
        contadorX++;
    }
    if (resguardoExiste == "X") {
        contadorX++;
    }
    if (hojaDeServicioExiste == "X") {
        contadorX++;
    }


    return new Promise(function(resolve, reject) { //Promesa 1
        tableSvc.queryEntities(tablaUsar, query, null, function(error, results, response) {
            if (!error) {
                //Recorrido por row:
                //console.log(results);
                results.entries.forEach(function(entry) {

                    updateTaskTabla2 = entry;

                    //Corregir tabla2:
                    /*
                    tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                        if (!error) {
                            console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                        }
                    });*/

                    //Logica por row:
                    aceptCount = 0;
                    //console.log(`${entry['RowKey']['_']}`);
                    if (entry['Baja']['_'] == "Aprobado" && bajaExiste == "X") {
                        aceptCount++;
                    }
                    if (entry['Borrado']['_'] == "Aprobado" && borradoExiste == "X") {
                        aceptCount++;
                    }
                    if (entry['Check']['_'] == "Aprobado" && checkExiste == "X") {
                        aceptCount++;
                    }
                    if (entry['Resguardo']['_'] == "Aprobado" && resguardoExiste == "X") {
                        aceptCount++;
                    }
                    if (entry['HojaDeServicio']['_'] == "Aprobado" && hojaDeServicioExiste == "X") {
                        aceptCount++;
                    }

                    console.log(`Aceptados: ${aceptCount}`);
                    if (aceptCount == 5) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count5++;
                    } else if (aceptCount == 4) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count4++;
                    } else if (aceptCount == 3) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count3++;
                    } else if (aceptCount == 2) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count2++;
                    } else if (aceptCount == 1) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count1++;
                    } else if (aceptCount == 0) {
                        count0++;
                    }
                });
            }

            //Token que permite continuar despues de leer 1000 rows:
            if (results.continuationToken) {
                nextContinuationToken = results.continuationToken;
                resolve();
            } else {
                return;
            }
        });
    }).then(() => {
        return new Promise(async function(resolve, reject) { //Promesa 2
            var continuar = bucleQuery();
            setTimeout(function() {
                if (continuar != false) {
                    resolve();
                } else {
                    resultado();
                }
                numeroBucle++;
                console.log(`Bucle numero: ${numeroBucle}`);
            }, tiempo);
        }).then(() => {
            return new Promise(async function(resolve, reject) { //Promesa 3
                var continuar = bucleQuery();
                setTimeout(function() {
                    if (continuar != false) {
                        resolve();
                    } else {
                        resultado();
                    }
                    numeroBucle++;
                    console.log(`Bucle numero: ${numeroBucle}`);
                }, tiempo);
            }).then(() => {
                return new Promise(async function(resolve, reject) { //Promesa 4
                    var continuar = bucleQuery();
                    setTimeout(function() {
                        if (continuar != false) {
                            resolve();
                        } else {
                            resultado();
                        }
                        numeroBucle++;
                        console.log(`Bucle numero: ${numeroBucle}`);
                    }, tiempo);
                }).then(() => {
                    return new Promise(async function(resolve, reject) { //Promesa 5
                        var continuar = bucleQuery();
                        setTimeout(function() {
                            if (continuar != false) {
                                resolve();
                            } else {
                                resultado();
                            }
                            numeroBucle++;
                            console.log(`Bucle numero: ${numeroBucle}`);
                        }, tiempo);
                    }).then(() => {
                        return new Promise(async function(resolve, reject) { //Promesa 6
                            var continuar = bucleQuery();
                            setTimeout(function() {
                                if (continuar != false) {
                                    resolve();
                                } else {
                                    resultado();
                                }
                                numeroBucle++;
                                console.log(`Bucle numero: ${numeroBucle}`);
                            }, tiempo);
                        }).then(() => {
                            return new Promise(async function(resolve, reject) { //Promesa 7
                                var continuar = bucleQuery();
                                setTimeout(function() {
                                    if (continuar != false) {
                                        resolve();
                                    } else {
                                        resultado();
                                    }
                                    numeroBucle++;
                                    console.log(`Bucle numero: ${numeroBucle}`);
                                }, tiempo);
                            }).then(() => {
                                return new Promise(async function(resolve, reject) { //Promesa 8
                                    var continuar = bucleQuery();
                                    setTimeout(function() {
                                        if (continuar != false) {
                                            resolve();
                                        } else {
                                            resultado();
                                        }
                                        numeroBucle++;
                                        console.log(`Bucle numero: ${numeroBucle}`);
                                    }, tiempo);
                                }).then(() => {
                                    return new Promise(async function(resolve, reject) { //Promesa 9
                                        var continuar = bucleQuery();
                                        setTimeout(function() {
                                            if (continuar != false) {
                                                resolve();
                                            } else {
                                                resultado();
                                            }
                                            numeroBucle++;
                                            console.log(`Bucle numero: ${numeroBucle}`);
                                        }, tiempo);
                                    }).then(() => {
                                        return new Promise(async function(resolve, reject) { //Promesa 10
                                            var continuar = bucleQuery();
                                            setTimeout(function() {
                                                if (continuar != false) {
                                                    resolve();
                                                } else {
                                                    resultado();
                                                }
                                                numeroBucle++;
                                                console.log(`Bucle numero: ${numeroBucle}`);
                                            }, tiempo);
                                        }).then(() => {
                                            return new Promise(async function(resolve, reject) { //Promesa 11
                                                var continuar = bucleQuery();
                                                setTimeout(function() {
                                                    if (continuar != false) {
                                                        resolve();
                                                    } else {
                                                        resultado();
                                                    }
                                                    numeroBucle++;
                                                    console.log(`Bucle numero: ${numeroBucle}`);
                                                }, tiempo);
                                            }).then(() => {
                                                return new Promise(async function(resolve, reject) { //Promesa 12
                                                    var continuar = bucleQuery();
                                                    setTimeout(function() {
                                                        if (continuar != false) {
                                                            resolve();
                                                        } else {
                                                            resultado();
                                                        }
                                                        numeroBucle++;
                                                        console.log(`Bucle numero: ${numeroBucle}`);
                                                    }, tiempo);
                                                }).then(() => {
                                                    return new Promise(async function(resolve, reject) { //Promesa 13
                                                        var continuar = bucleQuery();
                                                        setTimeout(function() {
                                                            if (continuar != false) {
                                                                resolve();
                                                            } else {
                                                                resultado();
                                                            }
                                                            numeroBucle++;
                                                            console.log(`Bucle numero: ${numeroBucle}`);
                                                        }, tiempo);
                                                    }).then(() => {
                                                        return new Promise(async function(resolve, reject) { //Promesa 14
                                                            var continuar = bucleQuery();
                                                            setTimeout(function() {
                                                                if (continuar != false) {
                                                                    resolve();
                                                                } else {
                                                                    resultado();
                                                                }
                                                                numeroBucle++;
                                                                console.log(`Bucle numero: ${numeroBucle}`);
                                                            }, tiempo);
                                                        }).then(() => {
                                                            return new Promise(async function(resolve, reject) { //Promesa 15
                                                                var continuar = bucleQuery();
                                                                setTimeout(function() {
                                                                    if (continuar != false) {
                                                                        resolve();
                                                                    } else {
                                                                        resultado();
                                                                    }
                                                                    numeroBucle++;
                                                                    console.log(`Bucle numero: ${numeroBucle}`);
                                                                }, tiempo);
                                                            }).then(() => {
                                                                return new Promise(async function(resolve, reject) { //Promesa 16
                                                                    var continuar = bucleQuery();
                                                                    setTimeout(function() {
                                                                        if (continuar != false) {
                                                                            resolve();
                                                                        } else {
                                                                            resultado();
                                                                        }
                                                                        numeroBucle++;
                                                                        console.log(`Bucle numero: ${numeroBucle}`);
                                                                    }, tiempo);
                                                                }).then(() => {
                                                                    return new Promise(async function(resolve, reject) { //Promesa 17
                                                                        var continuar = bucleQuery();
                                                                        setTimeout(function() {
                                                                            if (continuar != false) {
                                                                                resolve();
                                                                            } else {
                                                                                resultado();
                                                                            }
                                                                            numeroBucle++;
                                                                            console.log(`Bucle numero: ${numeroBucle}`);
                                                                        }, tiempo);
                                                                    }).then(() => {
                                                                        return new Promise(async function(resolve, reject) { //Promesa 18
                                                                            var continuar = bucleQuery();
                                                                            setTimeout(function() {
                                                                                if (continuar != false) {
                                                                                    resolve();
                                                                                } else {
                                                                                    resultado();
                                                                                }
                                                                                numeroBucle++;
                                                                                console.log(`Bucle numero: ${numeroBucle}`);
                                                                            }, tiempo);
                                                                        }).then(() => {
                                                                            return new Promise(async function(resolve, reject) { //Promesa 19
                                                                                var continuar = bucleQuery();
                                                                                setTimeout(function() {
                                                                                    if (continuar != false) {
                                                                                        resolve();
                                                                                    } else {
                                                                                        resultado();
                                                                                    }
                                                                                    numeroBucle++;
                                                                                    console.log(`Bucle numero: ${numeroBucle}`);
                                                                                }, tiempo);
                                                                            }).then(() => {
                                                                                resultado();
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

//Función para continuar despues de 1000 rows:
function bucleQuery() {
    if (nextContinuationToken != null) {
        tableSvc.queryEntities(tablaUsar, query, nextContinuationToken, function(error, results, response) {
            if (!error) {
                //Recorrido por row:
                results.entries.forEach(function(entry) {

                    updateTaskTabla2 = entry;

                    //Corregir tabla2:
                    /*
                    tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                        if (!error) {
                            console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                        }
                    });*/

                    //Logica por row:
                    aceptCount = 0;
                    //console.log(`${entry['RowKey']['_']}`);
                    if (entry['Baja']['_'] == "Aprobado" && bajaExiste == "X") {
                        aceptCount++;
                    }
                    if (entry['Borrado']['_'] == "Aprobado" && borradoExiste == "X") {
                        aceptCount++;
                    }
                    if (entry['Check']['_'] == "Aprobado" && checkExiste == "X") {
                        aceptCount++;
                    }
                    if (entry['Resguardo']['_'] == "Aprobado" && resguardoExiste == "X") {
                        aceptCount++;
                    }
                    if (entry['HojaDeServicio']['_'] == "Aprobado" && hojaDeServicioExiste == "X") {
                        aceptCount++;
                    }

                    console.log(`Aceptados: ${aceptCount}`);
                    if (aceptCount == 5) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count5++;
                    } else if (aceptCount == 4) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count4++;
                    } else if (aceptCount == 3) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count3++;
                    } else if (aceptCount == 2) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count2++;
                    } else if (aceptCount == 1) {
                        //Colocación de la información:
                        if (entry['Proyecto']['_'] == proyectoTrabajando && aceptCount == contadorX) {
                            proyectoCount++;
                            //Tarea Tabla5:                       
                            taskTabla5['PartitionKey']['_'] = entry['Proyecto']['_'];
                            taskTabla5['RowKey']['_'] = entry['RowKey']['_'];
                            taskTabla5['Baja']['_'] = entry['Baja']['_'];
                            taskTabla5['Borrado']['_'] = entry['Borrado']['_'];
                            taskTabla5['Check']['_'] = entry['Check']['_'];
                            taskTabla5['Resguardo']['_'] = entry['Resguardo']['_'];
                            taskTabla5['HojaDeServicio']['_'] = entry['HojaDeServicio']['_'];
                            tableSvc.insertOrReplaceEntity(tablaUsar5, taskTabla5, function(error, result, response) {
                                if (!error) {
                                    console.log("La entidad se agrego o remplazo correctamente a la tabla 5");
                                } else {
                                    console.log("Hay un error");
                                }
                            });
                            //Tarea Tabla2:
                            updateTaskTabla2['Status']['_'] = "Procesado";
                            tableSvc.replaceEntity(tablaUsar, updateTaskTabla2, function(error, result, response) {
                                if (!error) {
                                    console.log("Se hizó un replaceEntity correctamente sobre la tabla 2.");
                                }
                            });
                        }
                        count1++;
                    } else if (aceptCount == 0) {
                        count0++;
                    }
                });
                //Token que permite continuar despues de leer 1000 rows:
                if (results.continuationToken) {
                    nextContinuationToken = results.continuationToken;
                } else {
                    return false;
                }
            }
        });
    }
}

//Funcion que se ejecuta el final del programa:
function resultado() {
    taskTabla4['PartitionKey']['_'] = "Proyecto";
    taskTabla4['RowKey']['_'] = proyectoTrabajando;
    taskTabla4['NumDoc']['_'] = proyectoCount;
    taskTabla4['Baja']['_'] = bajaExiste;
    taskTabla4['Borrado']['_'] = borradoExiste;
    taskTabla4['Check']['_'] = checkExiste;
    taskTabla4['Resguardo']['_'] = resguardoExiste;
    taskTabla4['HojaDeServicio']['_'] = hojaDeServicioExiste;

    //Remplazar tablara 4 con su contenido y modificando unicamente el conteo actual:
    tableSvc.insertOrReplaceEntity(tablaUsar4, taskTabla4, function(error, result, response) {
        if (!error) {
            console.log("Se actualizo o creo una entidad en la tabla 4 con sy respectiba información.");
        } else {
            console.log("Hay un error.");
        }
    });

    console.log(`${count5} tienen los 5 campos Aprobados`);
    console.log(`${count4} tienen los 4 campos Aprobados`);
    console.log(`${count3} tienen los 3 campos Aprobados`);
    console.log(`${count2} tienen los 2 campos Aprobados`);
    console.log(`${count1} tienen 1 campo Aprobado`);
    console.log(`${count0} no tienen ningun Aprobado`);
    total = count0 + count1 + count2 + count3 + count4 + count5;
    console.log(`Total de campos analizados: ${total}`);
    console.log(`Se esta buscando ${contadorX} documentos en el proyecto.`);
    console.log(`${proyectoCount} corresponden con el proyecto.`);
}

//Inicia el trabajo:
promesaWork();