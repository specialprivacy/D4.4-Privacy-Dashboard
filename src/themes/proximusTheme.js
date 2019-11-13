import {cyan500, grey300, white, darkBlack, fullBlack} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";

export default {
  name: "Proximus",
  address: "Boulevard du Roi Albert II, 27 - B-1030 Brussels.",
  email: "privacy@proximus.be",
  logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Proximus_logo_2014.svg",
  backgroundImage: "http://raschke.cc/content/backgrounds/1920x1280.jpg",
  website: "https://www.proximus.be",
  description: "The Proximus Group (previously known as Belgacom Group) is the largest telecommunications company in Belgium, headquartered in Brussels.[2] Proximus Group is primarily state owned, with the Belgian state holding 53.3% + 1 share. Proximus Group offerings include fixed line and mobile communications through the Proximus brand and ICT services to the professional market under the Telindus brand.",
  spacing: spacing,
  fontFamily: 'ProximusRegular, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: "#5C2D91",
    primary2Color: "#5C2D91",
    primary3Color: "#5C2D91",
    accent1Color: "#00BCEE",
    accent2Color: "#00BCEE",
    accent3Color: "#00BCEE",
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