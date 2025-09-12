import { Container, TextInput } from '@mantine/core'
import Urlform from './Urlform';
import UrlResponse from './Urlresponse';
import { useState } from 'react';


export default function Urlshortener() {
    const [response, setResponse] = useState(null);

    return (


        <Container size={"xs"}>
            {response ? <UrlResponse setResponse={setResponse} response={response} /> : <Urlform setResponse={setResponse} />}           
                
        </Container>
    )
}

