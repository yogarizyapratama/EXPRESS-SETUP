/* eslint-disable new-cap */
/* eslint-disable n/handle-callback-err */
import logAPIModel from '../models/logApi.model'
import os from 'os-utils'
import { logger } from '../config/logger'

const cpuMonitorMiddleware = async (req, res, next) => {
  const startTime = process.hrtime()

  res.on('finish', async () => {
    const elapsedHrTime = process.hrtime(startTime)
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6

    // Log API details and CPU usage to the database
    try {
      await logAPIModel.create({
        method: req.method,
        path: req.path,
        elapsedTimeInMs,
        cpuUsage: await getCpuUsage()
      })
      logger.info('sukses')

      // await logApi.save()
    } catch (error) {
      logger.error('Error saving to the database:', error.message)
    }
  })

  next()
}

const getCpuUsage = async () => {
  return await new Promise((resolve) => {
    os.cpuUsage((cpuUsage) => {
      resolve(cpuUsage)
    })
  })
}

export default cpuMonitorMiddleware