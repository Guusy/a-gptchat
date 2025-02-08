class AuthServiceImpl {

  getAuthUserDetails(): Promise<{ id: string }> {
    return Promise.resolve({ id: 'cm6wap5i900002845efpd0cce' })
  }
}
const authService = new AuthServiceImpl()

export default authService