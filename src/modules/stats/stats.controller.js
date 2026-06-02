import { getDashboardStats } from './stats.repository.js'
import { successResponse } from '../../shared/response.helper.js'

export const getDashboardStatsController = async (req, res, next) => {
  try {
    const stats = await getDashboardStats()
    successResponse(res, stats)
  } catch (error) {
    next(error)
  }
}