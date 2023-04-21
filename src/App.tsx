import { Routes, Route, Navigate } from "react-router-dom";

import Base from "@/pages/Base";
import Byte from "@/pages/Byte";
import Currency from "@/pages/Currency";
import Date from "@/pages/Date";
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
	return (
		<div className={styles["App"]}>
			<Header />
			<Sidebar />
			<Routes>
				<Route path="/" element={<Regular />} />
				<Route path="/base" element={<Base />} />
				<Route path="/byte" element={<Byte />} />
				<Route path="/currency" element={<Currency />} />
				<Route path="/date" element={<Date />} />
				<Route path="/linear-formula" element={<LinearFormula />} />
				<Route path="/molar-mass" element={<MolarMass />} />
				<Route
					path="/quadratic-equation"
					element={<QuadraticEquation />}
				/>
				<Route
					path="/quadratic-formula"
					element={<QuadraticFormula />}
				/>
				<Route
					path="/quadratic-function"
					element={<QuadraticFunction />}
				/>
				<Route path="/stat" element={<Stat />} />
				<Route
					path="/2var-linear-equations"
					element={<TwoVarLinearEquations />}
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
