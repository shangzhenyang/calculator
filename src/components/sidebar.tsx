import Footer from "@/components/footer";
import styles from "@/components/sidebar.module.css";
import clsx from "clsx";
import { t } from "i18next";
import type { JSX } from "react";
import { NavLink } from "react-router";

interface SidebarProps {
	isSidebarShown: boolean;
	toggleSidebar: () => void;
}

function Sidebar({ isSidebarShown, toggleSidebar }: SidebarProps): JSX.Element {
	const navItems = [
		{
			path: "/",
			text: "regular",
		},
		{
			path: "/base",
			text: "base",
		},
		{
			path: "/byte",
			text: "byte",
		},
		{
			path: "/date-difference",
			text: "dateDifference",
		},
		{
			path: "/molar-mass",
			text: "molarMass",
		},
		{
			path: "/stat",
			text: "statistics",
		},
		{
			path: "/quadratic-equation",
			text: "quadraticEquation",
		},
		{
			path: "/2var-linear-equations",
			text: "twoVariableLinearEquations",
		},
		{
			path: "/3var-linear-equations",
			text: "threeVariableLinearEquations",
		},
		{
			path: "/quadratic-function",
			text: "quadraticFunction",
		},
		{
			path: "/linear-formula",
			text: "linearFormula",
		},
		{
			path: "/quadratic-formula",
			text: "quadraticFormula",
		},
	];

	const navLinks = navItems.map((item) => {
		return (
			<NavLink
				className={getNavItemClassName}
				draggable={false}
				key={item.path}
				to={item.path}
				onClick={toggleSidebar}
			>
				{t(item.text)}
			</NavLink>
		);
	});

	return (
		<div
			className={clsx(
				styles["sidebar"],
				isSidebarShown && styles["shown"],
			)}
		>
			<nav className={styles["nav"]}>{navLinks}</nav>
			<Footer />
		</div>
	);
}

function getNavItemClassName({ isActive }: { isActive: boolean }): string {
	return clsx(styles["nav-item"], isActive && styles["active"]);
}

export default Sidebar;
