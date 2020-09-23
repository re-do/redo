import React from "react"
import { useQuery } from "@apollo/client"
import {
    Column,
    Tree,
    Button,
    Modal,
    Icons,
    TreeNodeContext,
    TreeNodeTransform
} from "@re-do/components"
import { Test } from "@re-do/model"
import { ObjectView } from "./ObjectView"
import { RedoAppBar } from "./appBar"

const transformationMetadata: Record<string, TreeNodeTransform> = {
    test: ({ value: { name, ...rest } }: TreeNodeContext<Test>) => ({
        entry: [name, rest]
    })
}

// const getTransforms = (context: TreeNodeContext) => {
//     const metaKey = getMetadataKey(context.value)
//     const customTransforms =
//         metaKey && transformationMetadata[metaKey]
//             ? transformationMetadata[metaKey]!(context)
//             : undefined
//     return { ...defaultTransforms(context), ...customTransforms }
// }

const defaultTransforms: TreeNodeTransform = ({ key, value, path }) => {
    // TODO: Fix hack
    const metaKey = "test" //getMetadataKey(value)
    const extras = (
        <Modal toggle={<Button Icon={Icons.openModal} />} content={ <ObjectView value={value} path={path} metaKey={metaKey} />} />
    )
    const render = ["__typename", "id"].includes(key) ? null : undefined
    return { render, extras }
}

export type TreeViewProps = {
    metaKey: string
}

export const TreeView = ({ metaKey }: TreeViewProps) => {
    const tests: any[] = []
    return  <Column justify="center">
            <RedoAppBar>{["home", "search", "account"]}</RedoAppBar>
            {tests ? <Tree source={tests} transform={defaultTransforms}/> : null}
        </Column>
}
