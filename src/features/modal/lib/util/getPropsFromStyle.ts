import { WidowCoords } from '@/shared/store/modal-store';

type Props = Partial<Record<keyof WidowCoords, string>>

export const getPropsFromStyle = (keys: (keyof WidowCoords)[], style: CSSStyleDeclaration | null): Props | null  => {
  const props: Props = {}

  if (!keys.length && style === null) return null;

  for(const key of keys) {
    props[key] = style?.[key]
  }

  return props
}