import {z} from 'zod'


export const createRecordSchema = z.object({

    lastname : z.string({
        required_error: 'Lastname is required'
    }), 
    name:z.string({
        required_error: 'Name is required'
    }), 
    classe:z.string({
        required_error: 'Classe is required'
    }), 
    nationality:z.string({
        required_error: 'Nationality is required'
    }), 
    lelc:z.string({
        required_error: 'Lelc is required'
    }), 
    ci:z.string({
        required_error: 'Lastname is required'
    }), 
    policeof:z.string({
        required_error: 'Policeof is required'
    }).optional(), 
    civilstatus:z.string({
        required_error: 'Civilstatus is required'
    }),
    domicile:z.string({
        required_error: 'Domicile is required'
    }), 
    ministry:z.string({
        required_error: 'Ministry is required'
    }), 
    distribution:z.string({
        required_error: 'Distribution is required'
    }), 
    taskyouperform:z.string({
        required_error: 'taskyouperform is required'
    }), 
    dateofadmission:z.string({
        required_error: 'dateofadmission is required'
    }), 
    category:z.string({
        required_error: 'Category is required'
    }).optional(),
    orderno:z.string({
        required_error: 'Orderno is required'
    }), 
    prescribingphysician:z.string({
        required_error: 'Prescribingphysician is required'
    }),     
    days:z.string({
        required_error: 'Days is required'
    }), 
    from:z.string({
        required_error: 'From is required'
    }), 
    until:z.string({
        required_error: 'Until is required'
    }), 
    article:z.string({
        required_error: 'Article is required'
    }), 
    diagnostic:z.string({
        required_error: 'Diagnostic is required'
    }),

})