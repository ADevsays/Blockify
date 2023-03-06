import { ImgStateProvider } from "../globalStateImg";
import { PixelSizeProvider } from "../globalStatePixelSize";
import ContentRender from "./ContentRender";
import Header from "./Header";


export default function Main() {

    return (
        <main className="container">
            <Header />
            <ImgStateProvider>
            <PixelSizeProvider>
                <ContentRender/>
            </PixelSizeProvider>
            </ImgStateProvider>
        </main>
    );
}