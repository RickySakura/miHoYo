import mihoyo from '/public/data/mihoyo.json'
import headerLinks from '/public/data/headerlinks.json'
import bannerInfo from '/public/data/bannerinfo.json'

export function getMihoyoData() {
  return { value: mihoyo }
}

export function getHeaderLinks() {
  return headerLinks
}

export function getBannerInfo() {
  return bannerInfo
}