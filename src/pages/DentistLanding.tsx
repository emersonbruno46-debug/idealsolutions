import Header from "../components/odonto/Header";
import HeroSection from "../components/odonto/HeroSection";
import FormSection from "../components/odonto/FormSection";
import CaseSection from "../components/odonto/CaseSection";
import AboutSection from "../components/odonto/AboutSection";
import MethodSection from "../components/odonto/MethodSection";
import SolutionsSection from "../components/odonto/SolutionsSection";
import FaqSection from "../components/odonto/FaqSection";
import Footer from "../components/odonto/Footer";
import MobileStickyCTA from "../components/odonto/MobileStickyCTA";

export default function DentistLanding() {
  return (
    <div className="min-h-screen bg-[#F7F7F3] text-[#111111] selection:bg-[#FFD400]/40 font-sans">
      <Header />
      <main>
        <HeroSection />
        <FormSection />
        <CaseSection />
        <AboutSection />
        <MethodSection />
        <SolutionsSection />
        <FaqSection />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
