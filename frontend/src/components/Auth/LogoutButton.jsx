import { Button } from '@chakra-ui/button'
import { useSetRecoilState } from 'recoil'

import { FiLogOut } from 'react-icons/fi'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'
import { Flex, Text } from '@chakra-ui/react'

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom)
  const showToast = useShowToast()

  const handleLogout = async () => {
    try {
      const res = await fetch('https://emis-backend-two.vercel.app/v1/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
credentials: "include",
      })
      const data = await res.json()

      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }

      localStorage.removeItem('user-taskmanajemen')
      setUser(null)
      showToast('Success', 'Logged out successfully', 'success')
    } catch (error) {
      showToast('Error', error, 'error')
    }
  }
  return (
    <Flex gap={2} alignItems={'center'}>
      <Button size={'sm'} onClick={handleLogout}>
        <FiLogOut size={20} />
      </Button>
      <Text>Logout</Text>
    </Flex>
  )
}

export default LogoutButton
