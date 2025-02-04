import { all, create } from "mathjs";

const math = create(all, {
	number: "BigNumber",
	precision: 64,
});

const globals = {
	bigNan: math.bignumber(NaN),
	math: math,
};

export default globals;
