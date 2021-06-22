import { container, TYPES  } from './loaders'
import { Loader } from "./repositories/interfaces";



(async () => {
  const loader = container.get<Loader>(TYPES.MainLoader)
  await loader.initialize()
})()