export function initThree(canvasSelector = '#canvas-3d'){
  const canvas = document.querySelector(canvasSelector);
  if(!canvas || typeof THREE === 'undefined') return {resize:()=>{},dispose:()=>{}};

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 120;

  const renderer = new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000,0);

  const particles = 1200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particles * 3);
  const colors = new Float32Array(particles * 3);
  for(let i=0;i<particles;i++){ 
    const i3 = i*3;
    positions[i3] = (Math.random()-0.5) * 1000;
    positions[i3+1] = (Math.random()-0.5) * 800;
    positions[i3+2] = (Math.random()-0.5) * 800;
    const t = Math.random();
    colors[i3] = 0.0 + t*0.0;
    colors[i3+1] = 0.8 + t*0.2;
    colors[i3+2] = 0.8 + (1-t)*0.2;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors,3));

  const material = new THREE.PointsMaterial({size:1.8,vertexColors:true,transparent:true,opacity:0.85});
  const points = new THREE.Points(geometry,material);
  scene.add(points);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e)=>{mouseX = (e.clientX - window.innerWidth/2)*0.02; mouseY = (e.clientY - window.innerHeight/2)*0.02});

  function animate(){
    requestAnimationFrame(animate);
    points.rotation.y += 0.0008;
    points.rotation.x = Math.sin(Date.now()*0.0001)*0.02 + mouseY*0.001;
    camera.position.x += (mouseX - camera.position.x) * 0.02;
    renderer.render(scene,camera);
  }
  animate();

  function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize);

  return {dispose(){window.removeEventListener('resize',onResize); renderer.dispose(); geometry.dispose(); material.dispose();}, resize:onResize}
}