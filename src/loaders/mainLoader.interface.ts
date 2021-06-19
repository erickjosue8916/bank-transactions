import { EnvironmentDefinition } from "../repositories/interfaces";

export interface Loader {
  initialize(env: EnvironmentDefinition)
}