import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    value: "+48 123 456 789",
    description: "Pon-Pt: 8:00 - 16:00"
  },
  {
    icon: Mail,
    title: "Email",
    value: "kontakt@czwartafaza.pl",
    description: "Odpowiadamy w 24h"
  },
  {
    icon: MapPin,
    title: "Adres",
    value: "ul. Przemysłowa 15",
    description: "00-000 Warszawa"
  },
  {
    icon: Clock,
    title: "Godziny Pracy",
    value: "Pon-Pt: 8:00 - 16:00",
    description: "Sobota: 8:00 - 13:00"
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Wiadomość wysłana!",
      description: "Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.",
    });
    
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              Kontakt
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
              Porozmawiajmy o Twoim Projekcie
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Masz pytania lub potrzebujesz wyceny? Skontaktuj się z nami – 
              nasi eksperci są do Twojej dyspozycji.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-background relative -mt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl shadow-card border border-border hover:shadow-elevated transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <info.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {info.title}
                </h3>
                <p className="text-foreground font-medium mb-1">
                  {info.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-steel-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Wyślij Wiadomość
              </h2>
              <p className="text-muted-foreground mb-8">
                Wypełnij formularz, a skontaktujemy się z Tobą w ciągu 24 godzin.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Imię i Nazwisko *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Jan Kowalski"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jan@firma.pl"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Telefon
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+48 123 456 789"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Firma
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nazwa firmy"
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Wiadomość *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Opisz swój projekt lub zapytanie..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-accent-foreground border-t-transparent" />
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      Wyślij Wiadomość
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Map & Info */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Nasza Lokalizacja
              </h2>
              <p className="text-muted-foreground mb-8">
                Zapraszamy do naszej siedziby. Przed wizytą prosimy o kontakt telefoniczny.
              </p>

              {/* Map Placeholder */}
              <div className="bg-primary rounded-2xl overflow-hidden h-80 mb-8 flex items-center justify-center">
                <div className="text-center px-8">
                  <MapPin className="h-16 w-16 text-accent mx-auto mb-4" />
                  <p className="text-primary-foreground font-heading font-semibold text-lg">
                    ul. Przemysłowa 15
                  </p>
                  <p className="text-primary-foreground/70">
                    00-000 Warszawa
                  </p>
                </div>
              </div>

              {/* Quick Benefits */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  Dlaczego Warto Nas Wybrać?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Bezpłatna wycena projektu",
                    "Doradztwo techniczne",
                    "Szybki czas realizacji",
                    "Gwarancja na wszystkie produkty"
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-semibold tracking-wide uppercase text-sm mb-4 block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Często Zadawane Pytania
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Jak długo trwa realizacja zamówienia?",
                a: "Czas realizacji zależy od złożoności projektu. Standardowe szafy sterownicze wykonujemy w 2-4 tygodnie. Bardziej skomplikowane projekty mogą wymagać 6-8 tygodni."
              },
              {
                q: "Czy oferujecie serwis gwarancyjny?",
                a: "Tak, wszystkie nasze produkty objęte są 24-miesięczną gwarancją. Oferujemy również serwis pogwarancyjny i umowy serwisowe."
              },
              {
                q: "Czy wykonujecie projekty na terenie całej Polski?",
                a: "Tak, realizujemy projekty na terenie całego kraju. Posiadamy mobilne ekipy montażowe, które wykonują instalacje u klienta."
              },
              {
                q: "Jak zamówić wycenę?",
                a: "Wystarczy wypełnić formularz kontaktowy lub zadzwonić do nas. Na podstawie przekazanych informacji przygotujemy bezpłatną wycenę w ciągu 2-3 dni roboczych."
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
