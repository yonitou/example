import { useCallback, useContext } from "react";
import { MenuListProps } from "react-select";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ModalsContext } from "@Context/ModalContext";
import { UserContext } from "@Context/UserContext";
import BaseIcons from "@Icons/BaseIcons";
import SelectInput from "../SelectInput";
import DropdownIndicator from "./components/DropdownIndicator";
import MenuList, { CustomMenuListProps } from "./components/MenuList";
import SingleValue from "./components/SingleValue";
import Option from "./components/Option";
import Control from "./components/Control";

const StyledFarmSelectorWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
`;

const StyledFarmSelector = styled(SelectInput)<{ borderRadius: string }>`
	flex: 1;
	.react-select__control {
		height: 4rem;
		border: 1px solid var(--night-100);
		background-color: var(--night-100);
		border-radius: ${(props) => props.borderRadius};
		.react-select__value-container {
			.react-select__single-value {
				color: var(--white);
				display: flex;
				align-items: center;
				svg {
					margin-right: 0.8rem;
					overflow: visible;
				}
			}
		}
	}
	.react-select__placeholder {
		color: var(--white);
		svg {
			margin-right: 0.8em;
		}
	}

	.react-select__menu {
		.react-select__menu-list {
			.react-select__option {
				background-color: var(--night-100);
				color: var(--white);
				svg {
					margin-right: 0.8rem;
				}
				&.custom-option {
					padding: 0.8rem;
				}
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

const StyledEditButton = styled.div`
	height: 4rem;
	width: 4rem;
	background-color: var(--night-100);
	display: flex;
	align-items: center;
	justify-content: center;
	&.middle {
		margin: 0 0.2rem;
	}
	&.last {
		border-radius: 0px 8px 8px 0px;
	}
`;

interface FarmSelectorProps {
	crudActions: boolean;
	disabled?: boolean;
}

const FarmSelector = ({ crudActions, disabled = false }: FarmSelectorProps): JSX.Element => {
	const { t } = useTranslation();
	const { farms, defaultFarm, updateDefaultFarm, setLoading } = useContext(UserContext);
	const { setFarmUpdateModalProps, setFarmDeleteModalProps } = useContext(ModalsContext);

	const borderRadiusSelector = crudActions && defaultFarm ? "8px 0px 0px 8px" : "8px";

	const openDeleteModal = (): void => {
		setFarmDeleteModalProps({
			visibility: true,
			props: {},
		});
	};

	const openEditModal = (): void =>
		setFarmUpdateModalProps({
			visibility: true,
			props: {},
		});

	const onChange = async ({ value }: { value: string; label: string }): Promise<void> => {
		if (value) {
			setLoading(true);
			await updateDefaultFarm(farms.find((f) => f.id === parseInt(value, 10)));
			setLoading(false);
		}
	};

	const MemoizedMenuList = useCallback((withAddButton: boolean, menuListProps: MenuListProps): JSX.Element => {
		return (
			// eslint-disable-next-line
			<MenuList {...menuListProps} withAddButton={withAddButton} />
		);
	}, []);

	return (
		<StyledFarmSelectorWrapper>
			<StyledFarmSelector
				placeholder={
					<>
						<BaseIcons.Plus width={24} height={24} />
						<h3>{t("components.farmSelector.createFarm")}</h3>
					</>
				}
				name="farm"
				borderRadius={borderRadiusSelector}
				options={farms?.map((f) => ({ value: f.id.toString(), label: f.name }))}
				value={defaultFarm ? { value: defaultFarm.id.toString(), label: defaultFarm.name } : null}
				onChange={onChange}
				noOptionsMessage={() => t("components.farmSelector.noOptions")}
				components={{
					DropdownIndicator: !defaultFarm || disabled ? () => null : DropdownIndicator,
					SingleValue,
					Option,
					MenuList: (menuListProps: CustomMenuListProps) => MemoizedMenuList(crudActions, menuListProps),
					Control,
				}}
				disabled={disabled}
				openMenuOnClick={!!defaultFarm}
			/>
			{defaultFarm && crudActions && (
				<>
					<StyledEditButton onClick={openEditModal} className="middle">
						<BaseIcons.Pencil fill="white" width={17} />
					</StyledEditButton>

					<StyledEditButton className="last" onClick={openDeleteModal}>
						<BaseIcons.Trash fill="white" width={17} />
					</StyledEditButton>
				</>
			)}
		</StyledFarmSelectorWrapper>
	);
};

export default FarmSelector;
