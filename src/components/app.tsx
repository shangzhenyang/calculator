import styles from "@/components/app.module.css";
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
import clsx from "clsx";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { Navigate, Route, Routes } from "react-router";

function App(): JSX.Element {
	const [isSidebarShown, setIsSidebarShown] = useState(false);

	const toggleSidebar = (): void => {
		setIsSidebarShown(!isSidebarShown);
	};

	useEffect(() => {
		setTimeout(() => {
			ReactGA.initialize("G-LS9MTX889C");
			ReactGA.send("pageview");
		}, 1000);
	}, []);

	return (
		<div
			className={clsx(
				styles["container"],
				isSidebarShown && styles["sidebar-shown"],
			)}
		>
			<Header toggleSidebar={toggleSidebar} />
			<Sidebar
				isSidebarShown={isSidebarShown}
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
		</div>
	);
}

export default App;
