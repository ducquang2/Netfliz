const userM = require('../models/user.m')
const CryptoJS = require('crypto-js')
const hashLength = 64
const { getClient, db } = require('../.config/postgres')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'netfliz9910@gmail.com',
    pass: 'opcvislcrmjubnhk',
  },
})
module.exports = {
  mailAuthorize: async (req, res, next) => {
    console.log(req.params.token)
    const token = req.params.token
    console.log(token)
    jwt.verify(token, 'secret', async (err, decoded) => {
      if (err) {
        throw new Error()
      } else {
        console.log(decoded)
        const { username, hashedPassword, email } = decoded
        const token = jwt.sign(
          {
            username,
            hashedPassword,
            email,
          },
          'secret',
        )
        const rs = await userM.addToken({
          username,
          hashedPassword,
          email,
          token,
        })
        if (rs) {
          res.status(200).end(`Authen success`)
        } else {
          res.status(200).end(`Authen failed`)
        }
      }
    })
  },
  registerUser: async (req, res, next) => {
    try {
      const { username, password, email, permission } = req.body
      const salt = username

      const pwSalt = password + salt
      const hashedPassword = CryptoJS.SHA256(pwSalt, {
        outputLength: hashLength * 4,
      }).toString(CryptoJS.enc.Hex)

      console.log(username, hashedPassword, email, permission)
      const rs = await userM.registerUser(
        username,
        hashedPassword,
        email,
        permission,
      )

      if (rs == false) {
        res.status(200).send({
          data: rs,
          message: 'valid username',
        })
      } else {
        const token = jwt.sign(
          {
            username,
            hashedPassword,
            email,
          },
          'secret',
        )

        var content = ` <div style="padding:0;margin:0;height:100%;width:100%;font-family:Arial,'Times New Roman','Calibri'">
      <div style="margin:0 auto;max-width:600px;display:block;font-family:inherit">
      <table cellpadding="0" cellspacing="0" style="padding:0;border-spacing:0;background:#f0f0f0;border:0;margin:0;text-align:center;vertical-align:middle;font-weight:500;table-layout:fixed;border-collapse:collapse;height:100%;width:100%;line-height:100%" width="100%" height="100%" align="center" valign="middle">
      <tbody>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td style="margin:0;padding:0;border:none;border-spacing:0;background:#f0f0f0;border-collapse:collapse;font-family:inherit">
      <table cellpadding="0" cellspacing="0" style="margin:0;border-spacing:0;border:0;padding:0;width:100%;border-collapse:collapse" width="100%">
      <tbody>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%">
      <tbody style="display:flex;justify-content:center;width:100%;">
      <tr style="margin:0;padding:10px 0px;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit;margin:auto;">
      <td class="m_-7810148317481508755dnXDPa" style="margin:0;padding:0;border:none;border-spacing:0;background:center;background-color:black;background-image:url(https://www.netfliz.live/logo.png);width:110px;height:110px;text-align:center;border-collapse:collapse;font-family:inherit;background-repeat:no-repeat;border-radius:25%" ></td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:24px;border-collapse:collapse;font-family:inherit" height="24">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%">
      <tbody>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td class="m_-7810148317481508755hTfFsy" style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
      <div class="m_-7810148317481508755hTfFsy" style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
      </td>
      <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <a style="font-size:32px;font-weight:500;letter-spacing:0.01em;color:#141212;text-align:center;line-height:39px;margin:0;font-family:inherit">XÁC MINH EMAIL</a>
      </td>
      <td class="m_-7810148317481508755hTfFsy" style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
      <div class="m_-7810148317481508755hTfFsy" style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%">
      <tbody>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td colspan="3" style="margin:0;padding:0;border:none;border-spacing:0;height:64px;border-collapse:collapse;font-family:inherit" height="64">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td class="m_-7810148317481508755hTfFsy" style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
      <div class="m_-7810148317481508755hTfFsy" style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
      </td>
      <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;background-color:#f9f9f9;border-collapse:collapse" width="100%" bgcolor="#F9F9F9">
      <tbody>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td colspan="3" style="margin:0;padding:0;border:none;border-spacing:0;height:40px;border-collapse:collapse;font-family:inherit" height="40">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td class="m_-7810148317481508755gkvQUv" style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:38px;border-collapse:collapse;font-family:inherit" width="38" height="100%">
      <div class="m_-7810148317481508755gkvQUv" style="height:100%;overflow:hidden;width:38px;font-family:inherit"></div>
      </td>
      <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;table-layout:fixed;border-collapse:collapse" width="100%">
      <tbody>
      <tr>
      <td>
      <p style="margin:0;padding:0;font-weight:500;font-size:18px;line-height:140%;letter-spacing:-0.01em;color:#666;margin-top:8px;font-family:inherit">Xin chào ${username}, <br>
      <br>Vui lòng lựa chọn nút bên dưới để xác minh địa chỉ email Tài Khoản Netfliz của bạn. Việc xác minh địa chỉ email sẽ đảm bảo thêm một lớp bảo mật cho tài khoản của bạn. Cung cấp thông tin chính xác sẽ giúp bạn nhận được hỗ trợ về tài khoản dễ dàng hơn khi cần.
      </p>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td colspan="1" style="margin:0;padding:0;border:none;border-spacing:0;height:40px;border-collapse:collapse;font-family:inherit" height="40">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <div style="font-family:inherit">
      <a style="background: #CD0574;min-width: 300px;border-radius: 12.8px;padding: 25.5px 19px 26.5px 19px;text-align: center;font-size: 18px;font-weight: 700;color: #f9f9f9;display: inline-block;text-decoration: none;line-height: 120%;}" href="https://netflizservera.onrender.com/authen/${token}">XÁC MINH EMAIL</a>
      </div>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      <td class="m_-7810148317481508755gkvQUv" style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:38px;border-collapse:collapse;font-family:inherit" width="38" height="100%">
      <div class="m_-7810148317481508755gkvQUv" style="height:100%;overflow:hidden;width:38px;font-family:inherit"></div>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td colspan="3" style="margin:0;padding:0;border:none;border-spacing:0;height:48px;border-collapse:collapse;font-family:inherit" height="48">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      <td class="m_-7810148317481508755hTfFsy" style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:72px;border-collapse:collapse;font-family:inherit" width="72" height="100%">
      <div class="m_-7810148317481508755hTfFsy" style="height:100%;overflow:hidden;width:72px;font-family:inherit"></div>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td colspan="3" style="margin:0;padding:0;border:none;border-spacing:0;height:48px;border-collapse:collapse;font-family:inherit" height="48">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">
      <table cellpadding="0" cellspacing="0" style="margin:0;padding:0;border:none;border-spacing:0;width:100%;font-size:16px;text-align:center;line-height:140%;letter-spacing:-0.01em;color:#666;border-collapse:collapse" width="100%" align="center">
      <tbody>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td class="m_-7810148317481508755kETegz" style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:100px;border-collapse:collapse;font-family:inherit" width="100" height="100%">
      <div class="m_-7810148317481508755kETegz" style="height:100%;overflow:hidden;width:100px;font-family:inherit"></div>
      </td>
      <td style="margin:0;padding:0;border:none;border-spacing:0;text-align:center;border-collapse:collapse;font-family:inherit" align="center">Để biết thêm thông tin về tài khoản của bạn - vui lòng truy cập trang <a href="http://localhost:3000/users/authen/${token}"> </a> của bạn. </td>
      <td class="m_-7810148317481508755kETegz" style="margin:0;padding:0;border:none;border-spacing:0;height:100%;overflow:hidden;width:100px;border-collapse:collapse;font-family:inherit" width="100" height="100%">
      <div class="m_-7810148317481508755kETegz" style="height:100%;overflow:hidden;width:100px;font-family:inherit"></div>
      </td>
      </tr>
      <tr style="margin:0;padding:0;border:none;border-spacing:0;border-collapse:collapse;font-family:inherit">
      <td colspan="3" style="margin:0;padding:0;border:none;border-spacing:0;height:80px;border-collapse:collapse;font-family:inherit" height="80">
      <table style="margin:0;padding:0;border:none;border-spacing:0;width:100%;border-collapse:collapse" width="100%"></table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>`
        var mainOptions = {
          // thiết lập đối tượng, nội dung gửi mail
          from: 'Netfliz',
          to: `${email}`,
          subject: 'Netfliz authenication',
          text: 'Your text is here', //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
          html: content, //Nội dung html mình đã tạo trên kia :))
        }
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err)
            throw err
          } else {
            return res.status(200).send({
              data: rs,
              message: 'success',
            })
          }
        })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  loginUser: async (req, res, next) => {
    try {
      console.log(req.body)
      const { username, password } = req.body
      const salt = username
      const pwSalt = password + salt

      const hashedPassword = CryptoJS.SHA256(pwSalt, {
        outputLength: hashLength * 4,
      }).toString(CryptoJS.enc.Hex)

      const rs = await userM.loginUser(username, hashedPassword)

      if (!rs) {
        return res.status(200).send({
          data: rs,
          message: 'Invalid username or password',
        })
      }
      if (!rs.token.lenth == 0) {
        return res.status(200).send({
          data: rs,
          message: 'Please authorize your email',
        })
      }
      const user = rs
      // if (req.body.remember=="true") {
      //     var hour = 3600000;
      //     req.session.cookie.maxAge = 14 * 24 * hour; //2 weeks
      // } else {
      //     req.session.cookie.expires = false;
      // }
      // req.session.regenerate(function (err) {
      //     if (err) next(err)

      //     req.session.uid = user.uid;
      //     req.session.username=username;
      //     req.session.permission = user.permission;

      // req.session.save(function (err) {
      //     if (err) return next(err)

      return res.status(200).send({
        data: user.uid,
        permission: user.permission,
        message: 'success',
      })

      // })
      // })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  userAuthentication: async (req, res, next) => {
    //console.log(req.session);
    try {
      console.log(req.headers)
      const { uid } = req.headers
      if (uid != null) {
        const rs = await userM.checkAuthen(uid)
        console.log(rs)

        res.status(200).send({
          permission: rs.permission,
        })
      } else {
        res.redirect('/')
      }
    } catch (e) {
      res.redirect('/')
    }
  },
  changePassword: async (req, res, next) => {
    try {
      console.log(req.body)
      const { uid, password, newpassword } = req.body

      const rs = await userM.changePassword({ uid, password, newpassword })
      console.log(rs)

      res.status(200).send({
        result: rs,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const { uid } = req.body

      const rs = await userM.getUser({ uid })
      console.log(rs)

      res.status(200).send({
        data: rs,
        message: 'success',
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
  changePermission: async (req, res, next) => {
    try {
      const { changePermission, username, password } = req.body

      const salt = username
      const pwSalt = password + salt

      const hashedPassword = CryptoJS.SHA256(pwSalt, {
        outputLength: hashLength * 4,
      }).toString(CryptoJS.enc.Hex)

      const rs = await userM.loginUser(username, hashedPassword)
      console.log(rs)
      let change = false
      const reg = await userM.getUser({ uid: rs.uid })
      if (rs.permission) {
        change = await userM.changePermission({ listUid: changePermission })
      }

      if (change) {
        res.status(200).send({
          data: reg,
          message: 'success',
        })
      } else {
        res.status(200).send({
          message: 'failed',
        })
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  },
}
