import { Link } from "react-router-dom";
import { Zap, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Zap className="h-8 w-8 text-accent" />
              <div className="flex flex-col">
                <span className="text-lg font-heading font-bold tracking-tight">
                  CZWARTA FAZA
                </span>
                <span className="text-xs text-industrial-steel tracking-widest uppercase">
                  Szafy Sterownicze
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Profesjonalny producent szaf sterowniczych i rozdzielnic elektrycznych.
              Kompleksowe rozwiązania automatyki przemysłowej.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-accent mb-6">Nawigacja</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Strona Główna
                </Link>
              </li>
              <li>
                <Link to="/o-nas" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  O Nas
                </Link>
              </li>
              <li>
                <Link to="/oferta" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Oferta
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-accent mb-6">Usługi</h4>
            <ul className="space-y-3">
              <li className="text-sm text-primary-foreground/70">Szafy Sterownicze</li>
              <li className="text-sm text-primary-foreground/70">Rozdzielnice Elektryczne</li>
              <li className="text-sm text-primary-foreground/70">Automatyka Przemysłowa</li>
              <li className="text-sm text-primary-foreground/70">Systemy PLC</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-accent mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">+48 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-primary-foreground/70">kontakt@czwartafaza.pl</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/70">
                  ul. Przemysłowa 15<br />
                  00-000 Warszawa
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Czwarta Faza. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/polityka-prywatnosci" className="text-sm text-primary-foreground/50 hover:text-accent transition-colors">
              Polityka Prywatności
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
