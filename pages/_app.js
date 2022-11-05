import "../styles/globals.css";
import "../styles/Evernote.modules.css";
import { Provider } from "./components/Evernote/context/EvernoteContext";

function MyApp({ Component, pageProps }) {
	return (
		<Provider>
			<Component {...pageProps} />;
		</Provider>
	);
}

export default MyApp;
