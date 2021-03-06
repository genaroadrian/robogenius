export interface Alumnos {
    idalu?: number,
    nomalu: string,
    apealu: string,
    fnacalu: string,
    sexoalu: string,
    domalu: string,
    telalu: number,
    correoalu: string,
    medicacion: string,
    alergias: string,
    perfilalu: string,
    cronica: string,
    otro: string,
    escuela: string,
    usuarioalu: string,
    pswalu: string,
    nompad: string,
    apepad: string,
    dompad: string,
    telpad: number,
    correopad: string,
    ocupad: string,
    nommad: string,
    apemad: string,
    dommad: string,
    telmad: number,
    correomad: string,
    ocupmad: string,
    usuariopad: string,
    pswpad: string,
    finscripcion: string,
    activo: number,
    idsuc: string,
    idesc: number,
    nombre: string
}


export interface InactiveStudents
{
    nomalu: string,
    apealu: string,
    sexoalu: string,
    fnacalu: string,
    idsuc?: number
}