import Footer from "@/components/footer";
import { t } from "i18next";
import { JSX } from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

interface SidebarProps {
	showSidebar: boolean;
	toggleSidebar: () => void;
}

const slideIn = keyframes`
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0);
	}
`;

const StyledNav = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const StyledNavItem = styled(NavLink)`
	border-radius: var(--radius);
	color: inherit;
	cursor: pointer;
	display: block;
	line-height: 22px;
	padding: 8px 15px;
	text-decoration: none;
	transition: all 0.25s;
	word-break: break-word;

	&:hover {
		background-color: var(--fg-alpha-1);
	}

	&:active {
		color: var(--theme-color);
	}

	&.active {
		background-color: var(--theme-color);
		color: white;
	}
`;

const StyledSidebar = styled.div<{ $show?: boolean }>`
	border-right: var(--border);
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 5px;
	grid-area: sidebar;
	padding: 15px;

	@media screen and (max-width: 768px) {
		border-right: none;
		display: none;
	}
`;

const StyledVisibleSidebar = styled(StyledSidebar)`
	@media screen and (max-width: 768px) {
		animation: ${slideIn} 0.25s;
		display: flex;
	}
`;

function Sidebar({ showSidebar, toggleSidebar }: SidebarProps): JSX.Element {
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
			<StyledNavItem
				draggable={false}
				key={item.path}
				to={item.path}
				onClick={toggleSidebar}
			>
				{t(item.text)}
			</StyledNavItem>
		);
	});

	const Sidebar = showSidebar ? StyledVisibleSidebar : StyledSidebar;
	return (
		<Sidebar $show={showSidebar}>
			<StyledNav>{navLinks}</StyledNav>
			<Footer />
		</Sidebar>
	);
}

export default Sidebar;
