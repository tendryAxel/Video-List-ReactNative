import { useLocalSearchParams } from "expo-router"
import { ViewStyle } from "react-native"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "@/theme"
import { Text, Screen } from "@/components"

export default function VideoAbout() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { themed } = useAppTheme()

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <Text text={id} />
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
})
