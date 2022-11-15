import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "@Constants/palette";
import BaseIcons from "@Icons/BaseIcons";
import { useTranslation } from "react-i18next";

interface PasswordStrengthProps {
	password: string;
}

const StyledPasswordStrength = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 740px) {
		flex-wrap: wrap;
		gap: 0.8rem;
	}
`;

const StyledRule = styled.div`
	display: flex;
	align-items: center;
	svg {
		margin-right: 0.8rem;
	}
	h5 {
		color: var(--night-50);
		&.success {
			color: var(--grass-100);
		}
	}
`;

const PasswordStrength = ({ password }: PasswordStrengthProps): JSX.Element => {
	const { t } = useTranslation();
	const [containsUppercase, setContainsUppercase] = useState<boolean>(false); // uppercase letter
	const [containsLowercase, setContainsLowercase] = useState<boolean>(false); // lowercase letter
	const [containsDigit, setContainsDigit] = useState<boolean>(false); // number
	const [contains8Chars, setContains8Chars] = useState<boolean>(false); // min 8 characters

	const rules = [
		[t("components.passwordStrength.uppercase"), containsUppercase],
		[t("components.passwordStrength.lowercase"), containsLowercase],
		[t("components.passwordStrength.digit"), containsDigit],
		[t("components.passwordStrength.minChars"), contains8Chars],
	];

	useEffect(() => {
		const validatePassword = (): void => {
			setContainsUppercase(password.toLowerCase() !== password);
			setContainsLowercase(password.toUpperCase() !== password);
			setContainsDigit(/\d/.test(password));
			setContains8Chars(password.length >= 8);
		};
		if (password) validatePassword();
		else {
			setContainsUppercase(false);
			setContainsLowercase(false);
			setContainsDigit(false);
			setContains8Chars(false);
		}
	}, [password, containsUppercase, containsLowercase, contains8Chars, containsDigit]);

	return (
		<StyledPasswordStrength>
			{rules.map((data, i) => {
				const key = `${data[0]}-${i}`;
				return (
					<StyledRule key={key}>
						<BaseIcons.Checkmark
							fill={data[1] ? COLORS.GRASS[100] : COLORS.NIGHT[50]}
							stroke={data[1] ? COLORS.GRASS[100] : COLORS.NIGHT[50]}
						/>
						<h5 className={data[1] ? "success" : null}>{data[0]}</h5>
					</StyledRule>
				);
			})}
		</StyledPasswordStrength>
	);
};

export default PasswordStrength;
