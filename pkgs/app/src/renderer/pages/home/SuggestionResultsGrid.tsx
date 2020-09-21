import React from "react"
import { SuggestionCard } from "./SuggestionCard"
import { store } from "renderer/common"
import { Card, Row, Button, Icons } from "@re-do/components"
import { test as runTest } from "@re-do/test"

const welcomeSuggestion = {
    title: "👆Hey there!",
    description:
        "Looks like you don't have any tests yet. Click up here to create one!",
    data: null
}

const useSuggestions = () => {
    const { cardFilter } = store.useQuery({ cardFilter: true })
    const tests: any[] = []
    return tests && tests.length
        ? tests
              .filter((test) =>
                  JSON.stringify(test)
                      .toLowerCase()
                      .includes(cardFilter.toLowerCase())
              )
              .map((data) => toSuggestion("tests", data))
        : []
}

type Suggestion = {
    title: string
    description: string
    data: any
    extras?: JSX.Element
}

const suggestionTypes = {
    tests: (test: any) => ({
        title: test.name,
        description: test.tags.map((tag: any) => tag.name).join(", "),
        extras: (
            <Button
                Icon={Icons.run}
                onClick={() =>
                    runTest(test.steps.map((step: any) => [step.kind, step] as any))
                }
            />
        ),
        data: test
    })
}

const toSuggestion = (
    kind: any,
    data: any
 ) => {
    return [] as any
}

export const SuggestionResultsGrid = () => {
    const values = useSuggestions()
    return (
        <Card
            style={{
                width: "100%",
                height: "100%"
            }}
        >
            <Row
                wrap="wrap"
                style={{
                    width: "100%",
                    padding: 16
                }}
            >
                {values.length ? (
                    values.map((value) => (
                        <div
                            key={value.title}
                            style={{
                                width: 200,
                                height: 200
                            }}
                        >
                            <SuggestionCard {...value} />
                        </div>
                    ))
                ) : (
                    <SuggestionCard {...welcomeSuggestion} />
                )}
            </Row>
        </Card>
    )
}
