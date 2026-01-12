import { Link } from "react-router-dom";
import { ArrowRight, Box, Cpu, Gauge, Settings, Zap, Shield, Cog, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import cabinetImage from "@/assets/control-cabinet.jpg";

const services = [
  {
    icon: Box,
    title: "Szafy Sterownicze",
    description: "Projektowanie i produkcja szaf sterowniczych dla systemów automatyki przemysłowej. Wykonujemy szafy zgodne z normami IEC, dostosowane do indywidualnych potrzeb klienta.",
    features: ["Szafy dla PLC/HMI", "Obudowy stalowe i nierdzewne", "Stopień ochrony IP54-IP66", "Chłodzenie i klimatyzacja"]
  },
  {
    icon: Zap,
    title: "Rozdzielnice Elektryczne",
    description: "Kompleksowe rozwiązania w zakresie rozdzielnic niskiego i średniego napięcia. Od projektu po montaż i uruchomienie.",
    features: ["Rozdzielnice nn do 4000A", "Kompensacja mocy biernej", "Systemy SZR", "Pomiary energii"]
  },
  {
    icon: Cpu,
    title: "Systemy PLC",
    description: "Programowanie i wdrażanie systemów sterowania opartych na sterownikach PLC wiodących producentów.",
    features: ["Siemens S7-1200/1500", "Allen Bradley", "Mitsubishi", "Schneider Electric"]
  },
  {
    icon: Monitor,
    title: "Wizualizacja HMI/SCADA",
    description: "Projektowanie interfejsów operatorskich i systemów nadzoru dla procesów przemysłowych.",
    features: ["Panele HMI", "Systemy SCADA", "Raportowanie", "Zdalny dostęp"]
  },
  {
    icon: Cog,
    title: "Automatyka Procesów",
    description: "Kompleksowa automatyzacja procesów produkcyjnych i technologicznych w różnych branżach przemysłu.",
    features: ["Linie produkcyjne", "Systemy transportu", "Dozowanie", "Pakowanie"]
  },
  {
    icon: Settings,
    title: "Serwis i Modernizacje",
    description: "Profesjonalny serwis istniejących instalacji oraz modernizacja starszych systemów automatyki.",
    features: ["Przeglądy okresowe", "Naprawy awaryjne", "Upgrade systemów", "Szkolenia"]
  },
];

const industries = [
  "Przemysł Spożywczy",
  "Przemysł Chemiczny",
  "Energetyka",
  "Gospodarka Wodna",
  "Przemysł Metalowy",
  "Budownictwo",
  "Farmacja",
  "Logistyka"
];

const Offer = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
                Nasza Oferta
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
                Kompleksowe Rozwiązania Automatyki
              </h1>
              <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
                Od projektu po wdrożenie – oferujemy pełen zakres usług w dziedzinie 
                automatyki przemysłowej i elektrotechniki. Nasze rozwiązania zwiększają 
                efektywność i bezpieczeństwo Twojej produkcji.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/kontakt">
                  Zapytaj o Wycenę
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="hidden lg:block">
              <img 
                src={cabinetImage} 
                alt="Szafa sterownicza" 
                className="rounded-2xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              Usługi
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Czym Się Zajmujemy
            </h2>
            <p className="text-muted-foreground text-lg">
              Oferujemy szeroki wachlarz usług – od projektowania po serwis i modernizacje.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-accent/30"
              >
                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-steel-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              Proces
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Jak Pracujemy
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Konsultacja", desc: "Analiza potrzeb i wymagań klienta" },
              { step: "02", title: "Projekt", desc: "Opracowanie dokumentacji technicznej" },
              { step: "03", title: "Produkcja", desc: "Wykonanie zgodnie z projektem" },
              { step: "04", title: "Wdrożenie", desc: "Montaż, uruchomienie i szkolenie" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-7xl font-heading font-bold text-accent/10 absolute -top-4 left-0">
                  {item.step}
                </div>
                <div className="pt-12">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              Branże
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
              Obsługujemy Różne Sektory
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Nasze doświadczenie obejmuje wiele branż przemysłu.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="px-6 py-4 bg-primary-foreground/5 rounded-full border border-accent/20 text-primary-foreground font-medium hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Guarantee */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
                Gwarancja Jakości
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Standardy, Które Gwarantujemy
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Każdy projekt realizujemy zgodnie z obowiązującymi normami i standardami, 
                zapewniając najwyższą jakość i bezpieczeństwo.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "Normy IEC", desc: "Zgodność z normami" },
                  { icon: Gauge, title: "Testy FAT", desc: "Testy fabryczne" },
                  { icon: Settings, title: "Dokumentacja", desc: "Pełna dokumentacja" },
                  { icon: Zap, title: "Gwarancja", desc: "24 miesiące" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary p-12 rounded-2xl text-center">
              <Gauge className="h-20 w-20 text-accent mx-auto mb-6" />
              <div className="text-6xl font-heading font-bold text-primary-foreground mb-4">
                100%
              </div>
              <p className="text-xl text-primary-foreground/80">
                Projektów zakończonych z sukcesem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent-foreground mb-6">
            Zainteresowany Współpracą?
          </h2>
          <p className="text-accent-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Skontaktuj się z nami, aby omówić Twój projekt. Bezpłatnie przygotujemy wstępną wycenę.
          </p>
          <Button variant="industrial" size="xl" asChild>
            <Link to="/kontakt">
              Skontaktuj Się
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Offer;
