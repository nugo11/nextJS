import "../assets/css/main.css";
import '../assets/css/bpg-glaho-web-caps.css'
import { AuthProvider } from "../componenets/login/authcontext";
import Header from "../componenets/Header";
import Footer from "../componenets/Footer";
import icon from '../assets/img/favicon.png'

export const metadata = {
  title:
    "Filmebi.in - ფილმები ქართულად | Filmebi Qartulad | სერიალები ქართულად | Serialebi Qartulad",
  description:
    "Filmebi.in - ახალი ფილმები და სერიალები ქართულად უფასოდ, უახლესი თურქული სერიალები ქართულად, axali filmebi da serialebi qartulad ufasod, pilmebi qartulad online, uaxlesi turquli serialebi qartulad",
  keywords:
    "ფილმები, სერიალები, ქართულად, თრეილერები, მსახიობები, ონლაინ, ყურება, უფასოდ, თურქული, უახლესი, Filmebi.in, ფილმები.ინ, filmebi, pilmebi, serialebi, qartulad, kartulad, online, treilerebi, msaxiobebi, yureba, ufasod, turquli, uaxlesi, Filmebi.in, filmebi.in",
  openGraph: {
    title:
      "ფილმები ქართულად | Filmebi Qartulad | სერიალები ქართულად | Serialebi Qartulad - Filmebi.in",
    description:
      "Filmebi.in - ახალი ფილმები და სერიალები ქართულად უფასოდ, უახლესი თურქული სერიალები ქართულად, axali filmebi da serialebi qartulad ufasod, pilmebi qartulad online, uaxlesi turquli serialebi qartulad",
    images: [
      {
        url: "/images/cover.webp",
        alt: "Filmebi Cover Image",
      },
    ],
    url: "https://Filmebi.in/",
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "FILMEBI.IN",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="ka" suppressHydrationWarning={true}>
       <head>
        <link rel="icon" href={icon.src} />
      </head>
      <body>
        <AuthProvider>
              <Header />
              {children}
              <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
