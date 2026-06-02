import QRCode from 'qrcode'
import { findLotByQrCode } from '../lots/lot.repository.js'
import { AppError } from '../../shared/AppError.js'

export const generateQrImage = async (qrCode) => {
  const lot = await findLotByQrCode(qrCode)
  if (!lot) throw new AppError('Lote no encontrado', 404)

  const url = `${process.env.PUBLIC_URL}/api/lots/public/${qrCode}`
  const qrImage = await QRCode.toDataURL(url)

  return { qrImage, url }
}