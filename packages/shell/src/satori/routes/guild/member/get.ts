import type { GuildMemberGetPayload } from '../../../types'
import type { RouteContext } from '../../types'

export const guildMemberGet = async ({
  cctx,
  path,
  req,
  res,
  json,
}: RouteContext) => {
  const payload = (await json()) as GuildMemberGetPayload

  const validateResult =
    await cctx.chronocat.validate('ChannelMutePayload')(payload)

  if (validateResult) {
    const err = `解析 ${path} 请求时出现问题，来自 ${req.socket.remoteAddress}。${validateResult}`

    cctx.chronocat.l.error(err, {
      code: 400,
    })

    res.writeHead(400)
    res.end(`400 bad request\n${err}`)
    return
  }

  return await cctx.chronocat.api['guild.member.get'](payload)
}
