import React from 'react'
import {
    HashRouter as Router,
    Link as RouterLink,
    NavLink,
    Route,
    Redirect,
} from 'react-router-dom'
import {
    Flex,
    useColorMode,
    Box,
    Heading,
    Text,
    Input,
    InputGroup,
    InputRightAddon,
    Spinner,
    Link,
    CircularProgress,
    useDisclosure,
} from '@chakra-ui/core'
import AlertDialogContainer from './components/LoginFlow/AlertDialogContainer'
import { Helmet } from 'react-helmet'
import { useDebounce } from 'use-debounce'
import ValidatorTable from './components/ValidatorTable'
import HelpCenter from './components/HelpCenter'
import amplitude from 'amplitude-js'
import { AmplitudeProvider, LogOnChange } from '@amplitude/react-amplitude'
import ScrollToTop from './ScrollToTop'
import ValidatorApp from './components/validator_components/ValidatorApp'
import NominatorApp from './components/nominator_components/NominatorApp'
import socketIOClient from 'socket.io-client'
import LogEvent from './components/LogEvent'
import ErrorMessage from './components/ErrorMessage'
import NavBar from './components/NavBar'

const AMPLITUDE_KEY = '1f1699160a46dec6cc7514c14cb5c968'

function App() {
    const { colorMode, toggleColorMode } = useColorMode()
    const [electedInfo, setElectedInfo] = React.useState({})
    const [validatorData, setValidatorData] = React.useState([])
    const [errorState, setErrorState] = React.useState(false)
    const [validatorTableData, setValidatorTableData] = React.useState([])
    const [intentionData, setIntentionData] = React.useState([])
    const [
        validatorsAndIntentions,
        setValidatorsAndIntentions,
    ] = React.useState([])
    const [maxDailyEarning, setMaxDailyEarning] = React.useState(0)
    const [stakeInput, setStakeInput] = React.useState(1000.0)
    const [stakeAmount] = useDebounce(stakeInput, 500.0)
    const [apiConnected, setApiConnected] = React.useState(false)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const {
        isOpen: isExtensionDialogOpen,
        onOpen: onExtensionDialogOpen,
        onClose: onExtensionDialogClose,
    } = useDisclosure()
    const {
        isOpen: isCreateAccountDialogOpen,
        onOpen: onCreateAccountDialogOpen,
        onClose: onCreateAccountDialogClose,
    } = useDisclosure()
    const ERA_PER_DAY = 4
    const calcReward = React.useCallback(() => {
        const data = validatorData.map(validator => {
            const {
                stashId,
                stashIdTruncated,
                name,
                commission,
                totalStake,
                poolReward,
                noOfNominators,
            } = validator
            const userStakeFraction = stakeAmount / (stakeAmount + totalStake)
            const dailyEarning = userStakeFraction * poolReward * ERA_PER_DAY
            return {
                noOfNominators: noOfNominators,
                stashId: stashId,
                stashIdTruncated: stashIdTruncated,
                name: name,
                commission: `${parseFloat(commission)}%`,
                dailyEarning: isNaN(dailyEarning)
                    ? 'Not enough data'
                    : `${dailyEarning.toPrecision(10)} KSM`,
                dailyEarningPrecise: isNaN(dailyEarning) ? 0 : dailyEarning,
            }
        })
        const earnings = data.map(data => data.dailyEarningPrecise)
        setMaxDailyEarning(Math.max(...earnings))
        console.log('table data', data)
        setValidatorTableData(data)
        if (apiConnected) setIsLoaded(true)
    }, [stakeAmount, validatorData, apiConnected])

    React.useEffect(() => {
        if (apiConnected) calcReward()
    }, [calcReward, apiConnected])

    React.useEffect(() => {
        const socket = socketIOClient(
            'https://polka-analytic-api.herokuapp.com/'
        )
        socket.on(
            'initial',
            ({ filteredValidatorsList, electedInfo, intentionsData }) => {
                if (intentionsData[0]) {
                    setApiConnected(true)
                    setValidatorData(filteredValidatorsList)
                    setElectedInfo(electedInfo[0])
                    setIntentionData(intentionsData[0].intentions)
                    setValidatorsAndIntentions(
                        intentionsData[0].validatorsAndIntentions
                    )
                    setValidatorsAndIntentions(
                        intentionsData[0].validatorsAndIntentions
                    )
                    setValidatorsAndIntentions(
                        intentionsData[0].validatorsAndIntentions
                    )
                } else {
                    setErrorState(true)
                }
            }
        )

        socket.on(
            'onDataChange',
            ({ filteredValidatorsList, electedInfo, intentionsData }) => {
                if (intentionsData[0]) {
                    setApiConnected(true)
                    setValidatorData(filteredValidatorsList)
                    setElectedInfo(electedInfo[0])
                    setIntentionData(intentionsData[0].intentions)
                    setValidatorsAndIntentions(
                        intentionsData[0].validatorsAndIntentions
                    )
                    setValidatorsAndIntentions(
                        intentionsData[0].validatorsAndIntentions
                    )
                    setValidatorsAndIntentions(
                        intentionsData[0].validatorsAndIntentions
                    )
                } else {
                    setErrorState(true)
                }
            }
        )
    }, [])

    if (errorState) {
        return <ErrorMessage />
    }

    return (
        <AmplitudeProvider
            amplitudeInstance={amplitude.getInstance()}
            apiKey={AMPLITUDE_KEY}
        >
            <Helmet>
                <title>Polka Analytics - Analytics for Polkadot Network</title>
                <meta
                    name="description"
                    content="An analytics platform for the Polkadot Network"
                />
            </Helmet>
            <LogEvent eventType="Home dashboard view" />
            <LogOnChange
                eventType={`Expected daily earning from stake (Input Change) : (dashboard view)`}
                value={stakeInput}
            />
            <Router>
                <ScrollToTop />
                <Route exact path="/">
                    <Redirect to="/dashboard" />
                </Route>
                <NavBar
                    onExtensionDialogOpen={onExtensionDialogOpen}
                    onCreateAccountDialogOpen={onCreateAccountDialogOpen}
                />
                <Flex
                    className="App"
                    maxW="960px"
                    justify="center"
                    direction="column"
                    m="auto"
                    pb={8}
                    px={{ base: 4, md: 0 }}
                >
                    Start Investing
                    {/* Help Center */}
                    <Route path="/help-center">
                        <HelpCenter />
                    </Route>
                </Flex>
            </Router>
            <AlertDialogContainer
                isOpen={isExtensionDialogOpen}
                onClose={onExtensionDialogClose}
                title="Polkadot JS Extension Required!"
                body={
                    <>
                        PolkadotJs extension allows you to manage your polkadot
                        accounts outside of dapps. Injects the accounts and
                        allows signs transactions for a specific account.
                        <div>
                            <Link
                                href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en"
                                isExternal
                                color="teal.500"
                            >
                                Add PolkadotJs Extension
                            </Link>
                        </div>
                    </>
                }
            />
            <AlertDialogContainer
                isOpen={isCreateAccountDialogOpen}
                onClose={onCreateAccountDialogClose}
                title="Create atleast one account from polkadot extension!"
                body={
                    <>
                        Create atleast one account from PolkadotJs extension for
                        making transactions for a specific account.
                    </>
                }
            />
        </AmplitudeProvider>
    )
}

export default App
