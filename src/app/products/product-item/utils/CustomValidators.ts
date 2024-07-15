import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static releaseDateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const today = new Date();
            today.setHours(0,0,0,0); // Ignorar hora

            const releaseDate = new Date(control.value);
            const releaseDateFix = new Date(releaseDate.getTime() + releaseDate.getTimezoneOffset()* 60000)
            console.log(control.value, releaseDate, releaseDate.getTimezoneOffset(), releaseDateFix);
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

            return expectedRevisionDate.getTime() === revisionDate.getTime() ? null : {revisionDateInvalid: 'Fecha de revisión debe ser exactamente igual a un año después de la fecha de lanzamiento'};
        }

    }
};
