import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Container, Header } from "../styles";
import { ConnectBox, ConnectItem } from "./styles";




export default function Register() {




    const handleRegister = async () => {

    }

    return (

        <Container>
            <Header>
                <Heading as="strong">
                    Conecte seu calendário!
                </Heading>
                <Text>
                    Conecte o seu calendário para que possamos sincronizar os seus eventos e facilitar a sua vida.
                </Text>


                <MultiStep
                    size={4}
                    currentStep={2}
                />
            </Header>

            <ConnectBox>

                <ConnectItem>
                    <Text>
                        <strong>Google Calendar</strong>
                    </Text>
                    <Button variant="secondary" size="sm">Conectar<ArrowRight /></Button>
                    
                </ConnectItem>

                <Button type="submit">
                    Próximo passo
                    <ArrowRight />
                </Button>
            </ConnectBox>
        </Container>
    )
}
