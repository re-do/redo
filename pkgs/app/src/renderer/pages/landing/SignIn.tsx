import React from "react"
import gql from "graphql-tag"
import { FormText, FormSubmit, Form, Button, Column } from "@re-do/components"
import { store } from "renderer/common"
import { formatEmail } from "./common"
import { useMutation } from "@apollo/client"

const signIn = gql`mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
}`


export const SignIn = () => {
    const [submit] = useMutation(signIn)
    const disabled =
        store.useQuery({
            page: true
        }).page !== "SIGN_IN"
    return (
        <Form
            submit={(variables: any) => submit(variables)}
            onData={(data) => store.mutate({ token: data.signIn })}
            transformValues={({ email, ...rest }) => {
                return {
                    ...rest,
                    email: formatEmail(email)
                }
            }}
        >
            <Column justify="center" grow>
                <FormText
                    name="email"
                    disabled={disabled}
                    tooltipPlacement="right"
                    autoFocus
                />
                <FormText
                    type="password"
                    tooltipPlacement="right"
                    name="password"
                    disabled={disabled}
                />
            </Column>
            <FormSubmit>
                <Button disabled={disabled}>Sign in</Button>
            </FormSubmit>
        </Form>
    )
}
