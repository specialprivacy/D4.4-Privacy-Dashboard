import React from 'react';

export const data = {
  "http://www.specialprivacy.eu/vocabs/data#Name": "name",
  "http://www.specialprivacy.eu/vocabs/data#Adress": "address",
  "http://www.specialprivacy.eu/vocabs/data#CreditCard": "credit card",
  "http://www.specialprivacy.eu/vocabs/data#Location": "location",
  "http://www.specialprivacy.eu/vocabs/data#Wishlist": "wishlist",
  "http://www.specialprivacy.eu/vocabs/data#ShoppingCartItems": "items in your shopping cart",
  "http://www.specialprivacy.eu/vocabs/data#BrowsingHistory": "browsing history",
  "http://www.specialprivacy.eu/vocabs/data#ArticlesViewed": "articles viewed",
  "http://www.specialprivacy.eu/vocabs/data#TimeSpentOnArticle": "time spent on an article page",
  "http://www.specialprivacy.eu/vocabs/data#BrowserType": "browser type",
  "http://www.specialprivacy.eu/vocabs/data#BoughtProducts": "bought products",
  "http://www.specialprivacy.eu/vocabs/data#Reviews": "product reviews",
};

export const storage = {
  "http://www.specialprivacy.eu/vocabs/locations#Germany": "Germany",
  "http://www.specialprivacy.eu/vocabs/locations#Australia": "Australia",
};

export const processing = {
  "http://www.specialprivacy.eu/vocabs/processing#Aggregate": "aggregate",
  "http://www.specialprivacy.eu/vocabs/processing#Analyze": "analyze",
  "http://www.specialprivacy.eu/vocabs/processing#Anonymize": "anonymize",
  "http://www.specialprivacy.eu/vocabs/processing#Collect": "collect",
  "http://www.specialprivacy.eu/vocabs/processing#Copy": "copy",
  "http://www.specialprivacy.eu/vocabs/processing#Derive": "derive",
  "http://www.specialprivacy.eu/vocabs/processing#Move": "move",
  "http://www.specialprivacy.eu/vocabs/processing#Query": "query",
  "http://www.specialprivacy.eu/vocabs/processing#Transfer": "transfer",
};

export const purpose = {
  "http://www.specialprivacy.eu/vocabs/purposes#ProvideRecommendations": "recommendations",
  "http://www.specialprivacy.eu/vocabs/purposes#ReminderForSubItems": "sending reminders of subscription items",
  "http://www.specialprivacy.eu/vocabs/purposes#ProvideSponsoredRecommendations": "sponsered recommendations",
};

export const recipient = {
  "http://www.specialprivacy.eu/vocabs/YouShop": "YouShop itself",
  "http://www.specialprivacy.eu/vocabs/dataBrokerCompanies": "data-broker companies",
  "http://www.specialprivacy.eu/vocabs/Advertisers": "advertisers",
};

export function getLabel(key, upperCase) {
  key = key.replace("https:", "http:");
  var result = "";

  if (data.hasOwnProperty(key)) {
    result = data[key];
  } else if (storage.hasOwnProperty(key)) {
    result = storage[key];
  } else if (processing.hasOwnProperty(key)) {
    result = processing[key];
  } else if (purpose.hasOwnProperty(key)) {
    result = purpose[key];
  } else if (recipient.hasOwnProperty(key)) {
    result = recipient[key];
  }

  if (upperCase) {
    return result.charAt(0).toLocaleUpperCase() + result.slice(1);
  }
  return result;
}

export function event2text(p, profile) {
  var intro = "The controller did ";
  var linebreak = false;
  if (profile === "policy") {
    intro = "The controller is able to ";
  }

  for (let key of ["data", "purpose", "processing", "storage", "recipient"]) {
    if (Array.isArray(p[key])) {
      var arr = p[key].map((e) => getLabel(e));
      if (arr.length === 1) {
        p[key + "String"] = arr[0];
      } else if (arr.length === 2) {
        linebreak = true;
        p[key + "String"] = arr[0] + " and " + arr[1];
      } else {
        linebreak = true;
        p[key + "String"] = arr.slice(0, arr.length-2).join(", ") + " and " + arr.slice(arr.length-1);
      }
    } else {
      p[key + "String"] = getLabel(p[key]);
    }
  }

  var content = "";
  if (linebreak) {
    content = <span>
      <p>{intro}<strong>{p.processingString}</strong> your <strong>{p.dataString}</strong> data for <strong>{p.purposeString}</strong> purposes.</p>
      <p>It is stored in <strong>{p.storageString}</strong> and was shared with <strong>{p.recipientString}</strong>.</p>
    </span>
  } else {
    content = <span>
      {intro}<strong>{p.processingString}</strong> your <strong>{p.dataString}</strong> data for <strong>{p.purposeString}</strong> purposes.
      It is stored in <strong>{p.storageString}</strong> and was shared with <strong>{p.recipientString}</strong>.
    </span>
  }

  return (content);
}