import { container, TYPES  } from './loaders'
import { Loader } from "./repositories/interfaces";



(async () => {
  console.log(process.env)
  const loader = container.get<Loader>(TYPES.MainLoader)
  await loader.initialize()
})()