import React from "react"
import { Column, AutoForm, Row } from "@re-do/components"
import { isRecursible, fromEntries } from "@re-do/utils"

export type ObjectViewProps = {
    value: Record<string, any>
    path: string
    metaKey: string
}

type FieldEntries = [string, any][]

type SortedEntries = [FieldEntries, FieldEntries]

export const ObjectView = ({ metaKey, value, path }: ObjectViewProps) => {
    const [mutableFields, staticFields] = Object.entries({
        ...value
    }).reduce(
        ([mutableFields, staticFields], [k, v]) =>
            (k === "__typename" || isRecursible(v)
                ? [mutableFields, staticFields]
                : k === "id"
                ? [mutableFields, [...staticFields, [k, v]]]
                : [[...mutableFields, [k, v]], staticFields]) as SortedEntries,
        [[], []] as SortedEntries
    )
    return (
        <Row>
            <Column>
                <AutoForm
                    contents={fromEntries(mutableFields)}
                    staticValues={fromEntries(staticFields)}
                    validate={() => ({})}
                    submit={() => console.log("Test created!")}
                />
            </Column>
        </Row>
    )
}
