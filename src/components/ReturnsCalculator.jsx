import React from 'react'
import { Route, Link } from 'react-router-dom'
import {
    Box,
    Heading,
    Text,
    // Flex,
    // InputGroup,
    // Input,
    // InputRightAddon,
    // Icon,
    // Button,
    Link as ChakraLink,
} from '@chakra-ui/core'
import FAQs from './FAQs'
import HowToStake from './guides/HowToStake'
import LogEvent from './LogEvent'
import Helmet from 'react-helmet'
import Footer from './Footer'

export default function ReturnsCalculator() {
    return (
        <React.Fragment>
            {/* Help Center Home */}
            <Helmet>
                <title>Polka Analytics Help Center</title>
                <meta name="description" content="Validator key stats" />
            </Helmet>
            <LogEvent eventType="Help center view" />
            <Route exact path="/returns-calculator">
                <Heading as="h2" size="xl" textAlign="center" mt={16}>
                    Return Calculator
                </Heading>
            </Route>

            <Footer />
        </React.Fragment>
    )
}
