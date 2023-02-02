import { Button, Text, TextInput } from "@ignite-ui/react"
import { ArrowRight } from "phosphor-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormAnnotation } from "./styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"

const claimUserNameFormSchema = z.object({
    username:
        z.string()
            .min(3)
            .max(20)
            .regex(/^[a-zA-Z0-9\\ -]+$/i, {
                message: "O nome de usuário deve conter apenas letras, números e espaços"
            })
            .transform((value) => value.toLowerCase())
})

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export const ClaimUserNameForm = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUserNameFormData>({
        defaultValues: {

            username: ""
        },
        resolver: zodResolver(claimUserNameFormSchema)
    })

    const router = useRouter()

    const handlePreRegister = async (data: ClaimUserNameFormData) => {
        const { username } = data

        await router.push(`/register?username=${username}`)

    }

    return (

        <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
            <TextInput size={"sm"} prefix="ignite.com/" placeholder="Seu usuário" {...register("username")} />
            <Button
                size={"sm"}
                type="submit"
                disabled={isSubmitting}
            >
                Reservar
                <ArrowRight />
            </Button>

            <FormAnnotation>
                <Text size={"sm"}>

                    {errors.username ? errors.username.message : "Digite um nome de usuário"}
                </Text>
            </FormAnnotation>

        </Form>
    )
}
