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

export default function WestendApp() {
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
