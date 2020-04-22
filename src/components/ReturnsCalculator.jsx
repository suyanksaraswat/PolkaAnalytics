import React from 'react'
import { Route, Link } from 'react-router-dom'
import {
    Box,
    Heading,
    Text,
    Flex,
    InputGroup,
    Input,
    InputRightAddon,
    Icon,
    Button,
    Link as ChakraLink,
} from '@chakra-ui/core'
import FAQs from './FAQs'
import HowToStake from './guides/HowToStake'
import LogEvent from './LogEvent'
import Helmet from 'react-helmet'
import Footer from './Footer'
import { useDebounce } from 'use-debounce'

export default function ReturnsCalculator() {
    const [stakeInput, setStakeInput] = React.useState(1000.0)

    return (
        <React.Fragment>
            <Helmet>
                <title>Polka Analytics - Reutrn Calculator</title>
                <meta name="description" content="Validator key stats" />
            </Helmet>
            <LogEvent eventType="Returns calculator  view" />
            <Route exact path="/returns-calculator">
                <Heading as="h2" size="xl" textAlign="center" mt={16}>
                    Return Calculator
                </Heading>
                <InputGroup>
                    <Input
                        placeholder="Stake Amount"
                        variant="filled"
                        type="number"
                        min="0"
                        step="0.000000000001"
                        max="999999999999999"
                        value={stakeInput}
                        textAlign="center"
                        roundedLeft="2rem"
                        onChange={e => {
                            setStakeInput(parseFloat(e.target.value))
                        }}
                    />
                    <InputRightAddon
                        children="KSM"
                        backgroundColor="teal.500"
                        roundedRight="2rem"
                    />
                </InputGroup>
            </Route>
            <Footer />
        </React.Fragment>
    )
}
