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
    SimpleGrid,
} from '@chakra-ui/core'
import FAQs from './FAQs'
import HowToStake from './guides/HowToStake'
import LogEvent from './LogEvent'
import Helmet from 'react-helmet'
import { useDebounce } from 'use-debounce'

export default function ReturnsCalculator() {
    const [stakeInput, setStakeInput] = React.useState()
    const [monthlyInc, setMonthlyInc] = React.useState()
    const [timePeriod, setTimePeriod] = React.useState()

    return (
        <React.Fragment>
            <Helmet>
                <title>Polka Analytics - Reutrn Calculator</title>
                <meta name="description" content="Validator key stats" />
            </Helmet>
            <LogEvent eventType="Returns calculator  view" />
            <Route exact path="/returns-calculator">
                <Box
                    borderWidth="0px"
                    rounded="1g"
                    overflow="hidden"
                    margin="5%"
                >
                    <SimpleGrid columns={2}>
                        <Box p="6">
                            <Heading marginBottom="15%">
                                Calculate your returns
                            </Heading>
                            <Box d="flex" alignItems="baseline">
                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    ml="2"
                                >
                                    I want to spent:
                                </Box>
                            </Box>
                            <InputGroup>
                                <Input
                                    placeholder="Enter your Budget"
                                    variant="filled"
                                    type="number"
                                    marginBottom="15px"
                                    min="0"
                                    step="0.000000000001"
                                    max="999999999999999"
                                    value={stakeInput}
                                    textAlign="center"
                                    roundedLeft="2rem"
                                    onChange={e => {
                                        setStakeInput(
                                            parseFloat(e.target.value)
                                        )
                                    }}
                                />
                                <InputRightAddon
                                    children="KSM"
                                    backgroundColor="teal.500"
                                    roundedRight="2rem"
                                />
                            </InputGroup>
                            <Box d="flex" alignItems="baseline">
                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    ml="2"
                                >
                                    Replenish monthly by:
                                </Box>
                            </Box>
                            <InputGroup>
                                <Input
                                    placeholder="Enter monthly Increment"
                                    variant="filled"
                                    type="number"
                                    marginBottom="15px"
                                    min="0"
                                    step="0.000000000001"
                                    max="999999999999999"
                                    value={monthlyInc}
                                    textAlign="center"
                                    roundedLeft="2rem"
                                    roundedRight="2rem"
                                    onChange={e => {
                                        monthlyInc(parseFloat(e.target.value))
                                    }}
                                />
                            </InputGroup>
                            <Box d="flex" alignItems="baseline">
                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    ml="2"
                                >
                                    For a period of:
                                </Box>
                            </Box>
                            <InputGroup>
                                <Input
                                    placeholder="Enter time period in months"
                                    variant="filled"
                                    type="number"
                                    marginBottom="15px"
                                    min="0"
                                    step="0.000000000001"
                                    max="999999999999999"
                                    value={timePeriod}
                                    textAlign="center"
                                    roundedLeft="2rem"
                                    roundedRight="2rem"
                                    onChange={e => {
                                        timePeriod(parseFloat(e.target.value))
                                    }}
                                />
                            </InputGroup>
                            <Box d="flex" mt="2" alignItems="center">
                                <Box
                                    as="span"
                                    ml="2"
                                    color="gray.600"
                                    fontSize="sm"
                                >
                                    Advanced Settings
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            margin="5px"
                            borderWidth="1px"
                            rounded="4mm"
                            overflow="hidden"
                        >
                            <Box p="6">
                                <Heading marginBottom="15%">
                                    Expected results
                                </Heading>
                            </Box>
                        </Box>
                    </SimpleGrid>
                </Box>
            </Route>
        </React.Fragment>
    )
}
