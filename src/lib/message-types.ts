import { Image, Video, FileText, MapPin, Contact2, Smile, type LucideIcon } from 'lucide-react'
import { type TranslationKey } from '@/hooks/use-language'

export type MessageTypeInfo = {
  label: string
  translationKey: TranslationKey
  icon: LucideIcon
}

export const messageTypeConfig: Record<string, MessageTypeInfo> = {
  imageMessage: {
    label: 'image',
    translationKey: 'message_type_image',
    icon: Image,
  },
  videoMessage: {
    label: 'video',
    translationKey: 'message_type_video',
    icon: Video,
  },
  documentMessage: {
    label: 'document',
    translationKey: 'message_type_document',
    icon: FileText,
  },
  locationMessage: {
    label: 'location',
    translationKey: 'message_type_location',
    icon: MapPin,
  },
  contactMessage: {
    label: 'contact',
    translationKey: 'message_type_contact',
    icon: Contact2,
  },
  stickerMessage: {
    label: 'sticker',
    translationKey: 'message_type_sticker',
    icon: Smile,
  },
}

export const isUnsupportedMessageType = (type: string | null): boolean => {
  if (type === null) return false
  if (type === 'text' || type === 'audioMessage' || type === 'pttMessage') return false
  return type in messageTypeConfig
}
