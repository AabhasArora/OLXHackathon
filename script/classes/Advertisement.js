/**
 * Created by Aabhas Arora on 26-09-2015.
 */
function Advertisement(ad) {
    this.advertisementTitle = ad.adTitle;
    this.advertisementCoordinates = new Point(ad.adLatitude, ad.adLongitude);
    this.price = ad.adPrice;
};

Advertisement.prototype.filterAction = function () {

};