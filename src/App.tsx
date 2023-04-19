import { Routes, Route, Navigate } from "react-router-dom";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Regular from "@/pages/Regular";

function App() {
	return (
		<>
			<Header />
			<NavBar />
			<Routes>
				<Route path="/" element={<Regular />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</>
	);
}

export default App;
