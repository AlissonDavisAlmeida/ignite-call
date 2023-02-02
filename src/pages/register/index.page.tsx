import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Container, Form, FormError, Header } from "./styles";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { apiRest } from "../../lib/axios";
import { AxiosError } from "axios";


const registerFormSchema = z.object({
    username: z.string()
        .min(3)
        .max(20)
        .regex(/^([a-z\\-]+)$/i, { message: "O nome de usuário só pode conter letras e hífens." })
        .transform((value) => value.toLowerCase()),

    name: z.string()
        .min(3)



});


type RegisterForm = z.infer<typeof registerFormSchema>;

export default function Register() {

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
        resolver: zodResolver(registerFormSchema)
    })

    const router = useRouter();

    useEffect(() => {
        if (router.query?.username) {
            setValue("username", router.query.username as string);
        }
    }, [router.query?.username, setValue]);

    const handleRegister = async (data: RegisterForm) => {
        try {
            await apiRest.post("/users", data);

            await router.push("/register/connect-calendar");

        } catch (err: any) {
            if (err instanceof AxiosError && err.response?.data.message) {
                alert(err.response.data.message);

            }
        }
    }

    return (

        <Container>
            <Header>
                <Heading as="strong">
                    Bem vindo ao ignite Call
                </Heading>
                <Text>
                    Precisamos de algumas informações para criar seu perfil! Ah, e você pode alterar essas informações depois.
                </Text>


                <MultiStep
                    size={4}
                    currentStep={1}
                />
            </Header>

            <Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size={"sm"}>Nome de Usuário</Text>
                    <TextInput prefix="ignite.com/" placeholder="seu-usuario" {...register("username")} />

                    {
                        errors.username && (
                            <FormError>
                                {errors.username.message}
                            </FormError>
                        )
                    }
                </label>

                <label>
                    <Text size={"sm"}>Nome completo</Text>
                    <TextInput placeholder="seu-nome"  {...register("name")} />
                    {
                        errors.name && (
                            <FormError>
                                {errors.name.message}
                            </FormError>
                        )
                    }
                </label>



                <Button type="submit" disabled={isSubmitting}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Form>
        </Container>
    )
}
