import React from "react"
import {
    Form,
    FormText,
    Row,
    FormSubmit,
    Button,
    Column
} from "@re-do/components"
import { store } from "renderer/common"
import { formatEmail } from "./common"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

const signUp = gql`mutation signUp(
    $email: String!
    $password: String!
    $first: String!
    $last: String!
) {
    signUp(email: $email, password: $password, first: $first, last: $last)
}`

export const SignUp = () => {
    const [submit] = useMutation(signUp)
    const disabled =
        store.useQuery({
            page: true
        }).page !== "SIGN_UP"
    return (
        <Form
            submit={(variables: any) => submit(variables)}
            onData={(data) => store.mutate({ token: data.signUp })}
            transformValues={({ email, ...rest }) => {
                return {
                    ...rest,
                    email: formatEmail(email)
                }
            }}
        >
            <Column justify="center" grow>
                <Row spacing={1}>
                    <FormText
                        name="first"
                        tooltipPlacement="left"
                        disabled={disabled}
                        autoFocus
                    />
                    <FormText
                        name="last"
                        tooltipPlacement="right"
                        disabled={disabled}
                    />
                </Row>
                <FormText
                    name="email"
                    tooltipPlacement="right"
                    disabled={disabled}
                />
                <Row spacing={1}>
                    <FormText
                        type="password"
                        name="password"
                        tooltipPlacement="left"
                        disabled={disabled}
                    />
                    <FormText
                        type="password"
                        name="confirm"
                        tooltipPlacement="right"
                        disabled={disabled}
                    />
                </Row>
            </Column>
            <FormSubmit>
                <Button disabled={disabled}>Sign up</Button>
            </FormSubmit>
        </Form>
    )
}
