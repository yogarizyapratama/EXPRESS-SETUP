/* eslint-disable @typescript-eslint/ban-types */
import jwt from 'jsonwebtoken'
import CONFIG from './environment.js'
import { findUserbyEmail } from '../services/auth.service.js'

export const signJWT = (payload, options) => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJWT = (token) => {
  try {
    const decode = jwt.verify(token, CONFIG.jwt_public)
    return {
      valid: true,
      expired: false,
      decoded: decode
    }
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt is expired or not eligible to use',
      decoded: null
    }
  }
}

export const reIssueAccessToken = async (refreshToken) => {
  const { decoded } = verifyJWT(refreshToken)
  const user = await findUserbyEmail(decoded._doc.email)
  if (!user) return false

  const accessToken = signJWT(
    {
      ...user
    },
    { expiresIn: '1d' }
  )

  return accessToken
}