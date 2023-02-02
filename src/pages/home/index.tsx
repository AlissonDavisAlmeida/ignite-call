import { Heading, Text } from '@ignite-ui/react'
import Image from "next/image"
import { Container, Hero, Preview } from './style'

import previewImage from "../../assets/app-preview.png"
import { ClaimUserNameForm } from './components/ClaimUserNameForm'

export default function Home() {
  return (
    <Container>

      <Hero>
        <Heading size={"4xl"}>Agendamento descomplicado</Heading>
        <Text size={"xl"}>
          Conecte seus clientes com a sua agenda de forma simples e rápida.
        </Text>

        <ClaimUserNameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          alt="Calendário simbolizando a aplicação"
          height={400}
          quality={100}
          priority
        />
      </Preview>

    </Container>
  )
}
