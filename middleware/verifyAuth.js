import pkg from 'jsonwebtoken';
const { verify } = pkg;

// import { verify } from 'jsonwebtoken'
export default (req, res,next) => {
 const token = req.header('x-token')
 if(!token){
  return res.status(401).json({
   msg: 'no Token, access denied',
   success: false
  })
 }
try {
  const decoded  = verify(token, process.env.JWT_SECTET)
  req.user = decoded
  next()
 } catch (err) {
  res.status(400).json({
   msg: 'no Token, access denied',
   success: false
  })
 }
}