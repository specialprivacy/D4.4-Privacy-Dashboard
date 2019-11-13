import {cyan500, grey300, white, darkBlack, fullBlack} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";

export default {
  name: "SPECIAL",
  address: " Rue Robert Stumper, 2350 Luxembourg, Luxemburg",
  email: "privacy@specialprivacy.eu",
  logo: "https://www.specialprivacy.eu/images/ressources/SPECIAL_logos/special_logo_alpha.png",
  backgroundImage: "http://raschke.cc/content/backgrounds/1920x1280.jpg",
  description: "The SPECIAL (Scalable Policy-aware Linked Data Architecture For Privacy, Transparency and Compliance) project is a Research and Innovation Action funded under the H2020-ICT-2016-1 Big Data PPP call (Privacy-preserving Big Data technologies, ICT-18-2016). The project started on the 1st of January 2017 and will continue for three years.",
  website: "https://www.specialprivacy.eu/",
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: "#239ADB",
    primary2Color: "#239ADB",
    primary3Color: "#239ADB",
    accent1Color: "rgb(244, 2, 137)",
    accent2Color: "rgb(244, 2, 137)",
    accent3Color: "rgb(244, 2, 137)",
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