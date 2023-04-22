import { RootStackParamList } from "./StackNavigator";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
