import md5 from 'md5'

export default function useMd5EncodeContent (content: any, key: string) {
  return md5(md5(content) + key)
}
