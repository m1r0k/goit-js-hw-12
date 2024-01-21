import{a as I,S as b,i as h}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))g(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&g(m)}).observe(document,{childList:!0,subtree:!0});function o(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerpolicy&&(n.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?n.credentials="include":i.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function g(i){if(i.ep)return;i.ep=!0;const n=o(i);fetch(i.href,n)}})();const w=I.create({baseURL:"https://pixabay.com/api/",params:{key:"41702545-5a959d1a868233ac463ab5270",language:"en",image_type:"photo",orientation:"horizontal",safesearch:!0}}),M=document.getElementById("search-form"),l=document.getElementById("image-gallery"),s=document.getElementById("load-more"),S=document.getElementById("spinner");let f,r=1,d=40,y="",c;M.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget).get("query");if(t){y=t,r=1;try{a(!0);const o=await L();c=o.totalHits,r===Math.ceil(c/d)?(s.classList.add("is-hidden"),u()):s.classList.remove("is-hidden"),x(o.hits)}catch{p()}finally{a(!1)}}});s.addEventListener("click",async()=>{r+=1,console.log(r),r===Math.ceil(c/d)?(s.classList.add("is-hidden"),u()):s.classList.remove("is-hidden"),await q()});async function L(){return(await w.get("",{params:{q:y,page:r,per_page:d}})).data}async function q(){try{a(!0);const e=await L();T(e.hits)}catch{p()}finally{a(!1)}}function x(e){if(e.length===0){p();return}s.classList.remove("is-hidden"),a(!1);const t=e.map(v);l.innerHTML="",l.append(...t),r===Math.ceil(c/d)&&s.classList.add("is-hidden"),E()}function T(e){if(e.length===0){s.classList.add("is-hidden"),a(!1),u();return}const t=e.map(v);l.append(...t),E()}function v(e){const t=document.createElement("a");return t.href=e.largeImageURL,t.setAttribute("data-lightbox","image-gallery"),t.innerHTML=`
    <div class="gallery-item">
      <img src="${e.largeImageURL}" alt="${e.tags}">
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p>${e.likes}</p>
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
  `,t}function E(){f?f.refresh():f=new b(".gallery a")}function u(){h.info({title:"Info",message:"There are no more images for your request."})}function a(e){S.classList.toggle("is-hidden",!e)}function p(){l.innerHTML="",h.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=commonHelpers.js.map
