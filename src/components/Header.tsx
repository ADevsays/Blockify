import Button from "./Button";
import Logo from "./Logo";
import { Github } from 'react-bootstrap-icons';

export default function Header() {
    return (
        <header>
            <Logo />
            <a href="https://youtube.com" target='_blank'>
                <Button className="btn-primary">
                    Give me a Star in GitHub
                    <span>
                        <Github />
                    </span>
                </Button>
            </a>
        </header>
    );

}