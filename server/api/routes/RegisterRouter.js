import express from 'express'

const router = express.Router()

const registerValidation = (payload) => {
  let errors = {}
  const emailRegex = /^[._\-A-z0-9]+@[\-A-z0-9]+?\.[a-z]+$/
  const passRegex = /^\S{8,20}$/
  const userRegex = /^(?=.{5,20}$)(?!.*[_.\-]{2})[a-zA-Z0-9._\-]+$/
  let isValid = true

  if (!payload.email || !emailRegex.test(payload.email)) {
    errors.email = 'Please, provide a valid email address'
    isValid = false
  }
  if (!payload.username || !userRegex.test(payload.username)) {
    errors.username = 'Please, provide a valid username. 5 - 20 characters, [._-] digits and letters'
    isValid = false
  }
  if (!payload.password || !passRegex.test(payload.password)) {
    errors.password = 'Please, provide a password between 8 and 20 characters'
    isValid = false
  }
  if (!payload.first_name) {
    errors.first_name = 'Please, provide your first name'
    isValid = false
  }
  if (!payload.last_name) {
    errors.last_name = 'Please, provide your last name'
    isValid = false
  }

  return {
    success: isValid,
    message: isValid ? '' : 'The form contains some errors. Please fix it',
    errors: errors
  }
}

router.post('/register', (req, res) => {
  const validation = registerValidation(req.body)

  if (!validation.success){
    return res.json(validation)
  }
  return res.send('Validation passes')
})

export default router