import {cyan500, grey300, white, darkBlack, fullBlack} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";

export default {
  name: "YouShop",
  address: " Rue Robert Stumper, 2350 Luxembourg, Luxemburg",
  email: "privacy@example.com",
  logo: "https://www.specialprivacy.eu/images/ressources/SPECIAL_logos/special_logo_alpha.png",
  backgroundImage: "http://raschke.cc/content/backgrounds/1920x1280.jpg",
  description: "YouShop shopping",
  website: "https://www.youshop.example.com/",
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: "#2a99e8",
    primary2Color: "#dbac33",
    primary3Color: "#60db4c",
    accent1Color: "#e83c4d",
    accent2Color: "#dbac33",
    accent3Color: "#db6900",
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