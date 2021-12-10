//setup scene
var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const container = document.getElementById("canvasContainer");
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);
camera.position.x = 1;
camera.position.y = 0.8;
camera.position.z = 2;


//setup controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3();
controls.enablePan = false;
controls.maxDistance = 6;
controls.minDistance = 1;
controls.zoomSpeed = 1;

//init object to scene
// Instantiate a loader
const gltfLoader = new THREE.GLTFLoader();

//init light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow=true;
directionalLight.position.set(5,20,5);
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 300;
// directionalLight.shadow.camera.top = 50;
// directionalLight.shadow.camera.bottom = -1;
// directionalLight.shadow.camera.left = -1;
// directionalLight.shadow.camera.right = 50;
directionalLight.shadow.bias=-0.001;
scene.add(directionalLight);
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.7);
scene.add(light);

//
function LoadModelEnvironment(index) {
    //remove model from scene
    if(model) {
        removeModelFromScene();
    }


  //load environment
  const cubeTextLoader = new THREE.CubeTextureLoader();
  cubeTextLoader.setPath(enviMap[index]);

  const textureCube = cubeTextLoader.load([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png",
  ]);

  scene.background = textureCube;
  scene.environment = textureCube;

  //load models
  gltfLoader.load("models/" + models[index], function (gltf) {
    model = gltf.scene;

    model.scale.set(0.01, 0.01, 0.01);
    var center = new THREE.Vector3();
    new THREE.Box3().setFromObject(gltf.scene).getCenter(center);
    model.position.set(-center.x, -center.y, -center.z);

    model.traverse(function (child) {
      child.receiveShadow = true; 
      child.castShadow = true;
    });
    
    //addmodel to scene
    scene.add(model);

    //animation setting
    mixer = new THREE.AnimationMixer(model);

    for (var i = 0; i < gltf.animations.length; i++) {
      var action = mixer.clipAction(gltf.animations[i]);
      action.play();
    }

  });
}

//animation
var mixer;
var clock = new THREE.Clock();
var model;
var models = {

    0: "mat_maps.glb",
    1: "mat_metal_rough.glb",
    4: "obj_aircraft.glb",
    5: "obj_plant.glb",
    6: "obj_trangphuc.glb",
    7: "obj_scan.glb",
    8: "envi_kobu.glb",
    9: "envi_farm.glb",
    10: "envi_woodcabin.glb",
    11: "creature_witch.glb",
    12: "creature_cat.glb",
    13: "creature_ocsen.glb",
    14: "char_thanhgiong.glb",
    15: "char_giaovien.glb",
    16: "char_warrior.glb",
  };
  
  var enviMap = {

    0: "skybox/royal_esplanade/",
    1: "skybox/royal_esplanade/",
    4: "skybox/reinforced_concrete_02/",
    5: "skybox/solitude_night/",
    6: "skybox/spruit_sunrise/",
    7: "skybox/suburban_parking_area/",
    8: "skybox/sunflowers/",
    9: "skybox/sunny_vondelpark/",
    10: "skybox/reinforced_concrete_02/",
    11: "skybox/neurathen_rock_castle/",
    12: "skybox/christmas_photo_studio/",
    13: "skybox/sunflowers/",
    14: "skybox/colorful_studio/",
    15: "skybox/reinforced_concrete_02/",
    16: "skybox/solitude_night/",
  };


LoadModelEnvironment(0);

function removeModelFromScene() {
    scene.remove(model);
    model.traverse(function(child) {
        if(child.isMesh) {
            child.geometry.dispose();
            
            //dispose texture
            if(child.material.map) {
                child.material.map.dispose();
            }

            if(child.material.metalnessMap) {
                child.material.metalnessMap.dispose();
            }

            if(child.material.normalMap) {
                child.material.normalMap.dispose();
            }

            if(child.material.roughnessMap) {
                child.material.roughnessMap.dispose();
            }

            if(child.material.emissiveMap) {
                child.material.emissiveMap.dispose();
            }

            if(child.material.alphaMap) {
                child.material.alphaMap.dispose();
            }      
        }
    }) 

};


// setInterval(function() {
//     console.log(renderer.info);
// }, 4000)

const animate = function () {
  requestAnimationFrame(animate);
  controls.update();

  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
  
};

animate();


