import { container, TYPES  } from './loaders'
import { Loader } from "./repositories/interfaces";

const loader = container.get<Loader>(TYPES.MainLoader)

loader.initialize()