import { useTranslation } from "react-i18next";
import styled from "styled-components";
import happyDeviceImg from "@Assets/devices/happy-device.png";

const StyledNoDeviceCard = styled.div`
	width: 50%;
	background-color: var(--white);
	border-radius: 0.4rem;
	display: flex;
	align-items: center;
	margin-bottom: 1.6rem;
	padding: 1.6rem 2.4rem;
	img {
		width: 8.6rem;
		height: 8.6rem;
		margin-right: 2.4rem;
	}
	.content {
		flex: 1;
		h2 {
			margin-bottom: 0.8rem;
		}
	}
`;

const DeviceCard = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<StyledNoDeviceCard>
			<img src={happyDeviceImg} alt={t("screens.deviceManagement.noDeviceCard.altImg")} />
			<div className="content">
				<h2>{t("screens.deviceManagement.noDeviceCard.title")}</h2>
				<h3>{t("screens.deviceManagement.noDeviceCard.description")}</h3>
			</div>
		</StyledNoDeviceCard>
	);
};

export default DeviceCard;
