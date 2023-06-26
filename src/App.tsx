import { useEffect, useState } from "react";
import browserUpdate from "browser-update";
import classnames from "classnames";
import { Routes, Route, Navigate } from "react-router-dom";
import { create, all } from "mathjs";
import ReactGA from "react-ga4";

import Base from "@/pages/Base";
import Byte from "@/pages/Byte";
import DateDifference from "@/pages/DateDifference";
import Header from "@/components/Header";
import LinearFormula from "@/pages/LinearFormula";
import MolarMass from "@/pages/MolarMass";
import Regular from "@/pages/Regular";
import Sidebar from "@/components/Sidebar";
import QuadraticEquation from "@/pages/QuadraticEquation";
import QuadraticFormula from "@/pages/QuadraticFormula";
import QuadraticFunction from "@/pages/QuadraticFunction";
import Stat from "@/pages/Stat";
import ThreeVarLinearEquations from "@/pages/ThreeVarLinearEquations";
import TwoVarLinearEquations from "@/pages/TwoVarLinearEquations";

import styles from "@/styles/App.module.css";

function App(): JSX.Element {
	const [showSidebar, setShowSidebar] = useState(false);

	const math = create(all, {
		number: "BigNumber",
		precision: 64
	});

	const toggleSidebar = (): void => {
		setShowSidebar(!showSidebar);
	};

	useEffect(() => {
		browserUpdate({
			required: { c: -1, e: -1, f: -1, o: -1, s: 0 },
			insecure: true,
			noclose: true,
			no_permanent_hide: true,
			notify_esr: true,
			reminder: 0,
			reminderClosed: 0,
			unsupported: true,
			url: "https://browsehappy.com/"
		});
		setTimeout(() => {
			ReactGA.initialize("G-LS9MTX889C");
			ReactGA.send("pageview");
		}, 1000);
	}, []);

	return (
		<div className={classnames(styles["App"], {
			[styles["show-sidebar"]]: showSidebar
		})}>
			<Header toggleSidebar={toggleSidebar} />
			<Sidebar
				showSidebar={showSidebar}
				toggleSidebar={toggleSidebar}
			/>
			<Routes>
				<Route path="/" element={<Regular math={math} />} />
				<Route path="/base" element={<Base math={math} />} />
				<Route path="/byte" element={<Byte />} />
				<Route path="/date-difference" element={<DateDifference />} />
				<Route
					path="/linear-formula"
					element={<LinearFormula math={math} />}
				/>
				<Route
					path="/molar-mass"
					element={<MolarMass math={math} />}
				/>
				<Route
					path="/quadratic-equation"
					element={<QuadraticEquation math={math} />}
				/>
				<Route
					path="/quadratic-formula"
					element={<QuadraticFormula math={math} />}
				/>
				<Route
					path="/quadratic-function"
					element={<QuadraticFunction math={math} />}
				/>
				<Route path="/stat" element={<Stat math={math} />} />
				<Route
					path="/2var-linear-equations"
					element={<TwoVarLinearEquations math={math} />}
				/>
				<Route
					path="/3var-linear-equations"
					element={<ThreeVarLinearEquations math={math} />}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default App;
