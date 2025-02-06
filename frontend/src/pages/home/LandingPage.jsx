import Section1 from "../../components/landing/Section1";
import Section2 from "../../components/landing/Section2";
import Section3 from "../../components/landing/Section3";
import Section4 from "../../components/landing/Section4";
import FAQSection from "../../components/landing/FAQSection";
import { Link } from "react-router-dom";

export default function LandingPage() {

    return (
        <>
            <div aria-hidden className="divider before:h-1.5 after:h-1.5 -mt-1"></div>
            <Section1 />
            <Link to="/movies">Movies</Link>

            <div aria-hidden className="divider before:h-1.5 after:h-1.5"></div>
            <Section2 />

            <div aria-hidden className="divider before:h-1.5 after:h-1.5"></div>
            <Section3 />

            <div aria-hidden className="divider before:h-1.5 after:h-1.5"></div>
            <Section4 />

            <div aria-hidden className="divider before:h-1.5 after:h-1.5"></div>
            <FAQSection />
        </>
    )
}
