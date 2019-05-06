import Typography from "typography"
import Doelger from "typography-theme-doelger"

const typography = new Typography(Doelger)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
