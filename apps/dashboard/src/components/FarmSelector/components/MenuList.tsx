import { useContext } from "react";
import { components, MenuListProps } from "react-select";
import { ModalsContext } from "@Context/ModalContext";
import BaseIcons from "@Icons/BaseIcons";
import { useTranslation } from "react-i18next";

export interface CustomMenuListProps extends MenuListProps {
	withAddButton: boolean;
}

const MenuList = (props: CustomMenuListProps): JSX.Element => {
	const { t } = useTranslation();
	const { setFarmCreateModalProps } = useContext(ModalsContext);
	const openCreateModal = (): void =>
		setFarmCreateModalProps({
			visibility: true,
			props: {},
		});
	const { children, withAddButton } = props;

	return (
		// eslint-disable-next-line
		<components.MenuList {...props}>
			{children}
			{withAddButton && (
				<div
					className="react-select__option custom-option"
					onClick={openCreateModal}
					role="button"
					tabIndex={0}
					onKeyDown={openCreateModal}
				>
					<BaseIcons.Plus width={24} height={24} />
					{t("components.farmSelector.addFarm")}
				</div>
			)}
		</components.MenuList>
	);
};

export default MenuList;
