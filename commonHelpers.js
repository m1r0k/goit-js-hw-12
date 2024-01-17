import{a as p,S as y,i as v}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const u="41702545-5a959d1a868233ac463ab5270",w=document.getElementById("search-form"),f=document.getElementById("search-input"),s=document.getElementById("image-gallery"),E=document.getElementById("spinner"),g=document.getElementById("load-more");let d,m=1;w.addEventListener("submit",async e=>{e.preventDefault();const t=f.value.trim();if(t!=="")try{a(!0);const o=await p.get(`https://pixabay.com/api/?key=${u}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true`);if(o.status!==200)throw new Error("Network response was not ok");const i=o.data;I(i.hits),m=1}catch{l()}finally{a(!1),k()}});g.addEventListener("click",async()=>{m+=1,await L()});async function L(){try{const e=f.value.trim();if(e==="")return;a(!0);const t=await p.get(`https://pixabay.com/api/?key=${u}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${m}`);if(t.status!==200)throw new Error("Network response was not ok");const o=t.data;b(o.hits)}catch{l()}finally{a(!1)}}function I(e){if(e.length===0){l();return}s.innerHTML="";const t=e.map(h);s.append(...t),d=new y(".gallery a",{image_type:"photo",orientation:"horizontal",safesearch:!0}),d.refresh()}function b(e){if(e.length===0){l();return}const t=e.map(h);s.append(...t),d.refresh()}function h(e){const t=document.createElement("a");return t.href=e.largeImageURL,t.setAttribute("data-lightbox","image-gallery"),t.innerHTML=`
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
  `,t}function l(){s.innerHTML="",v.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}const $=()=>s.children.length>0,k=()=>{g.classList.toggle("is-hidden",!$())},a=e=>{E.classList.toggle("is-hidden",!e)};
//# sourceMappingURL=commonHelpers.js.map
