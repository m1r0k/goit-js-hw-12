import{a as f,S as I,i as y}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function i(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(r){if(r.ep)return;r.ep=!0;const n=i(r);fetch(r.href,n)}})();const h="41702545-5a959d1a868233ac463ab5270",$=document.getElementById("search-form"),v=document.getElementById("search-input"),a=document.getElementById("image-gallery"),b=document.getElementById("spinner"),L=document.getElementById("load-more");let u,l=1,o=40,d="";$.addEventListener("submit",async e=>{e.preventDefault();const t=v.value.trim();if(t!==""){d=t;try{s(!0);const c=(await f.get(`https://pixabay.com/api/?key=${h}&q=${d}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=${o}`)).data;q(c.hits.slice(0,o)),l=1}catch{g()}finally{s(!1),p()}}});L.addEventListener("click",async()=>{l+=1,await w()});async function w(){try{if(v.value.trim()==="")return;s(!0);const i=(await f.get(`https://pixabay.com/api/?key=${h}&q=${d}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=${o}`)).data;B(i.hits.slice(0,o))}catch{g()}finally{s(!1)}}function q(e){if(e.length===0){g();return}e.length<o?(p(),s(!1)):p(),a.innerHTML="";const t=e.map(E);a.append(...t),u=new I(".gallery a",{q:d,image_type:"photo",orientation:"horizontal",safesearch:!0,page:l,per_page:o}),u.refresh()}function B(e){if(e.length===0){p(),s(!1),S();return}const t=e.map(E);a.append(...t),u.refresh()}function E(e){const t=document.createElement("a");return t.href=e.largeImageURL,t.setAttribute("data-lightbox","image-gallery"),t.innerHTML=`
    <div class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}">
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p> ${e.likes}</p>
        </div>
        <div class="img-info-item">
          <p>Views: </p>
          <p>${e.views}</p>
        </div>
        <div class="img-info-item">
          <p>Comments: </p>
          <p>${e.comments}</p>
        </div>
        <div class="img-info-item">
          <p>Downloads: </p>
          <p>${e.downloads}</p>
        </div>
      </div>
    </div>
  `,t}function S(){y.info({title:"Info",message:"Sorry, there are no more images for your request. Please try again!"})}function g(){a.innerHTML="",y.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}const _=()=>a.children.length>0,p=()=>{L.classList.toggle("is-hidden",!_())},s=e=>{b.classList.toggle("is-hidden",!e)};
//# sourceMappingURL=commonHelpers.js.map
