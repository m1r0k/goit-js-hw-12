import{a as f,S as b,i as h}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function p(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(n){if(n.ep)return;n.ep=!0;const r=p(n);fetch(n.href,r)}})();const y="41702545-5a959d1a868233ac463ab5270",w=document.getElementById("search-form"),q=document.getElementById("search-input"),i=document.getElementById("image-gallery"),x=document.getElementById("spinner"),v=document.getElementById("load-more");let u,a=1,s=40,d="",l=!1;w.addEventListener("submit",async e=>{e.preventDefault();const t=q.value.trim();if(t!==""){d=t,a=1;try{o(!0);const c=(await f.get(`https://pixabay.com/api/?key=${y}&q=${d}&image_type=photo&orientation=horizontal&safesearch=true&page=${a}&per_page=${s}`)).data;P(c.hits)}catch{g()}finally{o(!1)}}});function L(e){const t=document.createElement("a");return t.href=e.largeImageURL,t.setAttribute("data-lightbox","image-gallery"),t.innerHTML=`
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
  `,t}v.addEventListener("click",async()=>{l||(a+=1,await B())});async function B(){try{o(!0);const t=(await f.get(`https://pixabay.com/api/?key=${y}&q=${d}&image_type=photo&orientation=horizontal&safesearch=true&page=${a}&per_page=${s}`)).data;S(t.hits)}catch{g()}finally{o(!1)}}function P(e){if(e.length===0){g();return}l=e.length<s,$(),o(!1),i.innerHTML="";const t=e.slice(0,s).map(L);i.append(...t),l&&I(),E()}function S(e){if(e.length===0){l=!0,$(),o(!1),I();return}const t=e.map(L);i.append(...t),E()}function E(){u=new b(".gallery a",{q:d,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:s}),u.refresh()}function I(){h.info({title:"Info",message:"Sorry, there are no more images for your request. Please try again!"})}function g(){i.innerHTML="",h.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}const _=()=>i.children.length>0,$=()=>{v.classList.toggle("is-hidden",l||!_())},o=e=>{x.classList.toggle("is-hidden",!e)};
//# sourceMappingURL=commonHelpers.js.map
