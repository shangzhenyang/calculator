import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { t } from "i18next";

import Footer from "@/components/Footer";

import styles from "@/styles/Sidebar.module.css";

interface Props {
	showSidebar: boolean;
	toggleSidebar: () => void;
}

function Sidebar({ showSidebar, toggleSidebar }: Props): JSX.Element {
	const navItems = [
		{
			path: "/",
			text: "regular"
		},
		{
			path: "/base",
			text: "base"
		},
		{
			path: "/byte",
			text: "byte"
		},
		{
			path: "/date-difference",
			text: "dateDifference"
		},
		{
			path: "/molar-mass",
			text: "molarMass"
		},
		{
			path: "/stat",
			text: "statistics"
		},
		{
			path: "/quadratic-equation",
			text: "quadraticEquation"
		},
		{
			path: "/2var-linear-equations",
			text: "twoVariableLinearEquations"
		},
		{
			path: "/3var-linear-equations",
			text: "threeVariableLinearEquations"
		},
		{
			path: "/quadratic-function",
			text: "quadraticFunction"
		},
		{
			path: "/linear-formula",
			text: "linearFormula"
		},
		{
			path: "/quadratic-formula",
			text: "quadraticFormula"
		}
	];

	const navLinks = navItems.map((item) => {
		return (
			<NavLink
				draggable={false}
				className={({ isActive }): string => {
					return classnames(styles["nav-item"], {
						[styles["active"]]: isActive
					});
				}}
				key={item.path}
				to={item.path}
				onClick={toggleSidebar}
			>
				{t(item.text)}
			</NavLink>
		);
	});

	return (
		<div className={classnames(styles["sidebar"], {
			[styles["show"]]: showSidebar
		})}>
			<nav>{navLinks}</nav>
			<Footer />
		</div>
	);
}

export default Sidebar;
