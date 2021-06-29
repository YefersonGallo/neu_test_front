import React from 'react'
import {RadioGroup} from "evergreen-ui";

const Selections = ({value, setValue}) => {
    const [options] = React.useState([
        {label: 'País', value: 'country'},
        {label: 'Estado', value: 'state'},
        {label: 'Ciudad', value: 'city'}
    ])

    return (
        <RadioGroup
            marginRight={"15px"}
            label="Filtro de búsqueda (Recuerda ingresar la pimera letra en mayúscula)"
            size={16}
            value={value}
            options={options}
            onChange={event => setValue(event.target.value)}
        />
    )
}

export default Selections;
