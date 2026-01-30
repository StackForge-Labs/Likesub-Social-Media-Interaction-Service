import ServicesPricingCardModern from "@/components/client/client-panel/ServicePricingCardsModern";
import Benefits from "@/components/client/landing-page/Benefits";
import Clients from "@/components/client/landing-page/Clients";
import Faq from "@/components/client/landing-page/Faq";
import Feedback from "@/components/client/landing-page/Feedback";
import Hero from "@/components/client/landing-page/Hero";
import Footer from "@/layouts/client/landing-page/Footer";
import Header from "@/layouts/client/landing-page/Header";

async function delayHomePage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { title: "Addons" };
}

export default async function Home() {
  const data = await delayHomePage();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Benefits />
      <Faq />
      <Feedback />
      <ServicesPricingCardModern />
      <Clients />
      <Footer />
    </div>
  );
}
