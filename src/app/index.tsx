import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { Screen } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

const welcomeLogo = require("../../assets/images/logo.png")

export default function WelcomeScreen() {
  const { theme, themed } = useAppTheme()

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($container)}>
        <Image
          style={themed($logo)}
          source={welcomeLogo}
          resizeMode="contain"
          tintColor={theme.isDark ? theme.colors.palette.neutral900 : undefined}
        />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $logo: ThemedStyle<ImageStyle> = () => ({
  width: 100,
})
