import r2wc from "@r2wc/react-to-web-component";
import TechWordle from "./TechWordle";

const WebTechWordle = r2wc(TechWordle, {
  shadow: "open",
});

customElements.define("tech-wordle", WebTechWordle);
