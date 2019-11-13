import {cyan500, grey300, white, darkBlack, fullBlack} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";

export default {
  name: "Telekom Laboratories Berlin",
  address: "Ernst-Reuter-Platz 7, 10587 Berlin",
  email: "privacy@telekom.de",
  logo: "https://laboratories.telekom.com/wp-content/uploads/2018/04/T-Labs_VERSALIEN-Logo.png",
  backgroundImage: "http://raschke.cc/content/backgrounds/1920x1280.jpg",
  website: "https://laboratories.telekom.com",
  description: "Telekom Innovation Laboratories (also called T-Labs) is the R&D unit of Deutsche Telekom and is in a close partnership with the Technische Universität Berlin. Here, at T-Labs, more than 300 international experts and scientists work together on blockchain technology, smart city concepts, artificial intelligence and new media experiences. At its sites in Berlin, Darmstadt, Budapest, Be'er Sheva (Israel) and Vienna, T-Labs sits amongst a world-class host of universities, startups, investors, research institutes and corporate innovation hubs to jointly shape the future of communication services. T-Labs are working since 2006 in close cooperation with the Ben-Gurion University of the Negev and other universities, such as the Berlin University of the Arts, the Eötvös Loránd University in Budapest, and the TU Wien (Austria).",
  spacing: spacing,
  fontFamily: 'TeleGroteskNext-Medium, Arial, sans-serif, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: "#E20074",
    primary2Color: "#E20074",
    primary3Color: "#E20074",
    accent1Color: "#333333",
    accent2Color: "#CCCCCC",
    accent3Color: "#666666",
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};