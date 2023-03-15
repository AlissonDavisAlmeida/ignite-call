import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { Container, Header } from "../styles";
import { AuthError, ConnectBox, ConnectItem } from "./styles";




export default function ConnectCalendar() {

    const session = useSession()
    const router = useRouter();

    const hasAuthError = !!router.query.error;
    const isSignedIn = session?.status === "authenticated";

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
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => signIn("google")}
                        disabled={isSignedIn}
                    >
                        Conectar
                        <ArrowRight />
                    </Button>

                </ConnectItem>

                {
                    hasAuthError && (
                        <AuthError size="sm">
                            Failed to authenticate with Google, verify your permissions and try again.
                        </AuthError>
                    )
                }

                <Button type="submit" disabled={!isSignedIn}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </ConnectBox>
        </Container>
    )
}
