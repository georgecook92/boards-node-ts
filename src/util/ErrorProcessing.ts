 import FieldErrorDTO from '../DTO/FieldErrorDTO';

 export const createValidationErrorArray = (errors) : FieldErrorDTO[] => {
        let resultArray : FieldErrorDTO[] = [];
        for(let i = 0; i < errors.length; i++) {
            let fieldErrorDTO: FieldErrorDTO = new FieldErrorDTO();
            fieldErrorDTO.errors = [];
            for(var propertyName in errors[i]) {
                if(propertyName === "property") {
                    if(errors[i].hasOwnProperty(propertyName)) {
                        fieldErrorDTO.field = errors[i][propertyName];
                    }
                }
                if(propertyName === "constraints") {
                    if(errors[i].hasOwnProperty(propertyName)) {
                        const propValue = errors[i][propertyName];
                        Object.keys(propValue).forEach(key => {
                            fieldErrorDTO.errors.push(propValue[key]);
                        });
                    }
                }
            }
            resultArray.push(fieldErrorDTO);
        }
        return resultArray;
    }