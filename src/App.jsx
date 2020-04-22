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
    Button,
} from '@chakra-ui/core'
import AlertDialogContainer from './components/LoginFlow/AlertDialogContainer'
import { Helmet } from 'react-helmet'
import { useDebounce } from 'use-debounce'
import ValidatorTable from './components/ValidatorTable'
import HelpCenter from './components/HelpCenter'
import ReturnsCalculator from './components/ReturnsCalculator'
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
    const [errorState, setErrorState] = React.useState(false)

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
                    {/* Homepage - Dashboard */}
                    <Route exact path="/(|dashboard)">
                        <React.Fragment>
                            <Link
                                as={RouterLink}
                                to="/returns-calculator"
                                color="teal.500"
                            >
                                <Button
                                    style={{
                                        border: '1px solid teal.500',
                                        borderRadius: '18px',
                                        opacity: 1,
                                        color: 'teal.500',
                                        height: '35px',
                                    }}
                                >
                                    Calculate Returns
                                </Button>
                            </Link>
                        </React.Fragment>
                    </Route>

                    <Route path="/returns-calculator">
                        <ReturnsCalculator />
                    </Route>
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
