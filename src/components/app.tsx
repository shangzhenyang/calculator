import BasePage from "@/components/base-page";
import BytePage from "@/components/byte-page";
import DateDifferencePage from "@/components/date-difference-page";
import Header from "@/components/header";
import LinearFormulaPage from "@/components/linear-formula-page";
import MolarMassPage from "@/components/molar-mass-page";
import QuadraticEquationPage from "@/components/quadratic-equation-page";
import QuadraticFormulaPage from "@/components/quadratic-formula-page";
import QuadraticFunctionPage from "@/components/quadratic-function-page";
import RegularPage from "@/components/regular-page";
import Sidebar from "@/components/sidebar";
import StatPage from "@/components/stat-page";
import ThreeVarLinearEquationsPage from "@/components/three-var-linear-equations-page";
import TwoVarLinearEquationsPage from "@/components/two-var-linear-equations-page";
import { JSX, useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";

const StyledAppContainer = styled.div`
	display: grid;
	grid-template-areas:
		"header header"
		"sidebar main";
	grid-template-columns: 1fr 3fr;
	grid-template-rows: auto 1fr;
	height: 100%;

	@media screen and (max-width: 768px) {
		grid-template-areas:
			"header"
			"main";
		grid-template-columns: 1fr;
	}
`;

const StyledAppContainerWithSidebar = styled(StyledAppContainer)`
	@media screen and (max-width: 768px) {
		grid-template-areas:
			"header"
			"sidebar";

		main {
			display: none;
		}
	}
`;

function App(): JSX.Element {
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleSidebar = (): void => {
		setShowSidebar(!showSidebar);
	};

	useEffect(() => {
		setTimeout(() => {
			ReactGA.initialize("G-LS9MTX889C");
			ReactGA.send("pageview");
		}, 1000);
	}, []);

	const AppContainer = showSidebar
		? StyledAppContainerWithSidebar
		: StyledAppContainer;
	return (
		<AppContainer>
			<Header toggleSidebar={toggleSidebar} />
			<Sidebar
				showSidebar={showSidebar}
				toggleSidebar={toggleSidebar}
			/>
			<Routes>
				<Route
					path="/"
					element={<RegularPage />}
				/>
				<Route
					path="/base"
					element={<BasePage />}
				/>
				<Route
					path="/byte"
					element={<BytePage />}
				/>
				<Route
					path="/date-difference"
					element={<DateDifferencePage />}
				/>
				<Route
					path="/linear-formula"
					element={<LinearFormulaPage />}
				/>
				<Route
					path="/molar-mass"
					element={<MolarMassPage />}
				/>
				<Route
					path="/quadratic-equation"
					element={<QuadraticEquationPage />}
				/>
				<Route
					path="/quadratic-formula"
					element={<QuadraticFormulaPage />}
				/>
				<Route
					path="/quadratic-function"
					element={<QuadraticFunctionPage />}
				/>
				<Route
					path="/stat"
					element={<StatPage />}
				/>
				<Route
					path="/2var-linear-equations"
					element={<TwoVarLinearEquationsPage />}
				/>
				<Route
					path="/3var-linear-equations"
					element={<ThreeVarLinearEquationsPage />}
				/>
				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
			</Routes>
		</AppContainer>
	);
}

export default App;
