export const notFound =  (_req, res) => {
  return res.status(404).json({ status: 404, message: `Unable to find endpoint` })
}
