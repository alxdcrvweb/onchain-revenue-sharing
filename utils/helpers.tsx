import axios, { AxiosResponse } from "axios";
import { RefObject } from "react";

export const mouseMoveHandler = (
  e: globalThis.MouseEvent,
  ref: RefObject<HTMLDivElement | HTMLElement>
) => {
  if (!ref.current) return;

  ref.current.querySelectorAll(".paralaxItem")?.forEach((image: any) => {
    const speed: any = image.getAttribute("data-speed");
    const x = ((window.innerWidth / 2 - e.pageX) * speed) / 120;
    const y = ((window.innerHeight / 2 - e.pageY) * speed) / 30;
    image.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });

  ref.current.querySelectorAll(".eye")?.forEach((eye: any) => {
    const pupil = eye.querySelector(".pupil");

    if (pupil) {
      // pupil.style.transform = `translateX(${-(window.innerWidth / 2 - e.pageX) / 50}px) translateY(${(e.pageY - (eye.offsetTop / 2) - (eye.offsetHeight / 2)) / 20}px)`
      // pupil.style.transform = `translateX(${-(window.innerWidth / 2 - e.pageX) / 50}px) translateY(${e.pageY - (eye.offsetTop + (eye.offsetHeight / 2))}px)`
      pupil.style.transform = `translateX(${
        -(window.innerWidth / 2 - e.pageX) / 50
      }px) translateY(${
        (e.pageY - (eye.offsetHeight / 2 + eye.offsetTop)) / 20
      }px)`;
    }
  });
};
export function getAuthCode(
  address: string,
  callback: (data: any, raw: AxiosResponse) => any,
  errorCallback: any
) {
  axios
    .get(backendUrl + `api/v1/eauth/${address}`)
    .then((r) => callback(r.data, r))
    .catch(errorCallback);
}
export const backendUrl = 'https://db.onchaingate.io/'
export function getJWT(
  sign: string,
  msg: string,
  callback: (data: any, raw: AxiosResponse) => any,
  errorCallback: any
) {
  axios
    .get(backendUrl + `api/v1/eauth/${msg}/${sign.trim()}`)
    .then((r) => callback(r.data, r))
    .catch(errorCallback);
}
