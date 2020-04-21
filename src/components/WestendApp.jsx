import React from "react";
import { Route, Link } from "react-router-dom";
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
    Link as ChakraLink
} from "@chakra-ui/core";
import Helmet from "react-helmet";
import { ApiPromise, WsProvider } from '@polkadot/api';

export default function WestendApp() {
	React.useEffect(async () => {
		
		const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
		const api = await ApiPromise.create({ provider: wsProvider });

	}, []);
	return (
			<React.Fragment>
				{/* Westend App Home */}
				<Helmet>
					<title>Westend Network Platform</title>
					<meta name="description" content="Validator key stats" />
				</Helmet>
			</React.Fragment>
		);
}
