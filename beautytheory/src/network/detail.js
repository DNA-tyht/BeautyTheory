import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: "/recommend"
  })
}

//将信息封装为class
//商品信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
    this.checked = false;
  }
}
//商家信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
//商品参数信息
export class GoodsParam {
  constructor(info, rule) {
    //images可能没有值
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
