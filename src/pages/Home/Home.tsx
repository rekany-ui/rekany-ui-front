import AboutSection from "./sections/AboutSection";
import CategoryTypeSection from "./sections/CategoryTypeSection";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import MethodologySection from "./sections/MethodologySection";
import ProductsCollection from "./sections/ProductsCollection";


export default function HomePage() {
    return (
        <>
            <Hero />
            <Features />
            <AboutSection />
            <ProductsCollection />
            <MethodologySection />
            <CategoryTypeSection />

        </>
    );
}
