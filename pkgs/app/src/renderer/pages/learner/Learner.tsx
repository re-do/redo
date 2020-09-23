import React from "react"
import {
    Column,
    Spinner,
    TextInput,
    AppBar,
    Icons,
    Button,
    ChipInput,
    ErrorText
} from "@re-do/components"
import { deactivateLearner, resetLearner } from "state"
import { LearnerEvents } from "./StepCards"
import { store } from "renderer/common"

export const Learner = () => {
    const { events, testName: name, testTags: tags } = store.useQuery({
        learner: {
            events: true,
            testName: true,
            testTags: true
        }
    }).learner
    // const [createTest, createTestResult] = useCreateTestMutation()
    const existingTags: string[] = [] //useMeQuery().data?.me.tags.map((tag) => tag.name) ?? []
    const createTestResult = {} as any
    return (
        <Column full>
            <AppBar height={120} align="center">
                <Column align="center">
                    <TextInput
                        value={name}
                        placeholder="Test Name"
                        colorTemplate="light"
                        kind="underlined"
                        onChange={(e) =>
                            store.mutate({
                                learner: { testName: e.target.value }
                            })
                        }
                    />
                    <ChipInput
                        label="Tags"
                        possibleSuggestions={existingTags}
                    />
                </Column>
            </AppBar>
            <LearnerEvents steps={events} />
            <AppBar kind="bottom" justify="space-around">
                <Button
                    Icon={Icons.close}
                    style={{ color: "white" }}
                    onClick={deactivateLearner}
                />
                
                {createTestResult.loading ? (
                    <Spinner />
                ) : (
                    <>
                        <Button
                            Icon={Icons.save}
                            style={{ color: "white" }}
                            onClick={async () => {
                                // await createTest({
                                //     variables: {
                                //         name,
                                //         tags,
                                //         steps: events
                                //     }
                                // })
                                await resetLearner()
                                await deactivateLearner()
                            }}
                        />
                        {createTestResult.error ? (
                            <ErrorText>
                                {createTestResult.error.message}
                            </ErrorText>
                        ) : null}
                    </>
                )}
            </AppBar>
        </Column>
    )
}
