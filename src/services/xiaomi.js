import miio from 'miio'

export const switchLight = async (address, token) => {
  try {
    let connection = await miio.device({ address: address, token: token })
    await connection.togglePower()
    await connection.destroy()
  } catch (error) {
    console.error(error)
  }
}
