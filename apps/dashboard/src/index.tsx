import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";

Sentry.init({
	dsn: "https://7594a658fc134c94811bbebc8722b309@o1077021.ingest.sentry.io/6274711",
	integrations: [new BrowserTracing()],
	tracesSampleRate: 0.3,
	environment: process.env.REACT_APP_ENV,
	enabled: process.env.REACT_APP_ENV === "staging" || process.env.REACT_APP_ENV === "production",
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
