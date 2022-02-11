/**
 SVG image - for placeholding while images are being loaded (placeholder prop for SfImage and SfGallery)
 */
export default function getPlaceholderImage(width, height) {
  const svgSource = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="${width}" height="${height}" xml:space="preserve">
 <rect fill="url(#myGradient)"  width="${width}" height="${height}"/>
  <g id="Logo" >
 <g id="XMLID_985_">
   <path id="XMLID_987_" transform="translate(-80, -40)" fill="#FFFFFF" d="M188.45,171.31c-6.83-5.14-16.89-9.04-27.54-13.17c-12.68-4.92-27.05-10.49-37.84-19.07
     c-12.22-9.73-18.17-22-18.17-37.53c0-13.93,5.78-25.84,16.72-34.45c12.26-9.65,30.84-14.76,53.72-14.76
     c6.32,0,12.36,0.39,17.96,1.16c0.49,0.07,0.97-0.2,1.17-0.64c0.21-0.45,0.1-0.98-0.27-1.31c-14.42-12.97-33.06-20.11-52.47-20.11
     c-20.98,0-40.71,8.17-55.55,23.01c-14.84,14.83-23.01,34.56-23.01,55.54c0,20.98,8.17,40.71,23.01,55.54
     c14.83,14.83,34.56,23,55.55,23c16.95,0,33.1-5.32,46.71-15.39c0.28-0.21,0.46-0.55,0.46-0.9
     C188.91,171.86,188.74,171.52,188.45,171.31z"/>
   <path id="XMLID_986_"  transform="translate(-80, -40)"  fill="#FFFFFF" d="M219.95,102.7c-0.03-0.3-0.17-0.58-0.4-0.77c-16.39-13.6-29.65-19.15-45.76-19.15
     c-8.6,0-15.19,1.72-19.59,5.12c-3.81,2.94-5.83,7.05-5.83,11.86c0,13.49,16.49,19.64,35.58,26.76
     c9.84,3.67,20.01,7.46,29.35,12.65c0.17,0.09,0.36,0.14,0.55,0.14c0.13,0,0.26-0.02,0.38-0.07c0.31-0.11,0.55-0.35,0.67-0.65
     c3.57-9.14,5.38-18.77,5.38-28.63C220.28,107.65,220.17,105.2,219.95,102.7z"/>
 </g>
 
</g>
 <linearGradient id="myGradient" gradientTransform="rotate(20)">
   <stop offset="0%"  stop-color="#eee">
     <animate attributeName="stop-color" values="#EEEEEE; #CCCCCC; #EEEEEE" dur="2s" repeatCount="indefinite"></animate>
   </stop>
   <stop offset="100%" stop-color="#aaa">
     <animate attributeName="stop-color" values="#EEEEEE; #DDDDDD; #EEEEEE" dur="3s" repeatCount="indefinite"></animate>
   </stop>
 </linearGradient>
</svg>`

  return `data:image/svg+xml;base64,${btoa(svgSource)}`
}
