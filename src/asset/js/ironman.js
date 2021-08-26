window.onload = () => {
  let scene;
  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a35);
    camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 1, 1000);
    camera.rotation.y = 45/180*Math.PI;
    camera.position.x = 150;
    camera.position.y = 700;
    camera.position.z = 250;

    hlight = new THREE.AmbientLight(0x000000, 1);
    scene.add(hlight);
    {
      const skyColor = 0xB1E1FF;  // light blue
      const groundColor = 0x000000;  // brownish orange
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);
    }

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 10, 0);
      light.target.position.set(-5, 0, 0);
      scene.add(light);
      scene.add(light.target);
    }

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.addEventListener('change', renderer);
    controls.update()

    // OBJ Loader
    const objLoader = new THREE.OBJLoader();
    objLoader.load(
      '../model/Ironman.obj',
      function ( object ) {
        object.position.set(0, -100, 0)
        scene.add( object );
        animate();
      },
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      function ( error ) {
        console.log( 'An error happened' );
      }
    );
    function animate() {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    // MTL Loaders
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('../model/IronMan.mtl', (mtl) => {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load('../model/IronMan.obj', (root) => {
        // root.position.set(0, -100, 0);
        // scene.add(root);
      });
    });
  }
  init();
}