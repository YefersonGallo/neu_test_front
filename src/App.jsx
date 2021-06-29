import React, {useState} from 'react';
import './App.css';
import {Button, Heading, SearchInput, Table} from 'evergreen-ui'
import Selections from "./components/Selections";

function App() {

    const [value, setValue] = useState('')
    const [text, setText] = useState("")
    const [data, setData] = useState([])

    const placeholders = {
        '': "Selecciona un filtro de búsqueda",
        'country': "Se hará la búsqueda por país",
        'state': "Se hará la búsqueda por estado",
        'city': "Se hará la búsqueda por ciudad"
    }

    const sendRequest = async () => {
        const body = {}
        body[value] = text
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
        const responseP = await fetch(`http://127.0.0.1:5000/${value}`, requestOptions);
        const res = await responseP.json();
        setData(res)
    };

    return (
        <div className="App">
            <header className="App-header">
                <Heading size={900} margin={50} color={"white"}>
                    Consulta de Población
                </Heading>
            </header>
            <div className="App-body">
                <div className="App-body__search">
                    <Selections value={value} setValue={setValue}/>
                    <SearchInput onChange={e => setText(e.target.value)} value={text}
                                 placeholder={placeholders[value]}/>
                    <Button marginRight={16} appearance="primary" disabled={value === ''} onClick={sendRequest}>
                        Buscar
                    </Button>
                </div>
                <div className="App-body__result" hidden={data.length === 0}>
                    <Table>
                        <Table.Head>
                            {data.state_0 && <Table.TextHeaderCell>Estado</Table.TextHeaderCell>}
                            <Table.TextHeaderCell>Ciudad</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Población</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body height={500}>
                            {data.name ? <Table.Row key={`location-0`}>
                                <Table.TextCell>{data.population}</Table.TextCell>
                                <Table.TextCell>{data.name}</Table.TextCell>
                            </Table.Row> : Object.values(data).map((location, index) => {
                                const nodes = []
                                if (location.name)
                                    nodes.push(<Table.Row key={`location-${index}`}>
                                        <Table.TextCell>{location.name}</Table.TextCell>
                                        <Table.TextCell>{location.population}</Table.TextCell>
                                    </Table.Row>)
                                else {
                                    nodes.push(<Table.Row key={`location-${index}`} rowSpan={Object.values(location.cities).length}>
                                        <Table.TextCell>{location.state}</Table.TextCell>
                                        <Table.TextCell>{Object.values(location.cities)[0].name}</Table.TextCell>
                                        <Table.TextCell>{Object.values(location.cities)[0].population}</Table.TextCell>
                                    </Table.Row>)
                                    Object.values(location.cities).slice(1, Object.values(location.cities).length).forEach((city) => {
                                        nodes.push(<Table.Row key={`${city.name}-${index}`}>
                                            <Table.TextCell />
                                            <Table.TextCell>{city.name}</Table.TextCell>
                                            <Table.TextCell>{city.population}</Table.TextCell>
                                        </Table.Row>)
                                    })
                                }
                                return nodes
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default App;
