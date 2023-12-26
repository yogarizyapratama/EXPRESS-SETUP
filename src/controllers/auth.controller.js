import { createUser, findUserbyEmail } from '../services/auth.service.js'
import { createUserValidation, loginValidation, refreshSessionValidation } from '../validations/auth.validation.js'
import { logger } from '../config/logger.js'
import { checkPassword, hashing } from '../config/hashing.js'
import { reIssueAccessToken, signJWT } from '../config/jwt.js'

export const registerUser = async (req, res) => {
  const { error, value } = createUserValidation(req.body)
  if (error) {
    logger.error('ERR: auth - register = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  try {
    value.password = `${hashing(value.password)}`
    await createUser(value)
    logger.info('Register successfully, please login')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Success register' })
  } catch (error) {
    logger.error('ERR: auth - regist = ', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message })
  }
}

export const createSession = async (req, res) => {
  const { error, value } = loginValidation(req.body)
  if (error) {
    logger.error('ERR: auth - login = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  try {
    const user = (await findUserbyEmail(value.email))

    if (!user) {
      return res.status(404).send({ status: false, statusCode: 404, message: 'User not found' })
    }

    const isValidPassword = checkPassword(value.password, user.password)

    if (!isValidPassword) {
      return res.status(401).send({ status: false, statusCode: 401, message: 'Invalid password' })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    const refreshToken = signJWT({ ...user }, { expiresIn: '1y' })
    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: 'login success', data: { accessToken, refreshToken } })
  } catch (error) {
    logger.error('ERR: auth - login = ', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message })
  }
}

export const refreshSession = async (req, res) => {
  const { error, value } = refreshSessionValidation(req.body)
  if (error) {
    logger.error('ERR: auth - refresh session = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  try {
    const refresh = await reIssueAccessToken(value.refreshToken)
    return res
      .status(200)
      .send({ status: true, statusCode: 200, message: 'refresh session success', data: { refresh } })
  } catch (error) {
    logger.error('ERR: auth - refresh session = ', error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message })
  }
}