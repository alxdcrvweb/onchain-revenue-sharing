import { MutableRefObject } from "react"

export interface TeamItem {
	id: number,
	ref: MutableRefObject<HTMLDivElement | null>
	image: string,
	name: string,
	text: () => JSX.Element,
	mobileText: () => JSX.Element,
	socials: TeamItemSocial[] | []
}

export interface TeamItemSocial {
	id: number,
	icon: () => JSX.Element,
	link: string,
	nick: string
}