import { Routes, Route, Navigate } from "react-router-dom";
import { create, all } from "mathjs";

import Base from "@/pages/Base";
import Byte from "@/pages/Byte";
import Currency from "@/pages/Currency";
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

function App() {
	const math = create(all, {
		number: "BigNumber",
		precision: 64
	});

	return (
		<div className={styles["App"]}>
			<Header />
			<Sidebar />
			<Routes>
				<Route path="/" element={<Regular math={math} />} />
				<Route path="/base" element={<Base math={math} />} />
				<Route path="/byte" element={<Byte />} />
				<Route path="/currency" element={<Currency />} />
				<Route path="/date-difference" element={<DateDifference />} />
				<Route path="/linear-formula" element={<LinearFormula />} />
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
					element={<QuadraticFormula />}
				/>
				<Route
					path="/quadratic-function"
					element={<QuadraticFunction />}
				/>
				<Route path="/stat" element={<Stat math={math} />} />
				<Route
					path="/2var-linear-equations"
					element={<TwoVarLinearEquations math={math} />}
				/>
				<Route
					path="/3var-linear-equations"
					element={<ThreeVarLinearEquations />}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default App;
