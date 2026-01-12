import { CheckCircle, Target, Eye, Award, Users, Building } from "lucide-react";
import Layout from "@/components/layout/Layout";
import teamImage from "@/assets/team-work.jpg";

const values = [
  {
    icon: Award,
    title: "Jakość",
    description: "Stosujemy najwyższe standardy w każdym aspekcie naszej działalności."
  },
  {
    icon: Users,
    title: "Partnerstwo",
    description: "Budujemy długotrwałe relacje oparte na zaufaniu i współpracy."
  },
  {
    icon: Target,
    title: "Innowacyjność",
    description: "Stale rozwijamy nasze kompetencje i wdrażamy nowe technologie."
  },
];

const milestones = [
  { year: "2008", title: "Założenie Firmy", description: "Rozpoczęcie działalności w branży automatyki przemysłowej." },
  { year: "2012", title: "Rozbudowa Zakładu", description: "Oddanie do użytku nowej hali produkcyjnej o powierzchni 2000m²." },
  { year: "2016", title: "Certyfikacja ISO", description: "Uzyskanie certyfikatu ISO 9001:2015 potwierdzającego jakość." },
  { year: "2020", title: "500+ Projektów", description: "Przekroczenie 500 zrealizowanych projektów dla klientów." },
  { year: "2024", title: "Ekspansja", description: "Rozszerzenie działalności na rynki europejskie." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              O Nas
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
              Czwarta Faza – Twój Partner w Automatyce
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Od ponad 15 lat dostarczamy profesjonalne rozwiązania w zakresie szaf sterowniczych 
              i automatyki przemysłowej. Nasza pasja do technologii i dbałość o jakość sprawiają, 
              że jesteśmy wybierani przez wiodące firmy przemysłowe.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src={teamImage} 
                alt="Zespół Czwarta Faza" 
                className="rounded-2xl shadow-elevated w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Kim Jesteśmy?
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Czwarta Faza to zespół doświadczonych inżynierów i specjalistów, którzy łączą 
                wiedzę techniczną z praktycznym doświadczeniem w realizacji projektów 
                dla różnych branż przemysłu.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Specjalizujemy się w projektowaniu, produkcji i montażu szaf sterowniczych, 
                rozdzielnic elektrycznych oraz kompleksowych systemów automatyki przemysłowej.
              </p>
              <ul className="space-y-4">
                {[
                  "Własny dział projektowy i techniczny",
                  "Nowoczesny park maszynowy",
                  "Wykwalifikowana kadra z uprawnieniami SEP",
                  "Serwis gwarancyjny i pogwarancyjny"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-steel-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card p-10 rounded-2xl shadow-card border border-border">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Nasza Misja
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Dostarczać naszym klientom najwyższej jakości rozwiązania w zakresie automatyki 
                przemysłowej, które zwiększają efektywność i bezpieczeństwo ich procesów 
                produkcyjnych. Stawiamy na innowacje i ciągły rozwój, aby sprostać 
                najbardziej wymagającym wyzwaniom technologicznym.
              </p>
            </div>
            <div className="bg-card p-10 rounded-2xl shadow-card border border-border">
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Nasza Wizja
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Być liderem w branży automatyki przemysłowej w Polsce i rozpoznawalnym partnerem 
                na rynkach europejskich. Dążymy do tego, by nazwa Czwarta Faza była synonimem 
                niezawodności, profesjonalizmu i innowacyjnych rozwiązań technicznych.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              Nasze Wartości
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Fundamenty Naszego Działania
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-8"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              Nasza Historia
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
              Lata Doświadczenia
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 -translate-x-1/2" />
              
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-20 md:pl-0`}>
                    <div className="bg-primary-foreground/5 p-6 rounded-xl border border-accent/20">
                      <div className="text-accent font-heading font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-primary-foreground mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-primary-foreground/70">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1/2 shadow-glow" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
            Certyfikaty
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">
            Gwarancja Jakości
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {["ISO 9001:2015", "CE", "SEP", "UDT"].map((cert, index) => (
              <div 
                key={index}
                className="px-8 py-6 bg-card rounded-xl shadow-card border border-border flex items-center gap-3"
              >
                <Building className="h-6 w-6 text-accent" />
                <span className="font-heading font-semibold text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
