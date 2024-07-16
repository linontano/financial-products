import { AbstractControl, AsyncValidator, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ProductService } from "../../services/product.service";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";

export class CustomValidators {
    static releaseDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const today = new Date();
            today.setHours(0,0,0,0); // Ignorar hora

            const releaseDate = new Date(control.value);
            const releaseDateFix = new Date(releaseDate.getTime() + releaseDate.getTimezoneOffset()* 60000)
            if (isNaN(releaseDateFix.getTime())){
                return {invalidDate: 'Fecha inválida'};
            }
            releaseDateFix.setHours(0,0,0,0);
    
            return releaseDateFix >= today ? null : {releaseDateInvalid: 'Fecha de lanzamiento debe ser mayor o igual a la fecha actual'};
        }

    }
    static revisionDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control.parent && control.parent instanceof FormGroup)) {
                return null;
            }
            const releaseDateControl = control.parent.get('dateRelease');
            if (!releaseDateControl) {
                return null;
            }

            const releaseDate = new Date(releaseDateControl.value);
            const revisionDate = new Date(control.value);

            if (isNaN(releaseDate.getTime()) || isNaN(revisionDate.getTime())){
                return {invalidDate: 'Fecha inválida'};
            }
            const expectedRevisionDate = new Date(releaseDate);
            expectedRevisionDate.setFullYear(releaseDate.getFullYear() + 1);

            return expectedRevisionDate.getTime() === revisionDate.getTime() ? null : {revisionDateInvalid: 'Fecha de revisión debe ser igual a un año después de la fecha de lanzamiento'};
        }

    }
};

export class UniqueIDValidator {
  static createValidator(productService: ProductService, isEditMode: boolean): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (isEditMode){
            return of(null);
        }
        return productService.checkIfExistsProductID(control.value).pipe(
            map((isTaken) => (isTaken ? {uniqueID: true} : null)),
            catchError(() => of(null)),
          );
    }
    
  }
}
