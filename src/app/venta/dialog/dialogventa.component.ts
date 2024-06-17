import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Concepto } from "src/app/models/concepto";
import { Venta } from "src/app/models/venta";
import { ApiventaService } from "src/app/services/apiventa.service";

@Component({
    templateUrl: 'dialogventa.component.html'
})

export class DialogVentaComponent{

    public venta: Venta;
    public conceptos: Concepto[];

    public conceptoForm = this.formBuilder.group({
        cantidad: [0, Validators.required],
        importe: [0, Validators.required],
        idProducto: [1, Validators.required],
    })


    constructor(
        public dialogRef: MatDialogRef<DialogVentaComponent>,
        public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        public apiVenta: ApiventaService
    ){
        this.conceptos = [];
        this.venta = {idCliente:1, conceptos: []};
    }


    close(){
        this.dialogRef.close();
    }

    addConcepto(){
        this.conceptos.push(this.conceptoForm.value);
    }

    addVenta(){
        this.venta.conceptos = this.conceptos;
        this.apiVenta.add(this.venta).subscribe(response => {
            if(response.exito === 1){
                this.dialogRef.close();
                this.snackBar.open('Venta hecha con exito', '', {
                    duration: 2000
                });
            }
        })
    }
}