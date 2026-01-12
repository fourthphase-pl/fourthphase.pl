import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Wrench, Clock, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import heroImage from "@/assets/hero-industrial.jpg";
import cabinetImage from "@/assets/control-cabinet.jpg";

const features = [
  {
    icon: Shield,
    title: "Najwyższa Jakość",
    description: "Stosujemy wyłącznie certyfikowane komponenty renomowanych producentów."
  },
  {
    icon: Wrench,
    title: "Indywidualne Projekty",
    description: "Każda szafa jest projektowana zgodnie z wymaganiami klienta."
  },
  {
    icon: Clock,
    title: "Terminowa Realizacja",
    description: "Dotrzymujemy ustalonych terminów realizacji zamówień."
  },
  {
    icon: Award,
    title: "Certyfikaty",
    description: "Posiadamy wszystkie wymagane certyfikaty i uprawnienia."
  },
];

const stats = [
  { value: "15+", label: "Lat Doświadczenia" },
  { value: "500+", label: "Zrealizowanych Projektów" },
  { value: "100%", label: "Zadowolonych Klientów" },
  { value: "24/7", label: "Wsparcie Techniczne" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Nowoczesna hala produkcyjna szaf sterowniczych" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6 animate-fade-in">
              <Zap className="h-6 w-6 text-accent" />
              <span className="text-accent font-semibold tracking-wide uppercase text-sm">
                Profesjonalny Producent
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Szafy Sterownicze
              <span className="block text-gradient-electric mt-2">Najwyższej Jakości</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Czwarta Faza to wiodący producent szaf sterowniczych i rozdzielnic elektrycznych. 
              Oferujemy kompleksowe rozwiązania automatyki przemysłowej dopasowane do Twoich potrzeb.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/oferta">
                  Zobacz Ofertę
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/kontakt">
                  Skontaktuj Się
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-accent/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-electric-blue rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              Dlaczego My
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Profesjonalizm na Każdym Etapie
            </h2>
            <p className="text-muted-foreground text-lg">
              Od projektu po realizację - zapewniamy kompleksową obsługę i najwyższą jakość wykonania.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24 bg-steel-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
                Nasza Specjalizacja
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Szafy Sterownicze
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Projektujemy i produkujemy szafy sterownicze zgodnie z najwyższymi standardami 
                branżowymi. Każdy projekt jest realizowany z dbałością o szczegóły i z wykorzystaniem 
                najnowszych technologii.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Szafy dla systemów PLC/HMI",
                  "Rozdzielnice niskiego napięcia",
                  "Pulpity sterownicze",
                  "Szafy przemysłowe IP65/IP66"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="industrial" size="lg" asChild>
                <Link to="/oferta">
                  Poznaj Pełną Ofertę
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src={cabinetImage} 
                  alt="Szafa sterownicza z systemem PLC" 
                  className="rounded-2xl shadow-elevated w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-glow">
                  <div className="text-3xl font-heading font-bold">100%</div>
                  <div className="text-sm font-medium">Satysfakcji</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-accent rounded-full" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <Users className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
            Potrzebujesz Indywidualnej Wyceny?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8">
            Skontaktuj się z nami, a przygotujemy ofertę dopasowaną do Twoich potrzeb. 
            Nasi eksperci są do Twojej dyspozycji.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/kontakt">
              Zapytaj o Wycenę
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
