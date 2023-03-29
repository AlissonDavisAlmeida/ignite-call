import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "../../../utils/get-week-days";
import { Container, Header } from "../styles";
import { FormError, IntervalBox, IntervalDay, IntervalInput, IntervalItem, IntervalsContainer } from "./styles";


const timeIntervalsFormSchema = z.object({
    intervals: z.array(z.object({
        weekDay: z.number().int().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)

    }))
        .length(7)
        .transform((intervals) => {
            return intervals.filter(interval => interval.enabled === true)
        })
        .refine((intervals) => intervals.length > 0, {
            message: "Você deve selecionar pelo menos um intervalo de tempo",
        })
})

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: {
            isSubmitting,
            errors
        }
    } = useForm({
        defaultValues: {
            intervals: [
                { weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
                { weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
                { weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
                { weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
                { weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
                { weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
                { weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },

            ]
        },
        resolver: zodResolver(timeIntervalsFormSchema)
    })

    const intervals = watch("intervals")

    const { fields } = useFieldArray({
        name: "intervals",
        control
    })


    async function handleSetTimeIntervals(data: TimeIntervalsFormData) {
        console.log("🚀 ~ file: index.page.tsx:51 ~ handleSetTimeIntervals ~ data:", data)

    }


    return (

        <Container>
            <Header>
                <Heading as="strong">
                    Quase lá!
                </Heading>
                <Text>
                    Agora, escolha os intervalos de tempo que você deseja que o nosso sistema considere para a sua disponibilidade.
                </Text>


                <MultiStep
                    size={4}
                    currentStep={3}
                />
            </Header>

            <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
                <IntervalsContainer>
                    {
                        fields.map((field, index) => {
                            return (
                                <IntervalItem key={field.id}>
                                    <IntervalDay>
                                        <Controller
                                            name={`intervals.${index}.enabled`}
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={checked => field.onChange(checked === true)}
                                                    />
                                                )
                                            }}
                                        />
                                        <Text>
                                            {getWeekDays()[field.weekDay]}
                                        </Text>
                                    </IntervalDay>
                                    <IntervalInput>
                                        <TextInput
                                            size={"sm"}
                                            type={"time"}
                                            step={60}
                                            disabled={!intervals[index].enabled}
                                            {...register(`intervals.${index}.startTime`)}
                                        />
                                        <TextInput
                                            size={"sm"}
                                            type={"time"}
                                            step={60}
                                            disabled={!intervals[index].enabled}
                                            {...register(`intervals.${index}.endTime`)}
                                        />
                                    </IntervalInput>
                                </IntervalItem>
                            )
                        })
                    }

                </IntervalsContainer>

                {
                    errors.intervals && (
                        <FormError size="sm">
                            {errors.intervals.message}
                        </FormError>
                    )
                }

                <Button type="submit" disabled={isSubmitting}>
                    Próximo passo
                    <ArrowRight />
                </Button>


            </IntervalBox>

        </Container>
    )
}
