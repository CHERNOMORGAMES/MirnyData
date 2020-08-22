class MDScene {
	static #MAX_INSTANCES = 1;
 	static #instances = 0;

 	static objects = [];
	static scene = new THREE.Scene();
	static camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10 ); // 70
	static renderer = new THREE.WebGLRenderer({ antialias: true }); //{ antialias: true } 
	static light = new THREE.AmbientLight( 0xffffff ) 

	static rotX = 0.05;
	static rotY = 0.01;
	static rotZ = 0.05;

	static posX = 0.0;
	static posY = 0.0;
	static posZ = 0.0;

	geometry;
	material;
	mesh;

	constructor(background, fog) {
		MDScene.#instances++;
    if (MDScene.#instances > MDScene.#MAX_INSTANCES) {throw new Error('MDScene is a singleton - instance already exists');}
		
		background ? MDScene.scene.background = background : MDScene.scene.background = new THREE.Color( 0x3b83bd );
		fog ? MDScene.scene.fog = fog : null; //Fog instance( color : Integer, near : Float, far : Float )

		this.#init(MDScene.camera, MDScene.scene, MDScene.renderer, MDScene.light);
		this.update();
	}

	#init(camera, scene, renderer, light) {
		camera.position.z = 10;
		scene.add( light );
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
	}

	update() { // Вызов отрисовки.
		MDScene.renderer.render(MDScene.scene, MDScene.camera);
	}

	createMesh(quantity, geometry, material) { // Нуждается объектах, например: new THREE.BoxGeometry( 0.2, 0.2, 0.2 ); new THREE.MeshNormalMaterial();
	
		for (let i = quantity - 1; i >= 0; i--) {
			let mesh = new THREE.Mesh(geometry, material);

			MDScene.scene.add(mesh);
			MDScene.objects.push(mesh);
		}
		this.update();
	}

	set camX(x) {this.camera.position.x = x;}
	set camY(y) {this.camera.position.y = y;}
	set camZ(z) {this.camera.position.z = z;}
	get camX() {return this.camera.position.x;}
	get camY() {return this.camera.position.y;}
	get camZ() {return this.camera.position.z;}

}

//Список функций

function rand_position(){
	MDScene.objects.forEach(mesh => {
	mesh.position.x = Math.random()*4 -2;
	mesh.position.y = Math.random()*6 -3;
	mesh.position.z = Math.random()*4 -2;
	});
	test.update(); // На всякий случай. Апдейт автоматически происходит при анимации.
}

function anim_update(){
	MDScene.objects.forEach(mesh => {
	mesh.rotation.x += MDScene.rotX; //0.1
	mesh.rotation.y += MDScene.rotY; //0.01
	mesh.rotation.z += MDScene.rotZ; // 0.1
	//let rand = Math.random(); 
	//rand >= 0.5 ? mesh.position.z += rand/10 : mesh.position.z -= rand/10;
	});
	test.update(); // Отрисовка изменений
	requestAnimationFrame(anim_update); //Передача изменений шагом AnimationFrame.
}

function set_mesh(n){
	let geometry = new THREE.SphereGeometry(0.5, 16, 32);

	var texture = new THREE.TextureLoader().load( 'frontend/img/Football.jpg' );
	
	let material = new THREE.MeshPhongMaterial({
		map	: texture,
		bumpMap	: texture,
		bumpScale: 0.01,
	});
	//material.color = new THREE.Color( 0xff4f00 );
	test.createMesh(n, geometry, material);
}


function initEventListeners() {
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
}

function onWindowResize() {
    MDScene.camera.aspect = window.innerWidth / window.innerHeight;
    MDScene.camera.updateProjectionMatrix();
    MDScene.renderer.setSize(window.innerWidth, window.innerHeight);
}

//Вызовы

let test = new MDScene();
set_mesh(100);
rand_position();
anim_update();
initEventListeners();
