import { container, TYPES, MainLoader, Loader } from './loaders'
import { environment } from "./config/environment"
import { EnvironmentDefinition } from "./repositories/interfaces";

const loader = container.get<Loader>(TYPES.MainLoader)

loader.initialize(environment as EnvironmentDefinition)