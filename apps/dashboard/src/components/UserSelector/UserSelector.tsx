import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AuthContext } from "@Context/AuthContext";

import { UserContext } from "@Context/UserContext";
import { coopUsertype, userType } from "@Types/user.types";
import SelectInput from "@Components/SelectInput";
import DropdownIndicator from "./components/DropdownIndicator";
import ValueContainer from "./components/ValueContainer";
import Option from "./components/Option";

const StyledUserSelector = styled(SelectInput)`
	flex: 1;

	.react-select__control {
		height: 4rem;
		border: 1px solid var(--night-100);
		background-color: var(--night-100);
		border-radius: 0.8rem;
		.react-select__value-container {
			padding-left: 4rem;
			> svg {
				position: absolute;
				left: 0.8rem;
			}
			.react-select__single-value,
			.react-select__input-container {
				color: var(--white);
			}
		}
	}
	.react-select__placeholder {
		color: var(--white);
	}
	.react-select__menu {
		svg {
			margin-right: 0.8em;
		}
		.react-select__menu-list {
			.react-select__option {
				background-color: var(--night-100);
				color: var(--white);
				&:hover {
					background-color: var(--night-50);
				}
			}
			.react-select__menu-notice {
				background-color: var(--night-100);
			}
		}
	}
`;

const UserSelector = (): JSX.Element => {
	const { t } = useTranslation();
	const { coopUsers } = useContext(UserContext);
	const { user, signInAsUser, farmerSelected } = useContext(AuthContext);
	const navigate = useNavigate();

	const onChange = async ({ value }: { value: string; label: string }): Promise<void> => {
		await signInAsUser(value);
		navigate("/");
	};

	const username = (u: userType | coopUsertype): string => `${u.firstName} ${u.lastName}`;

	if (!coopUsers?.length) return null;
	return (
		<StyledUserSelector
			placeholder={<h3>{t("common.inputs.user.placeholder")}</h3>}
			name="user"
			options={coopUsers?.map((u) => ({ value: u.id.toString(), label: username(u) }))}
			value={farmerSelected ? { value: user?.userId.toString(), label: username(user) } : null}
			onChange={onChange}
			noOptionsMessage={() => t("components.userSelector.noOptions")}
			searchable
			components={{
				DropdownIndicator,
				ValueContainer,
				Option,
			}}
		/>
	);
};

export default UserSelector;
