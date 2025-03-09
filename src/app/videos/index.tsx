import { FlatList, View, ViewStyle } from "react-native"
import { Screen } from "@/components"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useContext } from "react"
import { MainContext } from "@/MainProvider"
import VideoAsListElement from "@/components/video/VideoAsListElement"

export default function WelcomeScreen() {
  const { themed } = useAppTheme()
  const { cachedVideos } = useContext(MainContext)

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={themed($container)}>
      <View style={themed($container)}>
        <FlatList
          data={cachedVideos}
          renderItem={({ item }) => <VideoAsListElement key={item.id} video={item} />}
          contentContainerStyle={themed($listVideos)}
        />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
})

const $listVideos: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  margin: spacing.sm,
  gap: spacing.sm,
})
