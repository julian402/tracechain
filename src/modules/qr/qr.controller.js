import { generateQrImage } from './qr.service.js'
import { successResponse } from '../../shared/response.helper.js'

export const getQrController = async (req, res, next) => {
  try {
    const result = await generateQrImage(req.params.qrCode)
    successResponse(res, result)
  } catch (error) {
    next(error)
  }
}